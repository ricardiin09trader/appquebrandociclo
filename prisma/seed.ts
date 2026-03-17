import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar conquistas
  const achievements = [
    {
      code: 'first_day',
      name: 'Primeiro Passo',
      description: 'Completou seu primeiro dia na jornada',
      emoji: '🌱',
      xpReward: 10,
      category: 'streak',
      requirement: JSON.stringify({ type: 'days', value: 1 }),
    },
    {
      code: 'streak_7',
      name: 'Semana Perfeita',
      description: '7 dias seguidos de check-in',
      emoji: '🔥',
      xpReward: 50,
      category: 'streak',
      requirement: JSON.stringify({ type: 'streak', value: 7 }),
    },
    {
      code: 'streak_30',
      name: 'Mês Incrível',
      description: '30 dias seguidos de check-in',
      emoji: '🏆',
      xpReward: 200,
      category: 'streak',
      requirement: JSON.stringify({ type: 'streak', value: 30 }),
    },
    {
      code: 'level_5',
      name: 'Explorador',
      description: 'Alcançou o nível 5',
      emoji: '⭐',
      xpReward: 100,
      category: 'level',
      requirement: JSON.stringify({ type: 'level', value: 5 }),
    },
    {
      code: 'level_10',
      name: 'Veterano',
      description: 'Alcançou o nível 10',
      emoji: '💎',
      xpReward: 300,
      category: 'level',
      requirement: JSON.stringify({ type: 'level', value: 10 }),
    },
    {
      code: 'water_master',
      name: 'Mestre da Água',
      description: 'Bateu a meta de água 7 dias seguidos',
      emoji: '💧',
      xpReward: 50,
      category: 'water',
      requirement: JSON.stringify({ type: 'water_streak', value: 7 }),
    },
    {
      code: 'all_checks',
      name: 'Dia Perfeito',
      description: 'Completou todas as missões do dia',
      emoji: '✨',
      xpReward: 30,
      category: 'daily',
      requirement: JSON.stringify({ type: 'all_checks', value: 1 }),
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { code: achievement.code },
      update: achievement,
      create: achievement,
    });
  }

  console.log('✅ Conquistas criadas/atualizadas!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
