// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// export const prisma = globalForPrisma.prisma || new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// process.on('beforeExit', async () => { await prisma.$disconnect() });

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Use the existing instance in development, or create a new one in production
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Gracefully handle disconnection on shutdown signals
const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

process.on('beforeExit', disconnectPrisma);
process.on('SIGINT', disconnectPrisma);
process.on('SIGTERM', disconnectPrisma);