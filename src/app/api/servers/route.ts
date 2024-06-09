import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import seedServers from '../../../../prisma/seedUtils';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Seed the servers table if necessary
    await seedServers();

    const servers = await prisma.servers.findMany();
    console.log("Fetched servers:", servers);
    return NextResponse.json({ servers });
  } catch (error) {
    console.error("Error fetching servers:", error);
    return NextResponse.json({ error: "Error fetching servers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, region, load, latency, bandwidth, cost } = await request.json();
    const newServer = await prisma.servers.create({
      data: {
        name,
        region,
        load,
        latency,
        bandwidth,
        cost
      }
    });
    console.log("Created server:", newServer);
    return NextResponse.json(newServer);
  } catch (error) {
    console.error("Error creating server:", error);
    return NextResponse.json({ error: "Error creating server" }, { status: 500 });
  }
}
