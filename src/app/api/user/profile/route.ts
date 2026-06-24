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

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        progress: true,
        achievements: {
          include: {
            achievement: true,
          },
          orderBy: { unlockedAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const { name, weight, height, goalWeight, objective, activityLevel } = body;

    // Atualizar nome do usuário
    if (name) {
      await db.user.update({
        where: { id: userId },
        data: { name },
      });
    }

    // Atualizar ou criar perfil
    const existingProfile = await db.userProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      await db.userProfile.update({
        where: { userId },
        data: {
          ...(weight !== undefined && { weight: parseFloat(weight) }),
          ...(height !== undefined && { height: parseFloat(height) }),
          ...(goalWeight !== undefined && { goalWeight: parseFloat(goalWeight) }),
          ...(objective && { objective }),
          ...(activityLevel && { activityLevel }),
        },
      });
    } else {
      await db.userProfile.create({
        data: {
          userId,
          weight: weight ? parseFloat(weight) : 0,
          height: height ? parseFloat(height) : 0,
          goalWeight: goalWeight ? parseFloat(goalWeight) : 0,
          objective: objective || 'lose',
          activityLevel: activityLevel || 'sedentary',
        },
      });
    }

    // Se peso foi atualizado, registrar no histórico
    if (weight) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await db.weightHistory.upsert({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
        update: {
          weight: parseFloat(weight),
        },
        create: {
          userId,
          date: today,
          weight: parseFloat(weight),
        },
      });
    }

    return NextResponse.json({ message: 'Perfil atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
