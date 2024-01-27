/* eslint-disable react/no-unescaped-entities */
// Home.tsx
import React from "react";
import Image from "next/image";
import stem_logo from "../public/stem_logo.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="bg-gray-800 text-3xl p-5 text-center shadow-md flex justify-center items-center">
        <Image
          src={stem_logo}
          alt="STEM logo"
          width={100}
          height={100}
          className="rounded-s-3xl"
        />
        <span className="ml-4">STEM4stems</span>
      </header>

      <main className="flex-grow">
        <section className="text-center py-12">
          <h1 className="text-5xl font-bold mb-6">
            Explore the Wonders of Science and Technology!
          </h1>
          <p className="text-2xl mx-auto leading-relaxed max-w-2xl">
            Join us on a journey of discovery through fun and educational
            activities in Science, Technology, Engineering, and Math.
          </p>
        </section>

        <section className="flex justify-center py-10">
          <div className="p-8 bg-gray-700 rounded-xl shadow-lg">
            <h2 className="text-3xl font-medium">About STEM</h2>
            <p className="text-xl">
              Discover the exciting world of STEM and learn why it's so
              important for your future!
            </p>
          </div>
        </section>

        <section className="bg-gray-900 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-2xl mx-auto leading-relaxed max-w-2xl">
              Our goal is to make learning both fun and inspiring, helping you
              to unlock your potential and creativity.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
            <p className="text-2xl mx-auto leading-relaxed max-w-2xl">
              Discover exciting projects, interactive lessons, and cool
              experiments that you can try at home or school!
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-center p-5">
        © {new Date().getFullYear()} STEM Kids' World
      </footer>
    </div>
  );
}
