import stem_logo from "public/stem_logo.png";
import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Image src={stem_logo} alt="STEM logo" />
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </main>
  );
}
