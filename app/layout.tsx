import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Wrapper from "@/components/wrapper";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geo Globe Three | Interactive 3D World Visualization",
  description:
    "An interactive 3D globe visualization built with Next.js, React Three Fiber, and Three.js. Explore world country boundaries with smooth rotation, zoom controls, and WebGL-powered graphics using GeoJSON data.",
  openGraph: {
    title: "Geo Globe Three | Interactive 3D World Visualization",
    description:
      "An interactive 3D globe visualization built with Next.js, React Three Fiber, and Three.js. Explore world country boundaries with smooth rotation, zoom controls, and WebGL-powered graphics using GeoJSON data.",
    images: ["/screenshot.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geo Globe Three | Interactive 3D World Visualization",
    description:
      "An interactive 3D globe visualization built with Next.js, React Three Fiber, and Three.js. Explore world country boundaries with smooth rotation, zoom controls, and WebGL-powered graphics using GeoJSON data.",
    images: ["/screenshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased",
          "bg-[#010101]",
          geistSans.variable,
          geistMono.variable,
        )}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
