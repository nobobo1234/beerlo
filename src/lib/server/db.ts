import { PrismaClient, Prisma } from "@prisma-app/client";
import type { Player, Session } from "@prisma-app/client";

// Use a single PrismaClient instance throughout the app's lifecycle
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to maintain connection across hot-reloads
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export { prisma, Prisma };
export type { Player, Session };
