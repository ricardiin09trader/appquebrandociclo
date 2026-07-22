export interface Achievement {
  emoji: string;
  name: string;
  desc: string;
  requirement: string;
}

export const achievements: Achievement[] = [
  { emoji: '🔥', name: 'Primeira Chama', desc: 'Complete 1 lição', requirement: '1 lição' },
  { emoji: '🔥🔥', name: 'Semana Incansável', desc: 'Complete 5 lições', requirement: '5 lições' },
  { emoji: '💧', name: 'Hidratado', desc: 'Complete a Fase 2', requirement: 'Fase 2' },
  { emoji: '🧠', name: 'Mente Aberta', desc: 'Complete a Fase 1', requirement: 'Fase 1' },
  { emoji: '🍽️', name: 'Consciência Alimentar', desc: 'Complete a Fase 3', requirement: 'Fase 3' },
  { emoji: '🥗', name: 'Nutricionista', desc: 'Complete a Fase 4', requirement: 'Fase 4' },
  { emoji: '🥑', name: 'Chef Saudável', desc: 'Favorite 5 receitas', requirement: '5 favoritos' },
  { emoji: '🏆', name: 'Ciclo Quebrado', desc: 'Complete todas as fases', requirement: '100%' },
  { emoji: '⭐', name: 'Meio Caminho', desc: 'Complete 50% das lições', requirement: '50%' },
];
