import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  return NextResponse.json({ tasks: await prisma.tasks.findMany() })
}


export async function POST(request: NextRequest) {
  const { id, code, maxspend, wallet_address } = await request.json()

  await prisma.tasks.create({
    data: {
      id, code, maxspend, wallet_address, status: "pending"
    }
  })

  return NextResponse.json({ status: "success" })
}