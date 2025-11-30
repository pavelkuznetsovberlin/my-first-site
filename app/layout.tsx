import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pavel Kuznetsov | Pianist",
  description: "Minimalist black-and-white portfolio of pianist Pavel Kuznetsov.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
