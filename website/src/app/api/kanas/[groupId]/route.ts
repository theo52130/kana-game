import { NextResponse } from 'next/server';
import { getKanasWithVariants } from '@/lib/db-utils';

export async function GET(request: Request, { params }: { params: { groupId: string } }) {
  try {
    const groupId = parseInt(params.groupId);
    if (isNaN(groupId)) {
      return NextResponse.json({ error: "ID de groupe invalide" }, { status: 400 });
    }
    
    const kanas = await getKanasWithVariants(groupId);
    return NextResponse.json(kanas, { status: 200 });
  } catch (error) {
    console.error(`Erreur lors de la récupération des kanas pour le groupe ${params.groupId}:`, error);
    return NextResponse.json({ error: "Échec de la récupération des données" }, { status: 500 });
  }
}