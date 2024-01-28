import "@/styles/globals.css";
import "@fontsource/orbitron";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
