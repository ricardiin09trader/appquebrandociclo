import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const phases = await db.phase.findMany({
      include: {
        contents: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { number: 'asc' },
    });

    return NextResponse.json(phases);
  } catch (error) {
    console.error('Erro ao buscar fases:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
