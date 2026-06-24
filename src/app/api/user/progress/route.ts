import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Calcular nível baseado no XP
function calculateLevel(xp: number): number {
  // Cada nível precisa de 100 XP * nível
  let level = 1;
  let xpNeeded = 100;
  let totalXp = 0;

  while (totalXp + xpNeeded <= xp) {
    totalXp += xpNeeded;
    level++;
    xpNeeded = level * 100;
  }

  return level;
}

// Calcular XP necessário para próximo nível
function getXpForNextLevel(level: number): number {
  return level * 100;
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const progress = await db.userProgress.findUnique({
      where: { userId },
    });

    if (!progress) {
      return NextResponse.json(
        { error: 'Progresso não encontrado' },
        { status: 404 }
      );
    }

    // Recalcular nível baseado no XP atual
    const calculatedLevel = calculateLevel(progress.xp);
    const xpForNextLevel = getXpForNextLevel(calculatedLevel);
    let currentLevelXp = 0;

    // Calcular XP atual no nível
    for (let i = 1; i < calculatedLevel; i++) {
      currentLevelXp += i * 100;
    }
    const xpInCurrentLevel = progress.xp - currentLevelXp;

    return NextResponse.json({
      ...progress,
      level: calculatedLevel,
      xpForNextLevel,
      xpInCurrentLevel,
      progressToNextLevel: (xpInCurrentLevel / xpForNextLevel) * 100,
    });
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();
    const { xp, phase, phaseProgress } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const currentProgress = await db.userProgress.findUnique({
      where: { userId },
    });

    if (!currentProgress) {
      return NextResponse.json(
        { error: 'Progresso não encontrado' },
        { status: 404 }
      );
    }

    const newXP = currentProgress.xp + (xp || 0);
    const newLevel = calculateLevel(newXP);

    const updateData: Record<string, unknown> = {
      xp: newXP,
      level: newLevel,
    };

    if (phase !== undefined) {
      updateData.currentPhase = phase;
    }

    if (phaseProgress !== undefined && phase !== undefined) {
      updateData[`phase${phase}Progress`] = phaseProgress;
    }

    const updatedProgress = await db.userProgress.update({
      where: { userId },
      data: updateData,
    });

    // Verificar conquistas de nível
    const levelAchievements = await db.achievement.findMany({
      where: {
        category: 'special',
        code: { startsWith: 'level_' },
      },
    });

    for (const achievement of levelAchievements) {
      const req = achievement.requirement as { type: string; value: number };
      if (req.type === 'level' && newLevel >= req.value) {
        const existing = await db.userAchievement.findUnique({
          where: {
            userId_achievementId: {
              userId,
              achievementId: achievement.id,
            },
          },
        });

        if (!existing) {
          await db.userAchievement.create({
            data: {
              userId,
              achievementId: achievement.id,
            },
          });
        }
      }
    }

    return NextResponse.json({
      message: 'Progresso atualizado!',
      progress: updatedProgress,
      levelUp: newLevel > currentProgress.level,
    });
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
