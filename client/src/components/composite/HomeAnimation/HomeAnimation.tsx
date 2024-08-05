import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { selectIsDark } from "features/darkSlice";

const HomeAnimation = () => {
  const isDark = useSelector(selectIsDark);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    // Create the scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.z = 10;

    let backgroundColor: THREE.ColorRepresentation = isDark
      ? 0x1e293b
      : 0xf8fafc;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    renderer.setClearColor(backgroundColor, 1);
    mount.appendChild(renderer.domElement);

    // Render the scene
    const render = () => {
      renderer.render(scene, camera);
    };

    // Create a gear shape
    const createGearShape = (
      innerRadius: number,
      outerRadius: number,
      numTeeth: number
    ) => {
      const shape = new THREE.Shape();
      const angleStep = (Math.PI * 2) / numTeeth;

      for (let i = 0; i < numTeeth; i++) {
        const angle = i * angleStep;
        const halfAngle = angle + angleStep / 2;
        const nextAngle = (i + 1) * angleStep;

        shape.lineTo(
          Math.cos(angle) * innerRadius,
          Math.sin(angle) * innerRadius
        );
        shape.lineTo(
          Math.cos(halfAngle) * outerRadius,
          Math.sin(halfAngle) * outerRadius
        );
        shape.lineTo(
          Math.cos(nextAngle) * innerRadius,
          Math.sin(nextAngle) * innerRadius
        );
      }
      shape.closePath();

      return shape;
    };

    // Load a font and create text geometry
    const loader = new FontLoader();
    loader.load("/fonts/Lexend_Medium_Regular.json", (font) => {
      // Create "HiGuard" text
      const hiGuardGeometry = new TextGeometry("HiGuard", {
        font: font,
        size: 2.5,
        depth: 0.6,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      hiGuardGeometry.computeBoundingBox();
      if (!hiGuardGeometry.boundingBox) return;

      const hiGuardMaterial = new THREE.MeshPhongMaterial({
        color: 0x098585,
        specular: 0xffffff,
        shininess: 100,
      });

      const hiGuardMesh = new THREE.Mesh(hiGuardGeometry, hiGuardMaterial);
      const hiGuardWidth =
        hiGuardGeometry.boundingBox.max.x - hiGuardGeometry.boundingBox.min.x;
      hiGuardMesh.position.set(-hiGuardWidth / 2, 2, 0);
      scene.add(hiGuardMesh);

      // Create "by HiQ-Apps" text
      const byHiQAppsGeometry = new TextGeometry("by HiQ-Apps", {
        font: font,
        size: 0.7,
        depth: 0,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 3,
      });

      byHiQAppsGeometry.computeBoundingBox();
      if (!byHiQAppsGeometry.boundingBox) return;

      const byHiQAppsMaterial = new THREE.MeshPhongMaterial({
        color: 0x098585,
        specular: 0xffffff,
        shininess: 100,
      });

      const byHiQAppsMesh = new THREE.Mesh(
        byHiQAppsGeometry,
        byHiQAppsMaterial
      );

      byHiQAppsMesh.position.set(1.3, 0.5, 0);
      scene.add(byHiQAppsMesh);

      // Add a small gear under the "by HiQ-Apps" text
      const gearShape = createGearShape(1.2, 1.5, 24);
      const extrudeSettings = {
        steps: 2,
        depth: 0.3,
        bevelEnabled: false,
      };
      const gearGeometry = new THREE.ExtrudeGeometry(
        gearShape,
        extrudeSettings
      );
      const gearMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
      const gearMesh = new THREE.Mesh(gearGeometry, gearMaterial);
      gearMesh.position.set(0, -2.5, 0);
      scene.add(gearMesh);

      // Add an R inside the gear
      const rGeometry = new TextGeometry("R", {
        font: font,
        size: 1,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 3,
      });

      const rMaterial = new THREE.MeshPhongMaterial({
        color: 0x098585,
        specular: 0xffffff,
        shininess: 100,
      });

      const rMesh = new THREE.Mesh(rGeometry, rMaterial);
      rGeometry.computeBoundingBox();
      if (rGeometry.boundingBox) {
        const rWidth =
          rGeometry.boundingBox.max.x - rGeometry.boundingBox.min.x;
        const rHeight =
          rGeometry.boundingBox.max.y - rGeometry.boundingBox.min.y;
        rMesh.position.set(-rWidth / 2, -2.5 - rHeight / 2, 0.1);
        scene.add(rMesh);

        // Add a point light inside the R
        const rLight = new THREE.PointLight(0x098585, 30, 10);
        rLight.position.set(-0.2 - -rWidth / 2, -2.5 - rHeight / 2, 2);
        scene.add(rLight);
      }

      // Add a spotlight
      const spotlight = new THREE.SpotLight(0x098585, 50);
      spotlight.position.set(0, 0, 10);
      spotlight.angle = Math.PI / 4;
      spotlight.penumbra = 0.5;
      spotlight.decay = 2;
      spotlight.distance = 50;
      spotlight.target.position.set(0, 0, 0);
      scene.add(spotlight);
      scene.add(spotlight.target);

      // Create orbiting balls
      const numBalls = 6;
      const orbitRadius = 2.5;

      // Create balls for the three rings with initial phase offsets
      const balls: Record<
        number,
        THREE.Mesh<
          THREE.SphereGeometry,
          THREE.MeshPhongMaterial,
          THREE.Object3DEventMap
        >[]
      > = [[], [], []];
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < numBalls; i++) {
          const ballGeometry = new THREE.SphereGeometry(0.1, 20, 32);
          const ballMaterial = new THREE.MeshPhongMaterial({
            color: 0x098585,
          });
          const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
          ballMesh.userData = {
            phase: (i / numBalls) * Math.PI * 2 + ((j / 3) * Math.PI * 2) / 3,
          };
          scene.add(ballMesh);
          balls[j].push(ballMesh);
        }
      }

      const updateOrbit = (
        balls: THREE.Mesh<
          THREE.SphereGeometry,
          THREE.MeshPhongMaterial,
          THREE.Object3DEventMap
        >[],
        angleOffset: number,
        tiltX: number,
        tiltY: number
      ) => {
        balls.forEach((ball) => {
          const angle =
            clock.getElapsedTime() * 0.5 + ball.userData.phase + angleOffset;
          const x = orbitRadius * Math.cos(angle);
          const y = -2.5 + orbitRadius * Math.sin(angle) * Math.cos(tiltX);
          const z = orbitRadius * Math.sin(angle) * Math.sin(tiltY);
          if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
            ball.position.set(
              x * Math.cos(Math.PI / 2) - z * Math.sin(Math.PI / 2),
              y,
              x * Math.sin(Math.PI / 2) + z * Math.cos(Math.PI / 2)
            );
          }
        });
      };

      // Animation loop for swinging spotlight and orbiting balls
      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();
        const a = 15;
        const b = 15;
        const t = elapsedTime * 0.5;
        spotlight.position.x =
          (a * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
        spotlight.position.y =
          (b * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));

        // Rotate the gear
        gearMesh.rotation.z += 0.003;

        // First ring (XZ-plane)
        updateOrbit(balls[0], 0, -Math.PI / 2, -Math.PI / 2);
        // Second ring (tilt to form '/')
        updateOrbit(balls[1], 0, Math.PI / 6, Math.PI / 6);
        // Third ring (tilt to form '\')
        updateOrbit(balls[2], 0, -Math.PI / 6, -Math.PI / 6);

        render();
      };
      animate();
    });

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [isDark]);

  return <div ref={mountRef} style={{ width: "600px", height: "400px" }}></div>;
};

export default HomeAnimation;
