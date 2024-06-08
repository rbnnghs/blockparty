import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-[20rem_auto] min-h-screen flex-col">
      <div className="h-full bg-slate-50 p-6 border-r border-black border-opacity-10">
        <Link href={"/"}>
          <p className="text-xl font-medium py-4">BlockCloud</p>
        </Link>
        <Link href={"/dashboard/business"}>
          <p className="py-2">Business</p>
        </Link>
        <Link href={"/dashboard/host"}>
          <p className="py-2">Host</p>
        </Link>
      </div>
      <div className="p-16">
        {children}
      </div>
    </main>
  );
}
