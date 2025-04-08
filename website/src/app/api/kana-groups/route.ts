import { NextResponse } from 'next/server';
import { getKanaGroups } from '@/lib/db-utils';

export async function GET() {
  try {
    const groups = await getKanaGroups();
    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des groupes de kanas:", error);
    return NextResponse.json({ error: "Échec de la récupération des données" }, { status: 500 });
  }
}