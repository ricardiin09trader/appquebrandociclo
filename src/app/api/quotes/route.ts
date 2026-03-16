import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const random = searchParams.get('random');

    const where: Record<string, unknown> = {};
    if (category) {
      where.category = category;
    }

    if (random === 'true') {
      // Buscar uma frase aleatória
      const count = await db.motivationalQuote.count({ where });
      const skip = Math.floor(Math.random() * count);
      
      const quote = await db.motivationalQuote.findFirst({
        where,
        skip,
      });

      return NextResponse.json(quote);
    }

    const quotes = await db.motivationalQuote.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Erro ao buscar frases:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
