import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    const achievements = await db.achievement.findMany({
      include: userId ? {
        userAchievements: {
          where: { userId },
        },
      } : false,
    },);

    const achievementsWithStatus = achievements.map((achievement) => ({
      ...achievement,
      unlocked: userId ? achievement.userAchievements?.length > 0 : false,
      unlockedAt: userId ? achievement.userAchievements?.[0]?.unlockedAt : null,
      userAchievements: undefined,
    }));

    return NextResponse.json(achievementsWithStatus);
  } catch (error) {
    console.error('Erro ao buscar conquistas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
