import { PrismaClient } from '@prisma/client';

// Déclare une variable globale pour PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Utilise un singleton pour PrismaClient pour éviter plusieurs instances en développement
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;