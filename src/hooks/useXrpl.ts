"use client"

import { getConditionAndFulfillment, makeid } from "@/lib/utils";
import { createContext, useLayoutEffect, useState } from "react"

import { Client, Wallet, xrpToDrops } from "xrpl"

const client = new Client('wss://s.altnet.rippletest.net:51233')

interface EscrowCreateResponse {
  condition: string;
  fulfillment: string;
  sequence: number;
}

export interface XrplContextT {
  wallet: Wallet | null;
  balance: string | null;
  createWallet: () => void;
  createEscrow: (am: number) => Promise<EscrowCreateResponse | null>;
}

export const XrplContext = createContext<XrplContextT>({
  wallet: null,
  balance: null,
  createWallet: () => {},
  createEscrow: async (am: number) => null
})


export default function useXrpl(): XrplContextT {

  const [seed, setSeed] = useState<string | null>(null)
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  async function loadBalance() {
    if (!wallet) {
      return;
    }
    const res = await client.getBalances(wallet.classicAddress)
    setBalance(res[0].value + ' ' + res[0].currency)
  }

  async function loadWalletFromLocal() {
    let seed = localStorage.getItem("wallet_seed")

    // Create a wallet if one has not already been generated
    if (!seed) {
      await createWallet();
      return;
    }

    setSeed(seed)
    const seedWallet = Wallet.fromSeed(seed)
    setWallet(seedWallet)
  }

  async function createWallet() {
    const seedWallet = Wallet.generate()
    const res = await client.fundWallet(seedWallet)
    
    // Stash seed in local storage to be retrieved again
    setSeed(seed)
    localStorage.setItem("wallet_seed", seedWallet.seed ?? "");
    setWallet(res.wallet)
  }

  async function loadAll() {
    await client.connect()
    loadWalletFromLocal()
  }

  async function createEscrow(amount: number): Promise<EscrowCreateResponse | null> {
    if (!wallet) return null;

    const [cond, ful] = getConditionAndFulfillment()

    const escrowTx = await client.autofill({
      "TransactionType": "EscrowCreate",
      "Account": wallet.address,
      "Amount": xrpToDrops(amount),
      "Destination": "rhsWsQjGv6sSVnRPwG1gEFkiDAaqCzhGzp",
      "CancelAfter": Math.round(new Date("2030-01-01").getTime() / 1000),
      "Condition": cond
    })

    const signed = wallet.sign(escrowTx);
    const tx = await client.submitAndWait(signed.tx_blob)

    return {
      condition: cond, fulfillment: ful, sequence: tx.result.Sequence ?? 0
    }
  }

  useLayoutEffect(() => {
    loadAll()
  }, [])

  useLayoutEffect(() => {
    if (wallet) {
      loadBalance()
    }
  }, [wallet])

  return {
    wallet,
    balance,
    createWallet,
    createEscrow
  }
}