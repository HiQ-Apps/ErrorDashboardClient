import { useSelector } from "react-redux";
import { useRef, useEffect, MutableRefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

import { selectIsDark } from "features/darkSlice";

interface GraphNode {
  mesh: THREE.Mesh;
  label: THREE.Sprite;
}

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);

    if (isDark) renderer.setClearColor(0x1e293b, 1);
    else {
      renderer.setClearColor(0xe2e8f0, 1);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 35);
    // Center camera on the app node (origin)
    camera.lookAt(0, 0, 0);

    // Add light source
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;

    scene.add(directionalLight);

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
    const nodes: GraphNode[] = [];

    // Central node representing the app
    const centralGeom = new THREE.SphereGeometry(1.4, 48, 48);
    // const centralMat = new THREE.MeshBasicMaterial({ color: 0x098585 });
    const centralMat = new THREE.MeshPhongMaterial({
      color: 0x04838f,
      shininess: 60,
      specular: 0x444444,
    });

    const centralNode = new THREE.Mesh(centralGeom, centralMat);
    centralNode.castShadow = true;
    centralNode.receiveShadow = true;

    scene.add(centralNode);
    graphGroup.add(centralNode);

    // Peripheral nodes arranged in a circle
    const radius = 7;
    languages.forEach((lang, i) => {
      const nodeColor = 0x334155;
      const angle = (i / languages.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      // Random z-offset for depth variance
      const z = (Math.random() - 0.5) * 18;

      // Node geometry & material
      const nodeGeom = new THREE.SphereGeometry(1, 8, 8);
      // const nodeMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
      const nodeMat = new THREE.MeshPhongMaterial({
        color: 0x024147,
        shininess: 30,
        specular: 0x444444,
      });

      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.userData.originalColor = new THREE.Color(nodeColor);
      nodeMesh.castShadow;
      nodeMesh.receiveShadow = true;

      nodeMesh.position.set(x, y, z);
      graphGroup.add(nodeMesh);

      const outlineGeom = new THREE.EdgesGeometry(nodeGeom, Math.PI / 6);
      const outlineMat = new THREE.LineBasicMaterial({ color: 0x04838f });
      const outlineMesh = new THREE.LineSegments(outlineGeom, outlineMat);
      outlineMesh.position.copy(nodeMesh.position);
      outlineMesh.scale.set(1.05, 1.05, 1.05);

      graphGroup.add(outlineMesh);

      // Text label (using CanvasTexture)
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const baseWidth = 512;
      const baseHeight = 72;

      canvas.width = baseWidth * dpr;
      canvas.height = baseHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = isDark ? "white" : "black";
      ctx.font = "32px sans-serif";
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

      const offset = 2;
      label.position.set(x + dir2D.x * offset, y + dir2D.y * offset, z);

      label.visible = false;
      graphGroup.add(label);
      nodes.push({ mesh: nodeMesh, label });

      // Connect with line to center
      const points = [centralNode.position, nodeMesh.position];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(
        points as THREE.Vector3[]
      );
      const lineMat = new THREE.LineBasicMaterial({ color: 0x04838f });
      const line = new THREE.Line(lineGeom, lineMat);
      scene.add(line);
      graphGroup.add(line);
    });

    // Mouse move handler
    let previousHovered: THREE.Mesh | null = null;
    const HOVER_COLOR = 0x04838f;

    const onMouseMove = (event: MouseEvent) => {
      // 1) normalize mouse coords
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const hit = raycaster.intersectObjects(nodes.map((n) => n.mesh))[0];

      // 3) if we left the previous hover, reset it
      if (
        previousHovered &&
        (!hit || (hit.object as THREE.Mesh) !== previousHovered)
      ) {
        // reset color & scale
        const mat = previousHovered.material as THREE.MeshPhongMaterial;
        mat.color.copy((previousHovered.userData as any).originalColor);
        previousHovered.scale.set(1, 1, 1);

        // hide its label
        const prevNode = nodes.find((n) => n.mesh === previousHovered);
        if (prevNode) prevNode.label.visible = false;

        previousHovered = null;
      }

      // 4) if we hit a new mesh, highlight & show label
      if (hit) {
        const hovered = hit.object as THREE.Mesh;
        const mat = hovered.material as THREE.MeshPhongMaterial;

        // only if it’s truly new
        if (hovered !== previousHovered) {
          // store and swap color
          const origColor = (hovered.userData as any)
            .originalColor as THREE.Color;
          (hovered.userData as any).originalColor = origColor;
          mat.color.setHex(HOVER_COLOR);

          // show its label
          const nodeObj = nodes.find((n) => n.mesh === hovered);
          if (nodeObj) nodeObj.label.visible = true;

          previousHovered = hovered;
        }
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
