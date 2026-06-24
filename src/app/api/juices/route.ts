import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const juices = await db.juice.findMany({
      include: {
        favorites: userId ? {
          where: { userId },
        } : false,
      },
      orderBy: { name: 'asc' },
    });

    const juicesWithFavorite = juices.map((juice) => ({
      ...juice,
      isFavorite: userId ? juice.favorites?.length > 0 : false,
      favorites: undefined,
    }));

    return NextResponse.json(juicesWithFavorite);
  } catch (error) {
    console.error('Erro ao buscar sucos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
