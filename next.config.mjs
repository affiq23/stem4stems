/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
};
const withTM = require("next-transpile-modules")(["three"]);
module.exports = withTM();

export default nextConfig;
