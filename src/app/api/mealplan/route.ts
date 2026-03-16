import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dayOfWeek = searchParams.get('day');

    const where: Record<string, unknown> = {};
    if (dayOfWeek) {
      where.dayOfWeek = parseInt(dayOfWeek);
    }

    const mealPlan = await db.mealPlan.findMany({
      where,
      orderBy: [
        { dayOfWeek: 'asc' },
        { mealType: 'asc' },
      ],
    });

    // Agrupar por dia da semana
    const groupedByDay: Record<number, Record<string, typeof mealPlan[0]>> = {};

    for (const meal of mealPlan) {
      if (!groupedByDay[meal.dayOfWeek]) {
        groupedByDay[meal.dayOfWeek] = {};
      }
      groupedByDay[meal.dayOfWeek][meal.mealType] = meal;
    }

    return NextResponse.json(groupedByDay);
  } catch (error) {
    console.error('Erro ao buscar plano alimentar:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
