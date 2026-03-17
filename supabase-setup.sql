-- ============================================
-- QUEBRANDO CICLO - SETUP DO BANCO SUPABASE
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- TABELA USER
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "isAdmin" BOOLEAN DEFAULT false,
  "lastActivity" TIMESTAMP DEFAULT now(),
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

-- TABELA USER PROFILE
CREATE TABLE IF NOT EXISTS "UserProfile" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "weight" DOUBLE PRECISION DEFAULT 0,
  "height" DOUBLE PRECISION DEFAULT 0,
  "goalWeight" DOUBLE PRECISION DEFAULT 0,
  "objective" TEXT DEFAULT 'lose',
  "activityLevel" TEXT DEFAULT 'sedentary',
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

-- TABELA USER PROGRESS
CREATE TABLE IF NOT EXISTS "UserProgress" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "xp" INTEGER DEFAULT 0,
  "level" INTEGER DEFAULT 1,
  "currentPhase" INTEGER DEFAULT 1,
  "streak" INTEGER DEFAULT 0,
  "totalDays" INTEGER DEFAULT 0,
  "lastCheckIn" TIMESTAMP,
  "phase1Progress" INTEGER DEFAULT 0,
  "phase2Progress" INTEGER DEFAULT 0,
  "phase3Progress" INTEGER DEFAULT 0,
  "phase4Progress" INTEGER DEFAULT 0,
  "phase5Progress" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

-- TABELA DAILY CHECK
CREATE TABLE IF NOT EXISTS "DailyCheck" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "date" TIMESTAMP NOT NULL,
  "drankWater" BOOLEAN DEFAULT false,
  "followedMeal" BOOLEAN DEFAULT false,
  "readContent" BOOLEAN DEFAULT false,
  "exercised" BOOLEAN DEFAULT false,
  "mindfulness" BOOLEAN DEFAULT false,
  "xpEarned" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT now(),
  UNIQUE("userId", "date")
);

-- TABELA ACHIEVEMENT
CREATE TABLE IF NOT EXISTS "Achievement" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "code" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "emoji" TEXT NOT NULL,
  "xpReward" INTEGER NOT NULL,
  "category" TEXT NOT NULL,
  "requirement" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT now()
);

-- TABELA USER ACHIEVEMENT
CREATE TABLE IF NOT EXISTS "UserAchievement" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "achievementId" TEXT NOT NULL REFERENCES "Achievement"("id"),
  "unlockedAt" TIMESTAMP DEFAULT now(),
  UNIQUE("userId", "achievementId")
);

-- TABELA WATER INTAKE
CREATE TABLE IF NOT EXISTS "WaterIntake" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "date" TIMESTAMP NOT NULL,
  "glasses" INTEGER DEFAULT 0,
  "goal" INTEGER DEFAULT 8,
  "createdAt" TIMESTAMP DEFAULT now(),
  UNIQUE("userId", "date")
);

-- TABELA WEIGHT HISTORY
CREATE TABLE IF NOT EXISTS "WeightHistory" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "date" TIMESTAMP NOT NULL,
  "weight" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP DEFAULT now(),
  UNIQUE("userId", "date")
);

-- ============================================
-- INSERIR CONQUISTAS PADRÃO
-- ============================================
INSERT INTO "Achievement" ("code", "name", "description", "emoji", "xpReward", "category", "requirement") VALUES
('first_login', 'Primeiro Passo', 'Fez login pela primeira vez', '🎯', 10, 'engagement', 'login_count_1'),
('water_master', 'Mestre da Água', 'Bebeu 8 copos de água por 7 dias', '💧', 50, 'health', 'water_goal_7_days'),
('streak_7', 'Semana Perfeita', 'Manteve sequência de 7 dias', '🔥', 100, 'streak', 'streak_7'),
('streak_30', 'Mês Incrível', 'Manteve sequência de 30 dias', '🏆', 500, 'streak', 'streak_30'),
('level_5', 'Veterano', 'Alcançou o nível 5', '⭐', 200, 'progress', 'level_5'),
('level_10', 'Lenda', 'Alcançou o nível máximo', '👑', 1000, 'progress', 'level_10'),
('phase1_complete', 'Mentalidade Forte', 'Completou a Fase 1', '🧠', 150, 'phase', 'phase1_complete'),
('phase2_complete', 'Hidratação Perfeita', 'Completou a Fase 2', '💧', 150, 'phase', 'phase2_complete'),
('phase3_complete', 'Alimentação Consciente', 'Completou a Fase 3', '🥗', 200, 'phase', 'phase3_complete'),
('phase4_complete', 'Corpo em Movimento', 'Completou a Fase 4', '🏃', 200, 'phase', 'phase4_complete'),
('phase5_complete', 'Mente Equilibrada', 'Completou a Fase 5', '🧘', 250, 'phase', 'phase5_complete'),
('all_phases', 'Transformação Completa', 'Completou todas as fases', '🌟', 1000, 'milestone', 'all_phases_complete')
ON CONFLICT ("code") DO NOTHING;

-- ============================================
-- CRIAR ÍNDICES PARA MELHOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "DailyCheck_userId_date_idx" ON "DailyCheck"("userId", "date");
CREATE INDEX IF NOT EXISTS "WaterIntake_userId_date_idx" ON "WaterIntake"("userId", "date");
CREATE INDEX IF NOT EXISTS "WeightHistory_userId_date_idx" ON "WeightHistory"("userId", "date");

-- ============================================
-- SUCESSO!
-- ============================================
SELECT 'Tabelas criadas com sucesso!' as message;
