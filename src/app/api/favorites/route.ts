import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'recipe' or 'juice'

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const favorites = await db.favorite.findMany({
      where: {
        userId,
        ...(type === 'recipe' ? { recipeId: { not: null } } : {}),
        ...(type === 'juice' ? { juiceId: { not: null } } : {}),
      },
      include: {
        recipe: true,
        juice: true,
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
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
    const { recipeId, juiceId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    if (!recipeId && !juiceId) {
      return NextResponse.json(
        { error: 'ID da receita ou suco é obrigatório' },
        { status: 400 }
      );
    }

    const favorite = await db.favorite.create({
      data: {
        userId,
        ...(recipeId && { recipeId }),
        ...(juiceId && { juiceId }),
      },
    });

    // Verificar conquista de primeiro favorito
    if (recipeId) {
      const firstRecipeAchievement = await db.achievement.findUnique({
        where: { code: 'first_recipe' },
      });

      if (firstRecipeAchievement) {
        const existing = await db.userAchievement.findUnique({
          where: {
            userId_achievementId: {
              userId,
              achievementId: firstRecipeAchievement.id,
            },
          },
        });

        if (!existing) {
          await db.userAchievement.create({
            data: {
              userId,
              achievementId: firstRecipeAchievement.id,
            },
          });

          await db.userProgress.update({
            where: { userId },
            data: {
              xp: { increment: firstRecipeAchievement.xpReward },
            },
          });
        }
      }
    }

    return NextResponse.json({
      message: 'Adicionado aos favoritos!',
      favorite,
    });
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const { searchParams } = new URL(request.url);
    const recipeId = searchParams.get('recipeId');
    const juiceId = searchParams.get('juiceId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    if (recipeId) {
      await db.favorite.delete({
        where: {
          userId_recipeId: {
            userId,
            recipeId,
          },
        },
      });
    } else if (juiceId) {
      await db.favorite.delete({
        where: {
          userId_juiceId: {
            userId,
            juiceId,
          },
        },
      });
    } else {
      return NextResponse.json(
        { error: 'ID da receita ou suco é obrigatório' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Removido dos favoritos!' });
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
