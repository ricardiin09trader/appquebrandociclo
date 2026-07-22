export interface FoodItem { name: string; amount: string; }

export interface MealOption { label: string; items: FoodItem[]; }

export interface Substitution { original: string; alternatives: string[]; }

export interface Meal {
  key: string;
  emoji: string;
  label: string;
  calories: number;
  options: MealOption[];
  substitutions: Substitution[];
}

export const mealPlan: Meal[] = [
  {
    key: 'cafe_manha', emoji: '🌅', label: 'Café da Manhã', calories: 350,
    options: [
      { label: 'Opção 1', items: [
        { name: 'Pão de forma integral', amount: '2 fatias (50g)' },
        { name: 'Ovo de galinha', amount: '2 unidades (100g)' },
        { name: 'Café sem açúcar', amount: '1 xícara' },
      ]},
      { label: 'Opção 2', items: [
        { name: 'Iogurte zero', amount: '200g' },
        { name: 'Morango', amount: '100g' },
        { name: 'Aveia em flocos finos', amount: '1 colher de chá cheia (12g)' },
        { name: 'Whey Protein', amount: '1 scoop' },
      ]},
    ],
    substitutions: [
      { original: 'Pão de forma integral', alternatives: ['Pão francês (1 unidade - 50g)', 'Goma de tapioca (60g)', 'Cuscuz de milho cozido (100g)'] },
      { original: 'Ovo de galinha', alternatives: ['Queijo minas frescal (50g)', 'Peito de frango desfiado (80g)'] },
      { original: 'Morango', alternatives: ['Maçã (100g)', 'Melão (100g)', 'Uva (100g)', 'Banana (1 unidade)'] },
    ],
  },
  {
    key: 'almoco', emoji: '☀️', label: 'Almoço', calories: 550,
    options: [
      { label: 'Opção Única', items: [
        { name: 'Arroz branco cozido', amount: '80g' },
        { name: 'Feijão cozido', amount: '80g' },
        { name: 'Peito de frango grelhado', amount: '120g' },
        { name: 'Salada de legumes cozidos no vapor', amount: '100g' },
        { name: 'Salada crua', amount: 'À vontade' },
        { name: 'Melancia', amount: '250g' },
      ]},
    ],
    substitutions: [
      { original: 'Arroz branco cozido', alternatives: ['Batata inglesa (150g)', 'Arroz integral (80g)', 'Macarrão (80g)'] },
      { original: 'Feijão carioca cozido', alternatives: ['Feijão preto cozido (80g)', 'Grão de bico cozido (50g)'] },
      { original: 'Peito de frango', alternatives: ['Carne Patinho (120g)', 'Filé de peixe grelhado/assado (120g)'] },
      { original: 'Melancia', alternatives: ['Melão (250g)', 'Abacaxi (100g)'] },
    ],
  },
  {
    key: 'lanche_tarde', emoji: '🌻', label: 'Lanche da Tarde', calories: 200,
    options: [
      { label: 'Opção 1', items: [
        { name: 'Cuscuz de milho cozido com sal', amount: '80g' },
        { name: 'Ovo de galinha', amount: '1 unidade (50g)' },
        { name: 'Semente de chia', amount: '1 colher de chá cheia (6g)' },
      ]},
      { label: 'Opção 2', items: [
        { name: 'Banana', amount: '1 unidade' },
        { name: 'Aveia', amount: '30g' },
        { name: 'Canela em pó', amount: '1 colher de café cheia (4g)' },
      ]},
    ],
    substitutions: [
      { original: 'Cuscuz de milho cozido', alternatives: ['Pão de forma integral (2 fatias - 50g)', 'Pão francês (1 unidade - 50g)', 'Tapioca (1 unidade - 50g)'] },
    ],
  },
  {
    key: 'jantar', emoji: '🌙', label: 'Jantar', calories: 350,
    options: [
      { label: 'Opção Única', items: [
        { name: 'Arroz branco cozido', amount: '80g' },
        { name: 'Feijão carioca cozido', amount: '80g' },
        { name: 'Peito de frango grelhado', amount: '120g' },
        { name: 'Salada de legumes cozidos no vapor com sal', amount: '100g' },
        { name: 'Salada crua', amount: 'À vontade' },
        { name: 'Abacaxi com canela (opcional)', amount: '2 fatias médias (150g)' },
      ]},
    ],
    substitutions: [
      { original: 'Arroz branco cozido', alternatives: ['Batata inglesa (150g)', 'Macarrão (80g)', 'Arroz integral (80g)'] },
      { original: 'Peito de frango', alternatives: ['Carne Patinho (120g)', 'Filé de peixe grelhado/assado (120g)'] },
      { original: 'Abacaxi com canela', alternatives: ['Melancia (2 fatias pequenas - 200g)', 'Melão (3 fatias pequenas - 200g)'] },
    ],
  },
  {
    key: 'ceia', emoji: '😴', label: 'Ceia', calories: 100,
    options: [
      { label: 'Opção Única', items: [
        { name: 'Morango', amount: '100g' },
        { name: 'Leite em pó', amount: '20g' },
      ]},
    ],
    substitutions: [
      { original: 'Morango', alternatives: ['Uva (100g)', 'Kiwi (100g)'] },
    ],
  },
];

export const nutritionalGuidelines = [
  { icon: '⏰', title: 'Intervalo entre refeições', desc: 'Estabeleça cerca de 3 horas entre uma refeição e outra' },
  { icon: '⚖️', title: 'Pese os alimentos', desc: 'Use uma balança digital para pesagem correta' },
  { icon: '😴', title: 'Sono regular', desc: 'Tente ter um sono regular de 7-8 horas por dia' },
  { icon: '🚫', title: 'Proibido', desc: 'Açúcares, balas, doces, sucos de polpa e refrigerantes comuns' },
  { icon: '✅', title: 'Permitido', desc: 'Café, adoçante (Sucralose), Refrigerante Zero, Suco sem açúcar' },
  { icon: '🍳', title: 'Preparação', desc: 'Evite óleos. Use frigideira antiaderente ou azeite leve' },
  { icon: '🧂', title: 'Temperos naturais', desc: 'Alho, cebola, pimentão, orégano, chimichurri, páprica' },
  { icon: '⚠️', title: 'Sem temperos artificiais', desc: 'Não use Arisco, Sazon ou produtos com aditivos' },
  { icon: '📅', title: 'Duração', desc: 'A dieta tem duração de 30 dias. Consulte seu nutricionista após' },
];
