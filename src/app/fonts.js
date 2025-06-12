import localFont from "next/font/local";

export const rokaf = localFont({
  src: "/assets/fonts/rokaf-sans-bold.woff2",
  variable: "--font-rokaf",
});

export const pretendard = localFont({
  src: "/assets/fonts/pretendard.woff2",
  display: "swap",
  weight: "100 800",
  variable: "--font-pretendard",
});
