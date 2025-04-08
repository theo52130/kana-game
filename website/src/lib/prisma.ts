import { PrismaClient } from '@prisma/client';

// Déclaration pour TypeScript
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Création du client Prisma en tenant compte de tous les environnements
const prismaClient = global.prisma || new PrismaClient();

// Sauvegarde du client dans l'objet global uniquement en développement
// pour éviter les instances multiples lors des rechargements à chaud
if (process.env.NODE_ENV !== 'production') global.prisma = prismaClient;

// Export du client comme singleton pour toute l'application
export const prisma = prismaClient;