
import { PrismaClient } from '@prisma/client';

// Add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal & typeof globalThis;

// Check if we're in a Node.js environment where global is defined
const prismaGlobal = typeof global !== 'undefined' ? global : {};

// Check for existing instance or create a new PrismaClient
const prisma = (prismaGlobal as any).prisma || new PrismaClient();

// Save the instance in development mode if we're in Node.js
if (process.env.NODE_ENV === 'development' && typeof global !== 'undefined') {
  (prismaGlobal as any).prisma = prisma;
}

export default prisma;
