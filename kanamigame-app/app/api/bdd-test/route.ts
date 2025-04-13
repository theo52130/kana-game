import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test de connexion simple en exécutant plusieurs requêtes
    const timestamp = new Date();
    
    // Récupérer quelques statistiques pour vérifier l'accès aux différentes tables
    const nbUsers = await prisma.user.count();
    const nbKanas = await prisma.kana.count();
    const nbGroups = await prisma.kanaGroup.count();
    const nbVariants = await prisma.kanaVariant.count();
    
    // Exemple de requête plus complexe
    const groupsWithCounts = await prisma.kanaGroup.findMany({
      select: {
        group_id: true,
        name: true,
        is_hiragana: true,
        _count: {
          select: { kanas: true }
        }
      },
      orderBy: { display_order: 'asc' },
      take: 5 // Limiter à 5 pour ne pas surcharger la réponse
    });

    // Retourne un succès avec les données récupérées
    return NextResponse.json({ 
      success: true, 
      message: 'Connexion à la base de données Prisma réussie', 
      timestamp,
      stats: {
        users: nbUsers,
        kanas: nbKanas,
        groups: nbGroups,
        variants: nbVariants,
        totalCharacters: nbKanas + nbVariants
      },
      sampleGroups: groupsWithCounts,
      dbInfo: {
        url: process.env.NODE_ENV === 'development' 
          ? '(Connexion établie avec Prisma)' 
          : 'Information masquée en production'
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Erreur de connexion à la base de données via Prisma:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    // Retourne une erreur avec les détails
    return NextResponse.json({ 
      success: false, 
      message: 'Échec de connexion à la base de données via Prisma', 
      error: errorMessage,
      suggestion: 'Vérifiez la variable DATABASE_URL dans votre fichier .env'
    }, { status: 500 });
  }
}