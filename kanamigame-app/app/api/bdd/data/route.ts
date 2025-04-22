import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mapper les noms de tables SQL aux modèles Prisma
const tableToModelMap: Record<string, string> = {
  'users': 'user',
  'achievements': 'achievement',
  'kana_groups': 'kanaGroup',
  'kanas': 'kana',
  'kana_variants': 'kanaVariant',
  'session_logs': 'sessionLog',
  'user_progress': 'userProgress',
  'kanji_levels': 'kanjiLevel',
  'kanjis': 'kanji',
  'kanji_readings': 'kanjiReading',
  'kanji_meanings': 'kanjiMeaning',
  'kanji_examples': 'kanjiExample',
  'user_kanji_progress': 'userKanjiProgress'
};

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
    
    const modelName = tableToModelMap[table];
    
    if (!modelName) {
      return NextResponse.json(
        { error: `Table "${table}" inconnue` },
        { status: 400 }
      );
    }
    
    // Obtenir les données via Prisma (limiter à 100 lignes pour performance)
    // @ts-expect-error - dynamic access to prisma client
    const rows = await prisma[modelName].findMany({
      take: 100
    });
    
    return NextResponse.json({ rows });
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}