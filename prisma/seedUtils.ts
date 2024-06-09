import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedServers = async () => {
  const count = await prisma.servers.count();

  if (count === 0) {
    console.log("Seeding servers table...");
    await prisma.servers.createMany({
      data: [
        {
          name: 'Server 1',
          region: 'North America',
          load: 30,
          latency: 50,
          bandwidth: 1000,
          cost: 10,
        },
        {
          name: 'Server 2',
          region: 'North America',
          load: 45,
          latency: 60,
          bandwidth: 1500,
          cost: 15,
        },
        {
          name: 'Server 3',
          region: 'North America',
          load: 25,
          latency: 40,
          bandwidth: 2000,
          cost: 20,
        },
        {
          name: 'Server 4',
          region: 'Europe',
          load: 20,
          latency: 70,
          bandwidth: 2000,
          cost: 12,
        },
        {
          name: 'Server 5',
          region: 'Europe',
          load: 50,
          latency: 80,
          bandwidth: 1200,
          cost: 18,
        },
        {
          name: 'Server 6',
          region: 'Europe',
          load: 35,
          latency: 65,
          bandwidth: 1800,
          cost: 22,
        },
        {
          name: 'Server 7',
          region: 'Asia',
          load: 50,
          latency: 100,
          bandwidth: 1500,
          cost: 14,
        },
        {
          name: 'Server 8',
          region: 'Asia',
          load: 40,
          latency: 90,
          bandwidth: 1600,
          cost: 16,
        },
        {
          name: 'Server 9',
          region: 'Asia',
          load: 55,
          latency: 110,
          bandwidth: 1400,
          cost: 19,
        },
      ],
    });
    console.log("Servers table seeded successfully.");
  } else {
    console.log("Servers table already has data, no need to seed.");
  }
};

export default seedServers;
