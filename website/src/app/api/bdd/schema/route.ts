import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    
    if (!table) {
      return NextResponse.json(
        { error: 'Paramètre "table" manquant' },
        { status: 400 }
      );
    }
    
    // Connexion directe à PostgreSQL pour cette requête spécifique
    // car Prisma n'a pas d'API pour accéder au schéma de la base
    const result = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = ${table} AND table_schema = 'public'
      ORDER BY ordinal_position
    `;
    
    return NextResponse.json({ columns: result });
  } catch (error) {
    console.error('Erreur lors de la récupération du schéma:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du schéma' },
      { status: 500 }
    );
  }
}