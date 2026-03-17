-- ============================================
-- QUEBRANDO CICLO - Schema PostgreSQL Supabase
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- Criar extensão uuid-ossp se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA: User (Usuários)
-- ============================================
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE,
    "lastActivity" TIMESTAMP DEFAULT NOW(),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TABELA: UserProfile (Perfil do Usuário)
-- ============================================
CREATE TABLE IF NOT EXISTS "UserProfile" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    weight DOUBLE PRECISION DEFAULT 0,
    height DOUBLE PRECISION DEFAULT 0,
    "goalWeight" DOUBLE PRECISION DEFAULT 0,
    objective TEXT DEFAULT 'lose',
    "activityLevel" TEXT DEFAULT 'sedentary',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TABELA: UserProgress (Progresso do Usuário)
-- ============================================
CREATE TABLE IF NOT EXISTS "UserProgress" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    "currentPhase" INTEGER DEFAULT 1,
    streak INTEGER DEFAULT 0,
    "totalDays" INTEGER DEFAULT 0,
    "lastCheckIn" TIMESTAMP,
    "phase1Progress" INTEGER DEFAULT 0,
    "phase2Progress" INTEGER DEFAULT 0,
    "phase3Progress" INTEGER DEFAULT 0,
    "phase4Progress" INTEGER DEFAULT 0,
    "phase5Progress" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TABELA: DailyCheck (Check-in Diário)
-- ============================================
CREATE TABLE IF NOT EXISTS "DailyCheck" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    "drankWater" BOOLEAN DEFAULT FALSE,
    "followedMeal" BOOLEAN DEFAULT FALSE,
    "readContent" BOOLEAN DEFAULT FALSE,
    exercised BOOLEAN DEFAULT FALSE,
    mindfulness BOOLEAN DEFAULT FALSE,
    "xpEarned" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    UNIQUE("userId", date)
);

-- ============================================
-- TABELA: Achievement (Conquistas)
-- ============================================
CREATE TABLE IF NOT EXISTS "Achievement" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    emoji TEXT,
    "xpReward" INTEGER,
    category TEXT,
    requirement TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TABELA: UserAchievement (Conquistas do Usuário)
-- ============================================
CREATE TABLE IF NOT EXISTS "UserAchievement" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "achievementId" TEXT NOT NULL REFERENCES "Achievement"(id),
    "unlockedAt" TIMESTAMP DEFAULT NOW(),
    UNIQUE("userId", "achievementId")
);

-- ============================================
-- TABELA: WaterIntake (Controle de Água)
-- ============================================
CREATE TABLE IF NOT EXISTS "WaterIntake" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    glasses INTEGER DEFAULT 0,
    goal INTEGER DEFAULT 8,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    UNIQUE("userId", date)
);

-- ============================================
-- TABELA: WeightHistory (Histórico de Peso)
-- ============================================
CREATE TABLE IF NOT EXISTS "WeightHistory" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    weight DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    UNIQUE("userId", date)
);

-- ============================================
-- INSERIR CONQUISTAS PADRÃO
-- ============================================
INSERT INTO "Achievement" (code, name, description, emoji, "xpReward", category, requirement) VALUES
('first_flame', 'Primeira Chama', 'Complete 1 dia de sequência', '🔥', 10, 'streak', '1 dia'),
('week_warrior', 'Semana Incansável', 'Complete 7 dias seguidos', '🔥🔥', 50, 'streak', '7 dias'),
('month_master', 'Mês de Dedicação', 'Complete 30 dias seguidos', '📅', 200, 'streak', '30 dias'),
('hydrated', 'Hidratado', 'Bata a meta de água 1 dia', '💧', 15, 'water', '1 dia'),
('water_fountain', 'Fonte de Vida', 'Bata a meta de água 7 dias', '💧💧', 50, 'water', '7 dias'),
('open_mind', 'Mente Aberta', 'Complete a Fase 1 - Mentalidade', '🧠', 50, 'phase', 'Fase 1'),
('hydration_master', 'Mestre da Hidratação', 'Complete a Fase 2 - Hidratação', '💧', 50, 'phase', 'Fase 2'),
('food_conscious', 'Consciência Alimentar', 'Complete a Fase 3 - Comer Emocional', '🍽️', 75, 'phase', 'Fase 3'),
('nutritionist', 'Nutricionista', 'Complete a Fase 4 - Plano Alimentar', '🥗', 100, 'phase', 'Fase 4'),
('cycle_broken', 'Ciclo Quebrado', 'Complete todas as fases', '🏆', 500, 'special', '100%'),
('halfway', 'Meio Caminho', 'Complete 50% das lições', '⭐', 100, 'progress', '50%'),
('healthy_chef', 'Chef Saudável', 'Favorite 5 receitas', '🥑', 30, 'favorites', '5 favoritos')
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- CRIAR ÍNDICES PARA PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS "idx_user_email" ON "User"(email);
CREATE INDEX IF NOT EXISTS "idx_dailycheck_userid_date" ON "DailyCheck"("userId", date);
CREATE INDEX IF NOT EXISTS "idx_waterintake_userid_date" ON "WaterIntake"("userId", date);
CREATE INDEX IF NOT EXISTS "idx_weighthistory_userid_date" ON "WeightHistory"("userId", date);

-- ============================================
-- CRIAR TRIGGER PARA UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_user_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_userprofile_updated_at BEFORE UPDATE ON "UserProfile" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_userprogress_updated_at BEFORE UPDATE ON "UserProgress" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PRONTO! Schema criado com sucesso!
-- ============================================
SELECT 'Schema criado com sucesso!' as mensagem;
