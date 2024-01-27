/** @type {import('next').NextConfig} */
import nextTranspileModules from "next-transpile-modules";

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
};

const withTM = nextTranspileModules(["three"]);

export default withTM(nextConfig);
