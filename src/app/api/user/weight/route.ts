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

    const history = await db.weightHistory.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30,
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('Erro ao buscar histórico de peso:', error);
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
    const { weight } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    if (!weight) {
      return NextResponse.json(
        { error: 'Peso é obrigatório' },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const history = await db.weightHistory.upsert({
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

    // Atualizar peso atual no perfil
    await db.userProfile.updateMany({
      where: { userId },
      data: { weight: parseFloat(weight) },
    });

    return NextResponse.json({
      message: 'Peso registrado com sucesso!',
      history,
    });
  } catch (error) {
    console.error('Erro ao registrar peso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
