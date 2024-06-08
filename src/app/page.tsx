import { Header } from "@/components/Header/header";
import { HeroSection } from "@/components/HeroSection/herosection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
    </div>
  );
}
