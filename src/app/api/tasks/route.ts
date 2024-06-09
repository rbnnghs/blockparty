import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  return NextResponse.json({ tasks: await prisma.tasks.findMany() })
}


export async function POST(request: NextRequest) {
  const { id, code, maxspend, wallet_address, fulfillment, condition, sequence } = await request.json()

  console.log(fulfillment, condition, sequence)

  await prisma.tasks.create({
    data: {
      id, code, maxspend, wallet_address, status: "pending", fulfillment, condition, sequence
    }
  })

  return NextResponse.json({ status: "success" })
}

