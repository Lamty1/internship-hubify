
import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Check for existing instance or create a new PrismaClient
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Save the instance in development mode
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
