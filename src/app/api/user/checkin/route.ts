import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCheck = await db.dailyCheck.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    return NextResponse.json(todayCheck || {
      drankWater: false,
      followedMeal: false,
      readContent: false,
      exercised: false,
      mindfulness: false,
      xpEarned: 0,
    });
  } catch (error) {
    console.error('Erro ao buscar check-in:', error);
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
    const { drankWater, followedMeal, readContent, exercised, mindfulness } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calcular XP ganho (10 XP por tarefa)
    let xpEarned = 0;
    if (drankWater) xpEarned += 10;
    if (followedMeal) xpEarned += 10;
    if (readContent) xpEarned += 10;
    if (exercised) xpEarned += 10;
    if (mindfulness) xpEarned += 10;

    const checkIn = await db.dailyCheck.upsert({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      update: {
        drankWater: drankWater ?? false,
        followedMeal: followedMeal ?? false,
        readContent: readContent ?? false,
        exercised: exercised ?? false,
        mindfulness: mindfulness ?? false,
        xpEarned,
      },
      create: {
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

    // Atualizar XP do usuário
    if (xpEarned > 0) {
      const currentProgress = await db.userProgress.findUnique({
        where: { userId },
      });

      if (currentProgress) {
        await db.userProgress.update({
          where: { userId },
          data: {
            xp: currentProgress.xp + xpEarned,
          },
        });
      }
    }

    // Verificar se todos os checks foram feitos para atualizar streak
    if (drankWater && followedMeal && readContent && exercised && mindfulness) {
      const progress = await db.userProgress.findUnique({
        where: { userId },
      });

      if (progress) {
        const lastCheckIn = progress.lastCheckIn;
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let newStreak = progress.streak;

        if (lastCheckIn) {
          const lastCheckDate = new Date(lastCheckIn);
          lastCheckDate.setHours(0, 0, 0, 0);

          if (lastCheckDate.getTime() === yesterday.getTime()) {
            // Continuou a sequência
            newStreak = progress.streak + 1;
          } else if (lastCheckDate.getTime() !== today.getTime()) {
            // Quebrou a sequência
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        await db.userProgress.update({
          where: { userId },
          data: {
            streak: newStreak,
            totalDays: progress.totalDays + 1,
            lastCheckIn: today,
          },
        });

        // Verificar conquistas de streak
        const streakAchievements = await db.achievement.findMany({
          where: {
            category: 'streak',
          },
        });

        for (const achievement of streakAchievements) {
          const req = achievement.requirement as { type: string; value: number };
          if (req.type === 'streak' && newStreak >= req.value) {
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

              // Dar XP da conquista
              await db.userProgress.update({
                where: { userId },
                data: {
                  xp: { increment: achievement.xpReward },
                },
              });
            }
          }
        }
      }
    }

    return NextResponse.json({
      message: 'Check-in atualizado!',
      checkIn,
      xpEarned,
    });
  } catch (error) {
    console.error('Erro ao fazer check-in:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
