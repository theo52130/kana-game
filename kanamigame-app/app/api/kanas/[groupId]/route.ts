import { NextRequest, NextResponse } from 'next/server';
import { getKanasWithVariants } from '@/lib/db-utils';

export async function GET(
  request: NextRequest,
  context: { params: { groupId: string } }
) {
  try {
    const groupId = parseInt(context.params.groupId, 10);
    if (isNaN(groupId)) {
      return NextResponse.json({ error: 'ID de groupe invalide' }, { status: 400 });
    }

    const kanas = await getKanasWithVariants(groupId);
    return NextResponse.json(kanas, { status: 200 });
  } catch (error) {
    console.error(`Erreur lors de la récupération des kanas pour le groupe ${context.params.groupId}:`, error);
    return NextResponse.json({ error: 'Échec de la récupération des données' }, { status: 500 });
  }
}