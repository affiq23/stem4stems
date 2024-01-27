import stem_logo from "../public/stem_logo.png";
import React from "react";
import Image from "next/image";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main>
      <div>
        <Image
          src={stem_logo}
          alt="STEM logo"
          className="rounded-full"
          width={500}
          height={1000}
        />
      </div>
    </main>
  );
}
