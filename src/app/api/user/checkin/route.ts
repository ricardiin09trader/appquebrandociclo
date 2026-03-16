import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      drankWater, 
      followedMeal, 
      readContent, 
      exercised, 
      mindfulness 
    } = body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Buscar ou criar check-in do dia
    let dailyCheck = await db.dailyCheck.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    // Calcular XP ganho (cada tarefa = 10 XP)
    const tasksCompleted = [
      drankWater, 
      followedMeal, 
      readContent, 
      exercised, 
      mindfulness
    ].filter(Boolean).length;
    
    const xpEarned = tasksCompleted * 10;

    if (dailyCheck) {
      // Atualizar check-in existente
      dailyCheck = await db.dailyCheck.update({
        where: { id: dailyCheck.id },
        data: {
          drankWater: drankWater ?? dailyCheck.drankWater,
          followedMeal: followedMeal ?? dailyCheck.followedMeal,
          readContent: readContent ?? dailyCheck.readContent,
          exercised: exercised ?? dailyCheck.exercised,
          mindfulness: mindfulness ?? dailyCheck.mindfulness,
          xpEarned,
        },
      });
    } else {
      // Criar novo check-in
      dailyCheck = await db.dailyCheck.create({
        data: {
          userId,
          date: today,
          drankWater: drankWater ?? false,
          followedMeal: followedMeal ?? false,
          readContent: readContent ?? false,
          exercised: exercised ?? false,
          mindfulness: mindfulness ?? false,
          xpEarned,
        },
      });

      // Atualizar streak
      const progress = await db.userProgress.findUnique({
        where: { userId },
      });

      if (progress) {
        const lastCheckIn = progress.lastCheckIn;
        let newStreak = progress.streak;

        if (lastCheckIn) {
          const lastCheck = new Date(lastCheckIn);
          lastCheck.setHours(0, 0, 0, 0);
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);

          if (lastCheck.getTime() === yesterday.getTime()) {
            // Check-in consecutivo
            newStreak = progress.streak + 1;
          } else if (lastCheck.getTime() !== today.getTime()) {
            // Quebrou o streak
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        await db.userProgress.update({
          where: { userId },
          data: {
            streak: newStreak,
            lastCheckIn: today,
            totalDays: { increment: 1 },
          },
        });
      }
    }

    // Atualizar XP total do usuário
    await db.userProgress.update({
      where: { userId },
      data: {
        xp: { increment: xpEarned },
        // Calcular nível baseado no XP (cada 100 XP = 1 nível)
      },
    });

    // Recalcular nível
    const userProgress = await db.userProgress.findUnique({
      where: { userId },
    });

    if (userProgress) {
      const newLevel = Math.floor(userProgress.xp / 100) + 1;
      if (newLevel !== userProgress.level) {
        await db.userProgress.update({
          where: { userId },
          data: { level: newLevel },
        });
      }
    }

    // Atualizar última atividade do usuário
    await db.user.update({
      where: { id: userId },
      data: { lastActivity: new Date() },
    });

    // Verificar conquistas
    await checkAchievements(userId);

    return NextResponse.json({
      message: 'Check-in atualizado!',
      dailyCheck,
      xpEarned,
    });
  } catch (error) {
    console.error('Erro no check-in:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyCheck = await db.dailyCheck.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    return NextResponse.json(dailyCheck || {
      drankWater: false,
      followedMeal: false,
      readContent: false,
      exercised: false,
      mindfulness: false,
    });
  } catch (error) {
    console.error('Erro ao buscar check-in:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

async function checkAchievements(userId: string) {
  try {
    const progress = await db.userProgress.findUnique({
      where: { userId },
    });

    if (!progress) return;

    const achievements = await db.achievement.findMany();
    const userAchievements = await db.userAchievement.findMany({
      where: { userId },
    });

    const unlockedCodes = userAchievements.map(ua => ua.achievement.code);

    for (const achievement of achievements) {
      if (unlockedCodes.includes(achievement.code)) continue;

      let shouldUnlock = false;

      switch (achievement.code) {
        case 'first_day':
          shouldUnlock = progress.totalDays >= 1;
          break;
        case 'streak_7':
          shouldUnlock = progress.streak >= 7;
          break;
        case 'streak_30':
          shouldUnlock = progress.streak >= 30;
          break;
        case 'level_5':
          shouldUnlock = progress.level >= 5;
          break;
        case 'level_10':
          shouldUnlock = progress.level >= 10;
          break;
      }

      if (shouldUnlock) {
        await db.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id,
          },
        });

        // Dar XP da conquista
        await db.userProgress.update({
          where: { userId },
          data: { xp: { increment: achievement.xpReward } },
        });
      }
    }
  } catch (error) {
    console.error('Erro ao verificar conquistas:', error);
  }
}
