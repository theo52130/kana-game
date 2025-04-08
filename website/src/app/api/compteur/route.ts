import { NextResponse } from 'next/server';
import { getStatistiques } from '@/lib/db-utils';

export async function GET() {
  try {
    const statistiques = await getStatistiques();
    console.log("Statistiques récupérées avec succès:", statistiques);
    
    return NextResponse.json(statistiques, { status: 200 });
  } catch (error) {
    console.error("Erreur API:", error);
    
    // Répondre avec des valeurs par défaut et un message d'erreur
    return NextResponse.json(
      { 
        utilisateurs: 0, 
        caracteres: 0, 
        niveaux: 0, 
        error: "Erreur lors de la récupération des statistiques",
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 200 } // Retourner 200 avec des valeurs par défaut pour ne pas casser le front
    );
  }
}