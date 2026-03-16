import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Admin secret para autenticação simples
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'quebrando-ciclo-admin-2024';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');
    const action = searchParams.get('action') || 'list';

    // Verificar autenticação admin
    if (adminKey !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    switch (action) {
      case 'list':
        return await listUsers();
      case 'stats':
        return await getStats();
      case 'inactive':
        return await getInactiveUsers();
      case 'cleanup':
        return await cleanupInactiveUsers();
      default:
        return await listUsers();
    }
  } catch (error) {
    console.error('Erro no admin:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Listar todos os usuários com suas informações
async function listUsers() {
  const users = await db.user.findMany({
    include: {
      profile: true,
      progress: true,
      dailyChecks: {
        orderBy: { date: 'desc' },
        take: 1,
      },
      achievements: {
        include: { achievement: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    lastActivity: user.lastActivity || user.updatedAt,
    daysSinceActivity: Math.floor(
      (Date.now() - new Date(user.lastActivity || user.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
    ),
    profile: user.profile ? {
      weight: user.profile.weight,
      goalWeight: user.profile.goalWeight,
      weightToLose: user.profile.weight - user.profile.goalWeight,
      objective: user.profile.objective,
    } : null,
    progress: user.progress ? {
      xp: user.progress.xp,
      level: user.progress.level,
      streak: user.progress.streak,
      totalDays: user.progress.totalDays,
      currentPhase: user.progress.currentPhase,
    } : null,
    todayCheckIn: user.dailyChecks[0] || null,
    achievementsCount: user.achievements.length,
  }));

  return NextResponse.json({
    total: users.length,
    users: formattedUsers,
  });
}

// Estatísticas gerais
async function getStats() {
  const totalUsers = await db.user.count();
  const activeToday = await db.user.count({
    where: {
      lastActivity: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  const activeThisWeek = await db.user.count({
    where: {
      lastActivity: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  const inactiveUsers = await db.user.count({
    where: {
      lastActivity: {
        lt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
    },
  });

  const totalCheckIns = await db.dailyCheck.count();
  const totalXP = await db.userProgress.aggregate({
    _sum: { xp: true },
  });

  const avgStreak = await db.userProgress.aggregate({
    _avg: { streak: true },
  });

  // Novos usuários por dia (últimos 7 dias)
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    const count = await db.user.count({
      where: {
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    });
    
    last7Days.push({
      date: date.toISOString().split('T')[0],
      newUsers: count,
    });
  }

  return NextResponse.json({
    totalUsers,
    activeToday,
    activeThisWeek,
    inactiveUsers,
    totalCheckIns,
    totalXP: totalXP._sum.xp || 0,
    avgStreak: Math.round(Number(avgStreak._avg.streak) || 0),
    last7Days,
  });
}

// Usuários inativos há mais de 4 dias
async function getInactiveUsers() {
  const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);

  const inactiveUsers = await db.user.findMany({
    where: {
      lastActivity: {
        lt: fourDaysAgo,
      },
    },
    include: {
      profile: true,
      progress: true,
    },
  });

  return NextResponse.json({
    total: inactiveUsers.length,
    users: inactiveUsers.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      lastActivity: u.lastActivity,
      daysInactive: Math.floor(
        (Date.now() - new Date(u.lastActivity || new Date()).getTime()) / (1000 * 60 * 60 * 24)
      ),
    })),
  });
}

// Limpar usuários inativos há mais de 4 dias
async function cleanupInactiveUsers() {
  const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);

  // Primeiro, buscar usuários para exclusão
  const usersToDelete = await db.user.findMany({
    where: {
      lastActivity: {
        lt: fourDaysAgo,
      },
    },
    select: { id: true, name: true, email: true },
  });

  // Excluir usuários (cascade vai excluir dados relacionados)
  const result = await db.user.deleteMany({
    where: {
      lastActivity: {
        lt: fourDaysAgo,
      },
    },
  });

  return NextResponse.json({
    message: `${result.count} usuários inativos foram removidos`,
    deletedUsers: usersToDelete,
    count: result.count,
  });
}

// Excluir usuário específico
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');
    const userId = searchParams.get('userId');

    if (adminKey !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 });
    }

    await db.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      message: 'Usuário excluído com sucesso',
    });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
