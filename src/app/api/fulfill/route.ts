import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { Client, Wallet } from "xrpl"


const prisma = new PrismaClient()

export async function POST(request: NextRequest) {

  const client = new Client('wss://s.altnet.rippletest.net:51233')
  await client.connect()

  const { sequence, tx } = await request.json()

  const rec = await prisma.tasks.findFirst({ where: { sequence } })
  if (!rec) {
    return NextResponse.json({}, { status: 404 })
  }

  

  await prisma.tasks.update({ where: { id: rec.id }, data: { status: "completed" } })

  await client.disconnect()

  return NextResponse.json({
    message: "success"
  })
}