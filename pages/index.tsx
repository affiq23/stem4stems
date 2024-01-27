// import stem_logo from "public/stem_logo.jpg";
import React from "react";
import Image from "next/image";
import Quiz from "@/components/quiz";



export default function Home() {
  return (
    <main>
      {/* <Image src={stem_logo} alt="STEM logo" /> */}
      <Quiz />
    </main>
  );
}

