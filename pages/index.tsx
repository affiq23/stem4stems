import stem_logo from "../public/stem_logo.png";
import React from "react";
import Image from "next/image";
import * as THREE from "three";

export default function Home() {
  return (
    <>
      <Image src={stem_logo} alt="stem_logo" />;
    </>
  );
}
