import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const tasks = await prisma.tasks.findMany();
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {

  try {
    const { id, code, maxspend, wallet_address, fulfillment, condition, sequence } = await request.json()
    console.log("Received task data:", { id, code, maxspend, wallet_address });

    const newTask =   await prisma.tasks.create({
      data: {
        id, code, maxspend, wallet_address, status: "pending", fulfillment, condition, sequence
      }
    })

    console.log("Task created successfully:", newTask);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}
