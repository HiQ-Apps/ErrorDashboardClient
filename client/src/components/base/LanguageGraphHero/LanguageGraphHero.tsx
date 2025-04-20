import { useSelector } from "react-redux";
import { useRef, useEffect, MutableRefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import { selectIsDark } from "features/darkSlice";

const LanguageGraphHero = () => {
  const isDark = useSelector(selectIsDark);
  const mountRef = useRef<HTMLDivElement>(null);

  // List of supported languages
  const languages = ["JavaScript", "TypeScript", "Python", "Rust"];
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (isDark) renderer.setClearColor(0x1e293b, 1);
    else {
      renderer.setClearColor(0xe2e8f0, 1);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);
    // Center camera on the app node (origin)
    camera.lookAt(0, 0, 0);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.update();

    // Group to hold all nodes and edges
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Raycaster and mouse vector for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Store mesh/label pairs
    const nodes: { mesh: THREE.Mesh; label: THREE.Sprite }[] = [];

    // Central node representing the app
    const centralGeom = new THREE.SphereGeometry(1.4, 48, 48);
    const centralMat = new THREE.MeshBasicMaterial({ color: 0x098585 });
    const centralNode = new THREE.Mesh(centralGeom, centralMat);
    scene.add(centralNode);
    graphGroup.add(centralNode);

    // Peripheral nodes arranged in a circle
    const peripheralNodes: THREE.Mesh[] = [];
    const radius = 7;
    languages.forEach((lang, i) => {
      const angle = (i / languages.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      // Random z-offset for depth variance
      const z = (Math.random() - 0.5) * 18;

      // Node geometry & material
      const nodeGeom = new THREE.SphereGeometry(1, 32, 32);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(x, y, z);
      graphGroup.add(nodeMesh);
      peripheralNodes.push(nodeMesh);

      // Text label (using CanvasTexture)
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const baseWidth = 512;
      const baseHeight = 72;

      canvas.width = baseWidth * dpr;
      canvas.height = baseHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "black";
      ctx.font = "48px sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(lang, 20, baseHeight / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      const label = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: texture, depthTest: false })
      );
      const worldWidth = (baseWidth / baseHeight) * 2;
      const worldHeight = 2;
      label.scale.set(worldWidth, worldHeight, 1);

      const dir2D = new THREE.Vector2(x, y).normalize();

      const offset = 3;
      label.position.set(x + dir2D.x * offset, y + dir2D.y * offset, z);

      label.visible = false;
      graphGroup.add(label);
      nodes.push({ mesh: nodeMesh, label });

      // Connect with line to center
      const points = [centralNode.position, nodeMesh.position];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(
        points as THREE.Vector3[]
      );
      const lineMat = new THREE.LineBasicMaterial({ color: "black" });
      const line = new THREE.Line(lineGeom, lineMat);
      scene.add(line);
      graphGroup.add(line);
    });

    // Mouse move handler
    let previousHovered: THREE.Mesh | null = null;
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      // Reset previous hover scale
      if (previousHovered) {
        previousHovered.scale.set(1, 1, 1);
      }

      // Hide all labels
      nodes.forEach((n) => (n.label.visible = false));

      // Check intersections
      const intersection = raycaster.intersectObjects(
        nodes.map((n) => n.mesh)
      )[0];
      if (intersection) {
        const hoveredMesh = intersection.object as THREE.Mesh;
        // Enlarge hovered node
        hoveredMesh.scale.set(1.3, 1.3, 1.3);
        previousHovered = hoveredMesh;

        // Show its label
        const nodeObj = nodes.find((n) => n.mesh === hoveredMesh);
        if (nodeObj) nodeObj.label.visible = true;
      } else {
        previousHovered = null;
      }
    };
    renderer.domElement.addEventListener("mousemove", onMouseMove);

    // Animation loop
    let frameId: number;
    const animate = () => {
      controls.update();
      // Rotation
      graphGroup.rotation.y += 0.002;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      controls.dispose();
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef as MutableRefObject<HTMLDivElement>}
      style={{ width: "500px", height: "400px", position: "relative" }}
    />
  );
};

export default LanguageGraphHero;
