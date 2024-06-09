import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
// import Sidebar from "../../components/Sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-[20rem_auto] min-h-screen flex-col">
      {/* <Sidebar/> */}
      <div className="p-16">
        {children}
      </div>
    </main>
  );
}
