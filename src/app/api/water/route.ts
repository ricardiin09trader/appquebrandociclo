import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date');

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    // Buscar perfil para calcular meta
    const profile = await db.userProfile.findUnique({
      where: { userId },
    });

    // Calcular meta: peso * 35ml / 250ml (copos)
    const weight = profile?.weight || 70;
    const goalGlasses = Math.ceil((weight * 35) / 250);

    const date = dateStr ? new Date(dateStr) : new Date();
    date.setHours(0, 0, 0, 0);

    const waterIntake = await db.waterIntake.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
    });

    return NextResponse.json({
      glasses: waterIntake?.glasses || 0,
      goal: waterIntake?.goal || goalGlasses,
      weight,
      mlPerGlass: 250,
      totalMl: (waterIntake?.glasses || 0) * 250,
      goalMl: goalGlasses * 250,
    });
  } catch (error) {
    console.error('Erro ao buscar ingestão de água:', error);
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
    const { glasses } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Buscar perfil para calcular meta
    const profile = await db.userProfile.findUnique({
      where: { userId },
    });

    const weight = profile?.weight || 70;
    const goalGlasses = Math.ceil((weight * 35) / 250);

    const waterIntake = await db.waterIntake.upsert({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      update: {
        glasses,
      },
      create: {
        userId,
        date: today,
        glasses,
        goal: goalGlasses,
      },
    });

    // Verificar conquista de água
    if (glasses >= goalGlasses) {
      // Verificar sequência de água
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const waterHistory = await db.waterIntake.findMany({
        where: {
          userId,
          date: {
            gte: sevenDaysAgo,
            lte: today,
          },
        },
      });

      const daysWithGoal = waterHistory.filter((w) => w.glasses >= w.goal).length;

      if (daysWithGoal >= 7) {
        const waterAchievement = await db.achievement.findUnique({
          where: { code: 'water_7' },
        });

        if (waterAchievement) {
          const existing = await db.userAchievement.findUnique({
            where: {
              userId_achievementId: {
                userId,
                achievementId: waterAchievement.id,
              },
            },
          });

          if (!existing) {
            await db.userAchievement.create({
              data: {
                userId,
                achievementId: waterAchievement.id,
              },
            });

            await db.userProgress.update({
              where: { userId },
              data: {
                xp: { increment: waterAchievement.xpReward },
              },
            });
          }
        }
      }
    }

    return NextResponse.json({
      message: 'Ingestão de água atualizada!',
      waterIntake,
      percentage: Math.min((glasses / goalGlasses) * 100, 100),
    });
  } catch (error) {
    console.error('Erro ao atualizar ingestão de água:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
