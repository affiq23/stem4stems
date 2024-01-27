import stem_logo from "../public/stem_logo.png";
import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Image src={stem_logo} alt="STEM logo" />
    </main>
  );
}
