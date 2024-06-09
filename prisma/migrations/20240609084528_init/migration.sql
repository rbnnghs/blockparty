-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "maxspend" INTEGER NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "load" INTEGER NOT NULL,
    "latency" INTEGER NOT NULL,
    "bandwidth" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);
