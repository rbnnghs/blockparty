import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col justify-between bg-slate-50 p-6 border-r border-black border-opacity-10">
      <div className="grow">
        <Link href={"/"}>
          <p className="text-xl font-medium py-4">BlockCloud</p>
        </Link>
        <Link href={"/dashboard/business"}>
          <p className="py-2 hover:-translate-y-0.5 transition-all duration-200">Business</p>
        </Link>
        <Link href={"/dashboard/host"}>
          <p className="py-2 hover:-translate-y-0.5 transition-all duration-200">Host</p>
        </Link>
      </div>
      {/* <Link href={"/dashboard/account"}>
        <p>Account</p>
      </Link> */}
    </div>
  )
}