import type { AppProps } from "next/app";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { bootstrapAuth } from "@/stores/bootstrapAuth";

bootstrapAuth();

const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={pretendard.className}>
      <Component {...pageProps} />
    </main>
  );
}
