"use client"

import "./globals.css";
import { Poppins } from 'next/font/google'
import useXrpl, { XrplContext } from "@/hooks/useXrpl";

const poppins = Poppins({ style: "normal", weight: "400", subsets: [ "latin" ] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ctx = useXrpl();
  return (
    <html lang="en">
      <XrplContext.Provider value={ctx}>
        <body className={poppins.className}>{children}</body>
      </XrplContext.Provider>
    </html>
  );
}
