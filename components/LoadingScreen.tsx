"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Loading...",
  "Warming up the pixels...",
  "Sharpening the details...",
  "Almost there...",
  "Compiling awesomeness...",
  "Brewing some creativity...",
  "Untangling the wires...",
  "Thanks for waiting...",
  "Just a moment...",
  "Polishing the edges...",
  "Ready.",
];

const MESSAGE_INTERVAL_MS = 180;
const TOTAL_DURATION_MS = 2200;
const FADE_DURATION_MS = 600;

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, TOTAL_DURATION_MS);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, TOTAL_DURATION_MS + FADE_DURATION_MS);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-[600ms] ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <p className="font-funky text-2xl text-white sm:text-3xl">
        {MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
