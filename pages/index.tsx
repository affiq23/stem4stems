// import stem_logo from "public/stem_logo.jpg";
import React from "react";
import Image from "next/image";
import Quiz from "@/components/quiz";
import Content from "./content";



export default function Home() {
  return (
    <main>
      {/* <Image src={stem_logo} alt="STEM logo" /> */}
      <Quiz />
    </main>
  );
}

