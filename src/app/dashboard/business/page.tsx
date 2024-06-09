"use client"
import CopyTextField from "@/components/CopyTextField/copytextfield";
import CopyIcon from "@/components/Icons/CopyIcon";
import { XrplContext } from "@/hooks/useXrpl";
import { useContext } from "react";

export default function BusinessPage() {
  const { wallet, balance } = useContext(XrplContext);
  
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 py-4">
        <p className="font-semibold text-xl">
          Billing Account Info
        </p>
        <p className="text-stone-500 text-sm">Your current account balance is <span className="text-[#008aff]">{balance}</span>. Deposit more XRP directly the the address below to increase your available balance.</p>
        
        <CopyTextField placeholder="Wallet Address" value={wallet?.address ?? null}/>
        <CopyTextField placeholder="Seed" hidden value={wallet?.seed ?? null}/>

      </div>
      <hr/>
    </div>
  )
}