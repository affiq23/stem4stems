/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function RotatingImage({ texture }: any) {
  const mesh = useRef<THREE.Mesh | null>(null);

  // Create a rotation animation for the image
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={mesh}>
      <circleGeometry args={[2.5, 60]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Home() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const textureLoader = new THREE.TextureLoader();
      const loadedTexture = textureLoader.load("/stem_logo.png"); // Direct path
      setTexture(loadedTexture);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-60 bg-gray-800 p-5 ml-5 mt-5 mb-5 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-52 h-52">
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <RotatingImage texture={texture} />
            </Canvas>
          </div>

          <h2 className="text-xl font-semibold my-5">The World of STEM</h2>
          <nav className="flex flex-col gap-4">
            <a href="#" className="hover:text-blue-400">
              Home
            </a>
            <a href="#" className="hover:text-blue-400">
              About STEM
            </a>
            <a href="#" className="hover:text-blue-400">
              Activities
            </a>
            <a href="#" className="hover:text-blue-400">
              Contact
            </a>
          </nav>
        </div>
      </aside>

      <main className="flex-grow">
        <section className="text-center py-12">
          <span className="flex place-content-center pt-14 text-6xl font-bold text-transparent bg-clip-text ">
            <h1 className="animate-text text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-teal-500 to-red-200">
              Discover the fun of STEM!
            </h1>
          </span>

          <p className="text-2xl mx-auto leading-relaxed max-w-2xl">
            Explore amazing science facts, cool tech, engineering projects, and
            fun math games!
          </p>
        </section>
      </main>
    </div>
  );
}
