/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Form from "@/components/form";

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
      <aside
        id="default-sidebar"
        className="w-60 bg-gray-800 p-5 ml-5 mt-5 mb-5 rounded-lg shadow-lg"
        aria-label="Sidenav"
      >
        <div className="overflow-y-hidden py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-y-hidden w-52 h-52 -translate-x-7">
            <Canvas>
              <ambientLight />
              <pointLight position={[0, 0, 0]} />
              <RotatingImage texture={texture} />
            </Canvas>
          </div>
          <h2 className="text-xl font-semibold mx-4">STEM4stems</h2>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">STEM Success</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                <span className="ml-3">Practice!</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Explore STEM</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-grow">
        <section className="text-center py-12">
          <span className="flex place-content-center pt-14 text-6xl font-bold text-transparent bg-clip-text ">
            <h1 className="animate-text text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-teal-500 to-red-200">
              Discover the fun of STEM!
            </h1>
          </span>

          <p className="text-2xl mx-auto leading-relaxed max-w-2xl pt-2">
            Explore amazing science facts, cool applications of technology,
            beautiful engineering projects, and fun math games!
          </p>
        </section>
        <section className="w-5/6 h-2/3 bg-red-200 ">
          
        </section>
      </main>
    </div>
  );
}
