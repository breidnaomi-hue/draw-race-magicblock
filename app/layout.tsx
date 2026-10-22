import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRAW RACE — Bad art. Great races.",
  description: "Draw your horse. Race your friends. A free drawing party game for 2–4 people. No account or wallet needed.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
