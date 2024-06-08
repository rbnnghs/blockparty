import Link from "next/link";

export default function Sidebar() {
  return (
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
  )
}