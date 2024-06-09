import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Navbar from "../../components/Header/header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex-col">
      <Navbar/>
      {/* <Sidebar/> */}
      <div className="p-16">
        {children}
      </div>
    </main>
  );
}
