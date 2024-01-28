import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AnaglyphEffect } from "three/examples/jsm/Addons.js";

const ThreeJSAnaglyphComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const spheres = useRef<THREE.Mesh[]>([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isIntersecting || typeof window === "undefined") {
      return;
    }

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.01,
      100
    );
    camera.position.z = 3;

    const scene = new THREE.Scene();

    // Load textures
    const loader = new THREE.TextureLoader();
    const textureCube = loader.load("/skybox.png"); // Replace with your texture path
    const metalTexture = loader.load("/metal.png"); // Replace with your texture path

    // Set background
    scene.background = textureCube;

    // Create reflective material
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      envMap: textureCube,
      metalness: 0.7,
      roughness: 0.1,
    });

    const geometry = new THREE.SphereGeometry(0.1, 32, 16);

    for (let i = 0; i < 500; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 10 - 5;
      mesh.position.y = Math.random() * 10 - 5;
      mesh.position.z = Math.random() * 10 - 5;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
      scene.add(mesh);
      spheres.current.push(mesh);
    }

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    if (containerRef.current)
      containerRef.current.appendChild(renderer.domElement);

    const effect = new AnaglyphEffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      effect.setSize(window.innerWidth, window.innerHeight);
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX.current = (event.clientX - windowHalfX) / 100;
      mouseY.current = (event.clientY - windowHalfY) / 100;
    };

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      camera.position.x += (mouseX.current - camera.position.x) * 0.15;
      camera.position.y += (-mouseY.current - camera.position.y) * 0.15;
      camera.lookAt(scene.position);

      for (let i = 0, il = spheres.current.length; i < il; i++) {
        const sphere = spheres.current[i];
        sphere.position.x = 5 * Math.cos(0.0001 * Date.now() + i);
        sphere.position.y = 5 * Math.sin(0.0001 * Date.now() + i * 1.1);
      }

      effect.render(scene, camera);
    };

    document.addEventListener("mousemove", onDocumentMouseMove);
    window.addEventListener("resize", onWindowResize);

    animate();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
    };
  }, [isIntersecting]);

  return <div ref={containerRef} style={{ height: "500px", width: "100%" }} />;
};

export default ThreeJSAnaglyphComponent;
