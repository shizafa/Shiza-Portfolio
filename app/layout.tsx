import type { Metadata } from "next";
import { Anton, Inter, Bungee } from "next/font/google";
import Nav from "@/components/Nav";
import ConditionalBackButton from "@/components/ConditionalBackButton";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bungee = Bungee({
  variable: "--font-funky",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shiza Fatima — Creative Developer",
  description:
    "Portfolio of Shiza Fatima, a creative developer building interactive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${bungee.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <LoadingScreen />
          <Nav />
          <ConditionalBackButton />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
