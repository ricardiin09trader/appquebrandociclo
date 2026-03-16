import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const userId = searchParams.get('userId');

    const where: Record<string, unknown> = {};
    if (category) {
      where.category = category;
    }

    const recipes = await db.recipe.findMany({
      where,
      include: {
        favorites: userId ? {
          where: { userId },
        } : false,
      },
      orderBy: { name: 'asc' },
    });

    // Adicionar flag de favorito
    const recipesWithFavorite = recipes.map((recipe) => ({
      ...recipe,
      isFavorite: userId ? recipe.favorites?.length > 0 : false,
      favorites: undefined,
    }));

    return NextResponse.json(recipesWithFavorite);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
