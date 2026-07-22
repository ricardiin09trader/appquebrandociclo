export interface WorkoutExercise {
  name: string;
  sets: string;
  rest: string;
}

export interface WorkoutDay {
  key: string;
  label: string;
  emoji: string;
  color: string;
  muscle: string;
  exercises: WorkoutExercise[];
}

export const workoutPlan: WorkoutDay[] = [
  {
    key: 'segunda', label: 'Segunda', emoji: '🦵',
    color: 'from-red-500 to-red-600', muscle: 'Quadríceps',
    exercises: [
      { name: 'Cadeira Extensora', sets: '4×12-15', rest: '60s' },
      { name: 'Afundo', sets: '4×12-15', rest: '60s' },
      { name: 'Búlgaro', sets: '4×12-15', rest: '60s' },
      { name: 'Mesa Flexora', sets: '4×12-15', rest: '60s' },
      { name: 'Panturrilha no Leg', sets: '5×15-20', rest: '45s' },
      { name: 'Abdominal Máquina', sets: '3×10-12', rest: '45s' },
    ],
  },
  {
    key: 'terca', label: 'Terça', emoji: '💪',
    color: 'from-purple-500 to-purple-600', muscle: 'Costas e Bíceps',
    exercises: [
      { name: 'Puxada Alta', sets: '4×10-12', rest: '60s' },
      { name: 'Remada Máquina Neutra', sets: '4×10-12', rest: '60s' },
      { name: 'Remada Máquina Aberta', sets: '4×10-12', rest: '60s' },
      { name: 'Rosca Alternada com Halteres', sets: '3×10-12', rest: '45s' },
      { name: 'Bíceps Scott Máquina', sets: '3×10-12', rest: '45s' },
    ],
  },
  {
    key: 'quarta', label: 'Quarta', emoji: '🔥',
    color: 'from-orange-500 to-orange-600', muscle: 'Posterior',
    exercises: [
      { name: 'Cadeira Flexora', sets: '4×12-15', rest: '60s' },
      { name: 'Stiff', sets: '4×12-15', rest: '60s' },
      { name: 'Mesa Flexora', sets: '4×12-15', rest: '60s' },
      { name: 'Terra Sumô', sets: '4×8-10', rest: '90s' },
      { name: 'Cadeira Abdutora', sets: '4×12-15', rest: '45s' },
      { name: 'Panturrilha no Leg', sets: '4×15-20', rest: '45s' },
    ],
  },
  {
    key: 'quinta', label: 'Quinta', emoji: '🎯',
    color: 'from-blue-500 to-blue-600', muscle: 'Ombro e Tríceps',
    exercises: [
      { name: 'Supino Inclinado com Halteres', sets: '3×10-12', rest: '60s' },
      { name: 'Desenvolvimento com Halteres', sets: '4×10-12', rest: '60s' },
      { name: 'Elevação Lateral com Halteres', sets: '4×10-12', rest: '45s' },
      { name: 'Remada Alta', sets: '4×10-12', rest: '60s' },
      { name: 'Tríceps Francês com Halter', sets: '3×10-12', rest: '45s' },
      { name: 'Tríceps Corda', sets: '3×10-12', rest: '45s' },
    ],
  },
  {
    key: 'sexta', label: 'Sexta', emoji: '🍑',
    color: 'from-pink-500 to-pink-600', muscle: 'Glúteo',
    exercises: [
      { name: 'Elevação Pélvica Máquina', sets: '4×10-12', rest: '60s' },
      { name: 'Coice na Polia', sets: '4×12-15', rest: '60s' },
      { name: 'Cadeira Abdutora', sets: '4×12-15', rest: '45s' },
      { name: 'Búlgaro', sets: '4×12-15', rest: '60s' },
      { name: 'Terra Sumô', sets: '4×8-10', rest: '90s' },
      { name: 'Abdominal Máquina', sets: '3×10-12', rest: '45s' },
    ],
  },
];
