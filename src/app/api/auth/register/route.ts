import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, weight, height, goalWeight, objective, activityLevel } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, senha e nome são obrigatórios' },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    if (weight || height || goalWeight) {
      await db.userProfile.create({
        data: {
          userId: user.id,
          weight: weight ? parseFloat(weight) : 0,
          height: height ? parseFloat(height) : 0,
          goalWeight: goalWeight ? parseFloat(goalWeight) : 0,
          objective: objective || 'lose',
          activityLevel: activityLevel || 'sedentary',
        },
      });
    }

    await db.userProgress.create({
      data: {
        userId: user.id,
        xp: 0,
        level: 1,
        currentPhase: 1,
        streak: 0,
        totalDays: 0,
      },
    });

    // Dar conquista de primeiro dia
    const firstDayAchievement = await db.achievement.findUnique({
      where: { code: 'first_day' },
    });

    if (firstDayAchievement) {
      await db.userAchievement.create({
        data: {
          userId: user.id,
          achievementId: firstDayAchievement.id,
        },
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Usuário criado com sucesso!',
      user: userWithoutPassword,
      userId: user.id,
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
