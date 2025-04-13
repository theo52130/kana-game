import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Obtenir toutes les tables du modèle Prisma
    const prismaModels = [
      { name: 'user', mappedName: 'users' },
      { name: 'achievement', mappedName: 'achievements' },
      { name: 'kanaGroup', mappedName: 'kana_groups' },
      { name: 'kana', mappedName: 'kanas' },
      { name: 'kanaVariant', mappedName: 'kana_variants' },
      { name: 'sessionLog', mappedName: 'session_logs' },
      { name: 'userProgress', mappedName: 'user_progress' },
      { name: 'kanjiLevel', mappedName: 'kanji_levels' },
      { name: 'kanji', mappedName: 'kanjis' },
      { name: 'kanjiReading', mappedName: 'kanji_readings' },
      { name: 'kanjiMeaning', mappedName: 'kanji_meanings' },
      { name: 'kanjiExample', mappedName: 'kanji_examples' },
      { name: 'userKanjiProgress', mappedName: 'user_kanji_progress' }
    ];
    
    // Récupérer le nombre d'enregistrements pour chaque table
    const tables = await Promise.all(
      prismaModels.map(async (model) => {
        try {
          // @ts-expect-error - dynamic access to prisma client
          const count = await prisma[model.name].count();
          return {
            table_name: model.mappedName,
            row_count: count
          };
        } catch (error) {
          console.error(`Erreur lors du comptage pour ${model.name}:`, error);
          return {
            table_name: model.mappedName,
            row_count: 0,
            error: 'Erreur de comptage'
          };
        }
      })
    );
    
    return NextResponse.json({ tables });
  } catch (error) {
    console.error('Erreur lors de la récupération des tables:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des tables' },
      { status: 500 }
    );
  }
}