import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-full">
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
  )
}