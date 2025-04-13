import { prisma } from './prisma';

// Récupération des statistiques
export async function getStatistiques() {
  try {
    // Nombre d'utilisateurs actifs
    const utilisateurs = await prisma.user.count({
      where: { is_active: true }
    });
    
    // Nombre total de caractères (kanas + variants)
    const nombreKanas = await prisma.kana.count();
    const nombreVariants = await prisma.kanaVariant.count();
    const caracteres = nombreKanas + nombreVariants;
    
    // Nombre de niveaux
    const niveaux = await prisma.kanaGroup.count();
    
    return { utilisateurs, caracteres, niveaux };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
}

// Récupération des groupes de kanas
export async function getKanaGroups() {
  return prisma.kanaGroup.findMany({
    orderBy: { display_order: 'asc' }
  });
}

// Récupération des kanas d'un groupe spécifique avec leurs variantes
export async function getKanasWithVariants(groupId: number) {
  return prisma.kana.findMany({
    where: { group_id: groupId },
    include: { variants: true },
    orderBy: { display_order: 'asc' }
  });
}

// Enregistrement d'une session d'apprentissage
export async function logSession(userId: number, groupId: number, correct: number, wrong: number) {
  return prisma.sessionLog.create({
    data: {
      user_id: userId,
      group_id: groupId,
      correct_answers: correct,
      wrong_answers: wrong,
      start_time: new Date(),
      end_time: new Date()
    }
  });
}

// Mise à jour du progrès d'un utilisateur pour un kana
export async function updateKanaProgress(userId: number, kanaId: number, isCorrect: boolean) {
  // Récupérer le progrès existant ou en créer un nouveau
  const existingProgress = await prisma.userProgress.findFirst({
    where: { user_id: userId, kana_id: kanaId }
  });
  
  if (existingProgress) {
    // Mettre à jour le progrès existant
    return prisma.userProgress.update({
      where: { progress_id: existingProgress.progress_id },
      data: {
        correct_count: isCorrect ? existingProgress.correct_count + 1 : existingProgress.correct_count,
        incorrect_count: isCorrect ? existingProgress.incorrect_count : existingProgress.incorrect_count + 1,
        last_practiced: new Date(),
        // Calculer le nouveau niveau de maîtrise (exemple simple)
        mastery_level: isCorrect 
          ? Math.min(10, existingProgress.mastery_level + 1) 
          : Math.max(0, existingProgress.mastery_level - 1)
      }
    });
  } else {
    // Créer un nouveau progrès
    return prisma.userProgress.create({
      data: {
        user_id: userId,
        kana_id: kanaId,
        correct_count: isCorrect ? 1 : 0,
        incorrect_count: isCorrect ? 0 : 1,
        last_practiced: new Date(),
        mastery_level: isCorrect ? 1 : 0
      }
    });
  }
}