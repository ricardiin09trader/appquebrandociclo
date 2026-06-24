// Dados das 30 Receitas Saudáveis extraídas do eBook
// Nutricionista: Natalia Cavalcante | CRN 17639
// Todas as receitas entre 250-400 kcal

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: RecipeCategory;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  prepTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tips?: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  tags?: string[];
  emoji: string;
}

export type RecipeCategory = 
  | 'cafe_salgado'
  | 'cafe_doce'
  | 'principal'
  | 'lanche_doce'
  | 'lanche_salgado';

export const categoryLabels: Record<RecipeCategory, string> = {
  cafe_salgado: '🍳 Café Salgado',
  cafe_doce: '🥞 Café Doce',
  principal: '🍽️ Principal',
  lanche_doce: '🍰 Lanche Doce',
  lanche_salgado: '🥪 Lanche Salgado',
};

export const recipes: Recipe[] = [
  // ===== CAFÉ DA MANHÃ SALGADAS =====
  {
    id: 'receita-1',
    name: '🐟 Torrada de Salmão com Cream Cheese',
    description: 'Café da manhã elegante e nutritivo, rico em ômega-3 para começar o dia bem.',
    category: 'cafe_salgado',
    calories: 280,
    protein: 18,
    carbs: 24,
    fat: 12,
    prepTime: 5,
    servings: 1,
    emoji: '🐟',
    ingredients: [
      '1 fatia de pão integral (50g)',
      '1 colher de sopa de cream cheese light (15g)',
      '30g de salmão defumado',
      'Alcaparras a gosto',
      'Endro (dill) fresco para decorar'
    ],
    instructions: [
      'Torre levemente a fatia de pão integral na torradeira',
      'Espalhe o cream cheese uniformemente sobre o pão',
      'Coloque as fatias de salmão defumado sobre o cream cheese',
      'Adicione alcaparras a gosto por cima',
      'Decore com folhas de endro fresco e sirva imediatamente'
    ],
    tips: 'O salmão defumado já é salgado, então não adicione sal extra. Sirva imediatamente para manter a textura crocante do pão.',
    difficulty: 'facil',
    tags: ['proteico', 'low carb', 'café da manhã', 'ômega-3'],
  },
  {
    id: 'receita-2',
    name: '🍳 Omelete Dourada de Frango',
    description: 'Omelete proteica e dourada, perfeita para começar o dia com energia.',
    category: 'cafe_salgado',
    calories: 320,
    protein: 28,
    carbs: 8,
    fat: 18,
    prepTime: 10,
    servings: 1,
    emoji: '🍳',
    ingredients: [
      '2 ovos grandes',
      '50g de peito de frango cozido e desfiado',
      '1/4 de cenoura média ralada (30g)',
      'Sal e pimenta-do-reino a gosto',
      'Ervas frescas picadas (salsa, cebolinha)',
      '1 fio de azeite para untar'
    ],
    instructions: [
      'Em uma tigela, bata os ovos com um garfo até ficar homogêneo',
      'Adicione o frango desfiado, a cenoura ralada e misture bem',
      'Tempere com sal, pimenta e ervas frescas',
      'Aqueça uma frigideira antiaderente em fogo médio com um fio de azeite',
      'Despeje a mistura e cozinhe por 2-3 minutos até as bordas firmarem',
      'Dobre ao meio e cozinhe mais 1 minuto. Sirva quente'
    ],
    tips: 'Use frango temperado de sobra para mais sabor. A cenoura adiciona crocância e vitaminas.',
    difficulty: 'facil',
    tags: ['proteico', 'café da manhã', 'low carb'],
  },
  {
    id: 'receita-3',
    name: '🍅 Torrada de Ricota com Tomate Fresco',
    description: 'Café da manhã leve e refrescante, rico em proteínas e vitaminas.',
    category: 'cafe_salgado',
    calories: 260,
    protein: 12,
    carbs: 28,
    fat: 10,
    prepTime: 5,
    servings: 1,
    emoji: '🍅',
    ingredients: [
      '1 fatia de pão integral (50g)',
      '2 colheres de sopa de ricota amassada (40g)',
      '1 tomate médio fatiado',
      'Folhas de manjericão fresco',
      'Sal e pimenta a gosto',
      'Fio de azeite (opcional)'
    ],
    instructions: [
      'Torre o pão integral até ficar crocante',
      'Espalhe a ricota amassada sobre a fatia de pão',
      'Adicione as fatias de tomate por cima da ricota',
      'Tempere levemente com sal e pimenta',
      'Decore com folhas de manjericão fresco',
      'Regue com um fio de azeite se desejar'
    ],
    tips: 'Escolha tomates maduros mas firmes. O manjericão fresco faz toda a diferença no sabor.',
    difficulty: 'facil',
    tags: ['leve', 'café da manhã', 'vitaminas'],
  },
  {
    id: 'receita-4',
    name: '🥬 Omelete Verde de Espinafre',
    description: 'Rica em ferro e cálcio, uma combinação perfeita para o café da manhã.',
    category: 'cafe_salgado',
    calories: 340,
    protein: 24,
    carbs: 6,
    fat: 22,
    prepTime: 10,
    servings: 1,
    emoji: '🥬',
    ingredients: [
      '2 ovos grandes',
      '1 xícara de espinafre fresco picado (30g)',
      '30g de queijo mussarela ralado',
      'Sal e pimenta a gosto',
      '1 fio de azeite'
    ],
    instructions: [
      'Bata os ovos em uma tigela com sal e pimenta',
      'Aqueça uma frigideira antiaderente com um fio de azeite',
      'Adicione o espinafre e refogue rapidamente até murchar',
      'Despeje os ovos batidos sobre o espinafre',
      'Polvilhe a mussarela por cima',
      'Cozinhe em fogo baixo até firmar, dobre ao meio e sirva'
    ],
    tips: 'Não cozinhe demais o espinafre para preservar os nutrientes. O queijo derretido cria uma textura cremosa.',
    difficulty: 'facil',
    tags: ['proteico', 'ferro', 'café da manhã'],
  },
  {
    id: 'receita-5',
    name: '🥑 Torrada de Abacate com Ovo',
    description: 'Rica em gorduras saudáveis e proteínas, perfeita para saciar.',
    category: 'cafe_salgado',
    calories: 350,
    protein: 16,
    carbs: 26,
    fat: 20,
    prepTime: 10,
    servings: 1,
    emoji: '🥑',
    ingredients: [
      '1 fatia de pão integral (50g)',
      '1/2 abacate maduro (70g)',
      '1 ovo grande',
      'Sal e pimenta a gosto',
      'Pimenta vermelha em flocos (opcional)',
      'Suco de limão (opcional)'
    ],
    instructions: [
      'Torre o pão integral até ficar crocante',
      'Amasse o abacate com um garfo, tempere com sal, pimenta e limão',
      'Prepare o ovo mexido em uma frigideira antiaderente',
      'Espalhe o abacate amassado sobre a torrada',
      'Coloque o ovo mexido por cima',
      'Finalize com pimenta vermelha em flocos se desejar'
    ],
    tips: 'Escolha um abacate no ponto - nem muito duro, nem muito mole. O limão evita que o abacate escureça.',
    difficulty: 'facil',
    tags: ['gorduras saudáveis', 'café da manhã', 'saciante'],
  },
  // ===== CAFÉ DA MANHÃ DOCES =====
  {
    id: 'receita-6',
    name: '🍓 Mingau Cremoso de Aveia',
    description: 'Café da manhã doce e nutritivo, rico em fibras e antioxidantes.',
    category: 'cafe_doce',
    calories: 280,
    protein: 8,
    carbs: 48,
    fat: 6,
    prepTime: 5,
    servings: 1,
    emoji: '🍓',
    ingredients: [
      '1/2 xícara de aveia em flocos (40g)',
      '1 xícara de leite de amêndoas (240ml)',
      '5 morangos médios fatiados',
      '1 colher de chá de mel (opcional)',
      'Canela em pó a gosto'
    ],
    instructions: [
      'Em uma panela, adicione a aveia e o leite de amêndoas',
      'Cozinhe em fogo médio, mexendo sempre, por 3-4 minutos',
      'Quando atingir a consistência desejada, retire do fogo',
      'Transfira para uma tigela',
      'Adicione os morangos fatiados por cima',
      'Regue com mel e polvilhe canela a gosto'
    ],
    tips: 'Use aveia em flocos grossos para mais textura. O leite de amêndoas deixa o mingau mais leve.',
    difficulty: 'facil',
    tags: ['fibras', 'café da manhã', 'antioxidantes'],
  },
  {
    id: 'receita-7',
    name: '🍌 Smoothie Energético de Banana',
    description: 'Vitamina energética e cremosa, perfeita para manhãs corridas.',
    category: 'cafe_doce',
    calories: 300,
    protein: 10,
    carbs: 42,
    fat: 12,
    prepTime: 5,
    servings: 1,
    emoji: '🍌',
    ingredients: [
      '1 banana média madura congelada',
      '200ml de leite de amêndoas',
      '10g de amêndoas laminadas',
      '1/2 colher de chá de canela em pó',
      '3 pedras de gelo'
    ],
    instructions: [
      'Adicione a banana congelada no liquidificador',
      'Despeje o leite de amêndoas',
      'Adicione a canela e as pedras de gelo',
      'Bata por 1-2 minutos até ficar cremoso e homogêneo',
      'Despeje em um copo alto',
      'Decore com amêndoas laminadas por cima'
    ],
    tips: 'Congele bananas maduras picadas para ter smoothies cremosos sempre prontos. Fica com textura de milkshake!',
    difficulty: 'facil',
    tags: ['energético', 'café da manhã', 'rápido'],
  },
  {
    id: 'receita-8',
    name: '🥞 Panquecas de Chocolate Fit',
    description: 'Panquecas saudáveis sem farinha, com sabor de chocolate.',
    category: 'cafe_doce',
    calories: 320,
    protein: 14,
    carbs: 38,
    fat: 12,
    prepTime: 15,
    servings: 1,
    emoji: '🥞',
    ingredients: [
      '1 banana média bem madura',
      '2 ovos grandes',
      '1 colher de sopa de cacau em pó 100%',
      '1 colher de chá de essência de baunilha',
      'Mel ou frutas para servir'
    ],
    instructions: [
      'Em uma tigela, amasse bem a banana com um garfo até virar purê',
      'Adicione os ovos e bata bem até incorporar',
      'Acrescente o cacau em pó e a baunilha, misture',
      'Aqueça uma frigideira antiaderente em fogo baixo',
      'Despeje pequenas porções da massa formando panquecas',
      'Cozinhe 2 minutos de cada lado. Sirva com mel e frutas'
    ],
    tips: 'Use banana bem madura para mais doçura natural. O segredo é fogo baixo e frigideira antiaderente!',
    difficulty: 'medio',
    tags: ['sem glúten', 'café da manhã', 'chocolate'],
  },
  {
    id: 'receita-9',
    name: '🥭 Iogurte Tropical de Manga',
    description: 'Café da manhã tropical e refrescante, perfeito para dias quentes.',
    category: 'cafe_doce',
    calories: 270,
    protein: 8,
    carbs: 36,
    fat: 10,
    prepTime: 5,
    servings: 1,
    emoji: '🥭',
    ingredients: [
      '150g de iogurte natural ou de coco',
      '1/2 manga média picada (100g)',
      '2 colheres de sopa de coco ralado sem açúcar',
      '1 colher de chá de mel (opcional)'
    ],
    instructions: [
      'Em uma tigela ou pote de vidro, coloque o iogurte',
      'Adicione os cubos de manga por cima',
      'Polvilhe o coco ralado',
      'Regue com mel se desejar mais doçura',
      'Misture antes de consumir ou coma em camadas'
    ],
    tips: 'Use manga Palmer ou Tommy, que são mais doces. Pode substituir por papaia ou abacaxi.',
    difficulty: 'facil',
    tags: ['tropical', 'café da manhã', 'refrescante'],
  },
  {
    id: 'receita-10',
    name: '🍎 Waffle de Maçã com Canela',
    description: 'Waffle saudável sem farinha de trigo, aromático e nutritivo.',
    category: 'cafe_doce',
    calories: 290,
    protein: 8,
    carbs: 40,
    fat: 10,
    prepTime: 15,
    servings: 1,
    emoji: '🍎',
    ingredients: [
      '1 maçã média ralada com casca (150g)',
      '1 ovo grande',
      '2 colheres de sopa de farinha de aveia (20g)',
      '1/2 colher de chá de canela em pó',
      '1 pitada de noz-moscada (opcional)'
    ],
    instructions: [
      'Rale a maçã com casca e esprema levemente para tirar excesso de líquido',
      'Em uma tigela, misture a maçã ralada com o ovo',
      'Adicione a farinha de aveia, canela e noz-moscada',
      'Misture bem até formar uma massa homogênea',
      'Aqueça a waffleira e despeje a massa',
      'Cozinhe até dourar. Sirva com mel ou iogurte'
    ],
    tips: 'Não descasque a maçã - as fibras estão na casca! Use maçãs Fuji ou Gala, mais doces.',
    difficulty: 'medio',
    tags: ['fibras', 'café da manhã', 'sem glúten'],
  },
  // ===== PRATOS PRINCIPAIS =====
  {
    id: 'receita-11',
    name: '🍗 Frango Grelhado com Quinoa',
    description: 'Refeição completa e balanceada, rica em proteínas e fibras.',
    category: 'principal',
    calories: 380,
    protein: 38,
    carbs: 32,
    fat: 12,
    prepTime: 25,
    servings: 1,
    emoji: '🍗',
    ingredients: [
      '100g de peito de frango',
      'Suco de 1/2 limão',
      '1 xícara de brócolis em floretes (100g)',
      '1/2 xícara de quinoa cozida (80g)',
      'Sal, pimenta e ervas a gosto',
      '1 fio de azeite'
    ],
    instructions: [
      'Tempere o frango com limão, sal, pimenta e ervas. Deixe marinar 15 minutos',
      'Aqueça uma grelha ou frigideira em fogo alto',
      'Grelhe o frango 5-6 minutos de cada lado até dourar',
      'Cozinhe o brócolis no vapor por 4-5 minutos (alde dente)',
      'Monte o prato: quinoa, brócolis e frango fatiado',
      'Regue com um fio de azeite e sirva'
    ],
    tips: 'Não cozinhe demais o brócolis para manter a cor vibrante e os nutrientes.',
    difficulty: 'medio',
    tags: ['proteico', 'almoço', 'jantar', 'fitness'],
  },
  {
    id: 'receita-12',
    name: '🐟 Salmão ao Limão com Aspargos',
    description: 'Rico em ômega-3 e vitaminas, uma refeição sofisticada e saudável.',
    category: 'principal',
    calories: 350,
    protein: 32,
    carbs: 12,
    fat: 18,
    prepTime: 20,
    servings: 1,
    emoji: '🐟',
    ingredients: [
      '100g de filé de salmão',
      'Suco de 1/2 limão siciliano',
      'Raspas de limão',
      '100g de aspargos verdes',
      'Sal e pimenta branca a gosto',
      'Azeite de oliva'
    ],
    instructions: [
      'Tempere o salmão com sal, pimenta e suco de limão',
      'Deixe marinar por 10 minutos',
      'Aqueça uma frigideira com um fio de azeite',
      'Grelhe o salmão 4 minutos de cada lado (ponto médio)',
      'Na mesma frigideira, grelhe os aspargos por 3 minutos',
      'Sirva com raspas de limão por cima'
    ],
    tips: 'O salmão fica mais suculento se não cozinhar demais. O ponto ideal é rosado por dentro.',
    difficulty: 'medio',
    tags: ['ômega-3', 'almoço', 'jantar', 'gourmet'],
  },
  {
    id: 'receita-13',
    name: '🥩 Carne Magra com Purê de Abóbora',
    description: 'Refeição nutritiva e reconfortante, perfeita para o jantar.',
    category: 'principal',
    calories: 360,
    protein: 35,
    carbs: 28,
    fat: 14,
    prepTime: 25,
    servings: 1,
    emoji: '🥩',
    ingredients: [
      '110g de carne magra (patinho ou alcatra)',
      '150g de abóbora cabotiá picada',
      '100g de brócolis',
      'Sal, pimenta e alho a gosto',
      'Noz-moscada para o purê',
      'Azeite para grelhar'
    ],
    instructions: [
      'Cozinhe a abóbora no vapor até ficar macia (15 minutos)',
      'Tempere a carne com sal, pimenta e alho',
      'Grelhe a carne em fogo alto: 3 minutos de cada lado para ao ponto',
      'Amasse a abóbora com um garfo, tempere com sal e noz-moscada',
      'Cozinhe o brócolis no vapor por 4 minutos',
      'Monte o prato com o purê, brócolis e a carne fatiada'
    ],
    tips: 'A abóbora cabotiá tem um sabor naturalmente adocicado que combina perfeitamente com a carne.',
    difficulty: 'medio',
    tags: ['proteico', 'almoço', 'jantar', 'conforto'],
  },
  {
    id: 'receita-14',
    name: '🍛 Frango ao Curry Aromático',
    description: 'Prato aromático e saboroso com especiarias antioxidantes.',
    category: 'principal',
    calories: 370,
    protein: 32,
    carbs: 35,
    fat: 12,
    prepTime: 25,
    servings: 1,
    emoji: '🍛',
    ingredients: [
      '100g de peito de frango em cubos',
      '1 colher de chá de curry em pó',
      '1/2 xícara de arroz integral cozido (80g)',
      '1/2 cenoura em cubos',
      '1/2 abobrinha em cubos',
      'Leite de coco light (50ml)',
      'Coentro fresco'
    ],
    instructions: [
      'Cozinhe o arroz integral conforme instruções da embalagem',
      'Tempere o frango com sal e curry',
      'Em uma frigideira, doure o frango em cubos',
      'Adicione os legumes e refogue por 3 minutos',
      'Acrescente o leite de coco e cozinhe por 5 minutos',
      'Sirva sobre o arroz integral, decorado com coentro'
    ],
    tips: 'O curry tem propriedades anti-inflamatórias. Use leite de coco light para reduzir calorias.',
    difficulty: 'medio',
    tags: ['especiarias', 'almoço', 'jantar', 'temperado'],
  },
  {
    id: 'receita-15',
    name: '🥘 Frango Recheado Gourmet',
    description: 'Frango suculento com recheio cremoso de espinafre e queijo.',
    category: 'principal',
    calories: 380,
    protein: 40,
    carbs: 18,
    fat: 16,
    prepTime: 30,
    servings: 1,
    emoji: '🥘',
    ingredients: [
      '1 peito de frango inteiro (120g)',
      '1/2 xícara de espinafre refogado',
      '30g de queijo cottage ou ricota',
      '100g de aspargos',
      'Sal, pimenta e alho',
      'Papel alumínio para assar'
    ],
    instructions: [
      'Pré-aqueça o forno a 200°C',
      'Faça um corte lateral no peito de frango formando um bolso',
      'Recheie com espinafre e queijo',
      'Feche com palitos e tempere por fora',
      'Asse por 25 minutos ou até dourar',
      'Sirva com aspargos grelhados'
    ],
    tips: 'Use palitos de madeira para fechar bem o frango e o recheio não vazar.',
    difficulty: 'dificil',
    tags: ['gourmet', 'almoço', 'jantar', 'recheado'],
  },
  {
    id: 'receita-16',
    name: '🥗 Omelete de Legumes Colorida',
    description: 'Refeição leve e nutritiva, perfeita para dias mais leves.',
    category: 'principal',
    calories: 290,
    protein: 20,
    carbs: 12,
    fat: 18,
    prepTime: 15,
    servings: 1,
    emoji: '🥗',
    ingredients: [
      '2 ovos grandes',
      '1/4 de pimentão vermelho picado',
      '1/2 tomate picado',
      '2 colheres de cebola picada',
      '2 xícaras de mix de folhas verdes',
      'Sal e ervas a gosto'
    ],
    instructions: [
      'Bata os ovos com sal e ervas',
      'Adicione os legumes picados à mistura',
      'Cozinhe em frigideira antiaderente em fogo médio',
      'Dobre ao meio quando as bordas firmarem',
      'Sirva acompanhado de salada verde temperada com limão'
    ],
    tips: 'Use legumes coloridos para mais nutrientes e apresentação bonita.',
    difficulty: 'facil',
    tags: ['leve', 'almoço', 'jantar', 'rápido'],
  },
  {
    id: 'receita-17',
    name: '🐠 Tilápia Grelhada com Abobrinha',
    description: 'Peixe leve e saboroso com acompanhamentos nutritivos.',
    category: 'principal',
    calories: 340,
    protein: 32,
    carbs: 30,
    fat: 10,
    prepTime: 20,
    servings: 1,
    emoji: '🐠',
    ingredients: [
      '100g de filé de tilápia',
      '1 abobrinha média fatiada',
      '80g de arroz integral cozido',
      'Suco de 1/2 limão',
      'Alho e ervas a gosto',
      'Azeite para grelhar'
    ],
    instructions: [
      'Tempere a tilápia com limão, alho e ervas',
      'Deixe marinar por 10 minutos',
      'Aqueça uma grelha ou frigideira',
      'Grelhe a tilápia 3 minutos de cada lado',
      'Na mesma frigideira, grelhe as fatias de abobrinha',
      'Sirva com arroz integral'
    ],
    tips: 'A tilápia cozinha rápido, cuidado para não ressecar. O ponto é quando a carne está branca e opaca.',
    difficulty: 'facil',
    tags: ['peixe', 'almoço', 'jantar', 'leve'],
  },
  {
    id: 'receita-18',
    name: '🍗 Coxa de Frango Assada com Purê',
    description: 'Versão saudável do tradicional purê de batata.',
    category: 'principal',
    calories: 350,
    protein: 30,
    carbs: 18,
    fat: 16,
    prepTime: 35,
    servings: 1,
    emoji: '🍗',
    ingredients: [
      '1 coxa de frango (100g)',
      '150g de couve-flor',
      '100g de brócolis',
      'Sal, pimenta e ervas',
      '1 colher de sopa de iogurte natural',
      'Azeite'
    ],
    instructions: [
      'Tempere a coxa de frango e asse a 200°C por 30 minutos',
      'Cozinhe a couve-flor no vapor até ficar macia',
      'Bata a couve-flor no processador com iogurte, sal e pimenta',
      'Cozinhe o brócolis no vapor por 4 minutos',
      'Monte o prato com o purê, brócolis e frango',
      'Regue com o molho que se formou na assadeira'
    ],
    tips: 'O purê de couve-flor é surpreendentemente cremoso e tem muito menos carboidratos que o de batata.',
    difficulty: 'medio',
    tags: ['conforto', 'almoço', 'jantar', 'low carb'],
  },
  {
    id: 'receita-19',
    name: '🍔 Hambúrguer Caseiro Fitness',
    description: 'Refeição proteica com acompanhamentos nutritivos e coloridos.',
    category: 'principal',
    calories: 370,
    protein: 35,
    carbs: 24,
    fat: 14,
    prepTime: 25,
    servings: 1,
    emoji: '🍔',
    ingredients: [
      '100g de carne moída magra (patinho)',
      'Sal, pimenta e cebola ralada',
      '150g de abóbora em cubos',
      '2 xícaras de mix de folhas verdes',
      'Tomate cereja',
      'Azeite'
    ],
    instructions: [
      'Misture a carne com sal, pimenta e cebola ralada',
      'Forme um hambúrguer e grelhe 4 minutos de cada lado',
      'Asse a abóbora temperada com azeite a 200°C por 20 minutos',
      'Monte a salada com folhas e tomates cereja',
      'Sirva o hambúrguer com a abóbora assada e salada'
    ],
    tips: 'Não aperte o hambúrguer na grelha para manter a suculência.',
    difficulty: 'medio',
    tags: ['proteico', 'almoço', 'jantar', 'fitness'],
  },
  {
    id: 'receita-20',
    name: '🥚 Ovo Poaché Gourmet',
    description: 'Refeição leve e elegante, perfeita para um jantar especial.',
    category: 'principal',
    calories: 280,
    protein: 18,
    carbs: 12,
    fat: 18,
    prepTime: 15,
    servings: 1,
    emoji: '🥚',
    ingredients: [
      '1 ovo grande',
      '150g de espinafre fresco',
      '1 tomate médio',
      '1 dente de alho',
      'Sal, pimenta e noz-moscada',
      'Vinagre para a água'
    ],
    instructions: [
      'Ferva água com um fio de vinagre em fogo baixo',
      'Faça um redemoinho e coloque o ovo delicadamente',
      'Cozinhe por 3 minutos para gema mole',
      'Refogue o espinafre com alho rapidamente',
      'Grelhe o tomate cortado ao meio',
      'Monte o prato: espinafre, tomate e ovo poaché por cima'
    ],
    tips: 'Use ovos bem frescos para poachê perfeito. O vinagre ajuda a clara a ficar firme.',
    difficulty: 'medio',
    tags: ['leve', 'gourmet', 'almoço', 'jantar'],
  },
  // ===== LANCHES DA TARDE DOCES =====
  {
    id: 'receita-21',
    name: '🫐 Iogurte com Frutas Vermelhas',
    description: 'Lanche doce e nutritivo, rico em probióticos e vitaminas.',
    category: 'lanche_doce',
    calories: 250,
    protein: 12,
    carbs: 36,
    fat: 6,
    prepTime: 5,
    servings: 1,
    emoji: '🫐',
    ingredients: [
      '150g de iogurte grego natural',
      '1/2 xícara de frutas vermelhas (morango, mirtilo, framboesa)',
      '1 colher de chá de mel',
      '1 colher de sopa de granola sem açúcar (opcional)'
    ],
    instructions: [
      'Coloque o iogurte em uma tigela ou pote',
      'Adicione as frutas lavadas e cortadas',
      'Regue com o mel',
      'Se desejar, polvilhe granola por cima',
      'Consuma imediatamente'
    ],
    tips: 'Use iogurte grego para mais proteína. Frutas congeladas também funcionam bem.',
    difficulty: 'facil',
    tags: ['probióticos', 'lanche', 'rápido'],
  },
  {
    id: 'receita-22',
    name: '🥜 Torrada de Pasta de Amendoim',
    description: 'Lanche energético e saciante, perfeito para antes ou depois do treino.',
    category: 'lanche_doce',
    calories: 320,
    protein: 10,
    carbs: 42,
    fat: 14,
    prepTime: 5,
    servings: 1,
    emoji: '🥜',
    ingredients: [
      '1 fatia de pão integral (50g)',
      '1 banana média',
      '1 colher de sopa de pasta de amendoim (20g)',
      'Canela em pó a gosto'
    ],
    instructions: [
      'Torre o pão integral',
      'Espalhe a pasta de amendoim sobre o pão',
      'Corte a banana em rodelas e disponha por cima',
      'Polvilhe canela a gosto',
      'Sirva imediatamente'
    ],
    tips: 'Use pasta de amendoim 100% amendoim, sem açúcar ou óleo adicionado.',
    difficulty: 'facil',
    tags: ['energético', 'lanche', 'pré-treino'],
  },
  {
    id: 'receita-23',
    name: '🧁 Muffin de Banana Fitness',
    description: 'Muffin saudável sem farinha de trigo, perfeito para congelar.',
    category: 'lanche_doce',
    calories: 270,
    protein: 8,
    carbs: 40,
    fat: 8,
    prepTime: 25,
    servings: 1,
    emoji: '🧁',
    ingredients: [
      '1 banana média muito madura',
      '1 ovo grande',
      '1/2 xícara de aveia em flocos (40g)',
      '1/2 colher de chá de fermento em pó',
      '1 colher de chá de canela em pó'
    ],
    instructions: [
      'Pré-aqueça o forno a 180°C',
      'Em uma tigela, amasse bem a banana',
      'Adicione o ovo e misture bem',
      'Acrescente a aveia, fermento e canela',
      'Distribua em forminhas de muffin',
      'Asse por 20 minutos ou até dourar'
    ],
    tips: 'Rende 4 muffins pequenos. Congele e aqueça no micro-ondas quando quiser comer.',
    difficulty: 'medio',
    tags: ['sem glúten', 'lanche', 'congelável'],
  },
  {
    id: 'receita-24',
    name: '🍓 Iogurte Crocante com Granola',
    description: 'Lanche crocante e nutritivo com texturas variadas.',
    category: 'lanche_doce',
    calories: 280,
    protein: 14,
    carbs: 38,
    fat: 8,
    prepTime: 5,
    servings: 1,
    emoji: '🍓',
    ingredients: [
      '150g de iogurte grego natural',
      '2 colheres de sopa de granola sem açúcar (20g)',
      '1/2 xícara de morangos frescos fatiados',
      '1 colher de chá de mel (opcional)'
    ],
    instructions: [
      'Em um pote ou tigela, adicione o iogurte',
      'Coloque a granola por cima',
      'Adicione os morangos fatiados',
      'Regue com mel se desejar',
      'Misture antes de consumir'
    ],
    tips: 'Adicione a granola apenas na hora de comer para manter a crocância.',
    difficulty: 'facil',
    tags: ['crocante', 'lanche', 'proteína'],
  },
  {
    id: 'receita-25',
    name: '🥤 Vitamina de Banana e Morango',
    description: 'Bebida refrescante e nutritiva, perfeita para o verão.',
    category: 'lanche_doce',
    calories: 260,
    protein: 10,
    carbs: 44,
    fat: 4,
    prepTime: 5,
    servings: 1,
    emoji: '🥤',
    ingredients: [
      '1 banana média',
      '1/2 xícara de morangos frescos (60g)',
      '1/2 xícara de iogurte grego natural (60g)',
      '1/2 xícara de leite de amêndoas (120ml)',
      '3 pedras de gelo'
    ],
    instructions: [
      'Adicione todos os ingredientes no liquidificador',
      'Bata por 1-2 minutos até ficar homogêneo',
      'Prove e ajuste a doçura se necessário',
      'Sirva em um copo alto gelado'
    ],
    tips: 'Congele as frutas picadas para uma vitamina mais cremosa e gelada.',
    difficulty: 'facil',
    tags: ['refrescante', 'vitamina', 'lanche'],
  },
  // ===== LANCHES DA TARDE SALGADOS =====
  {
    id: 'receita-26',
    name: '🥬 Torrada de Ricota e Espinafre',
    description: 'Lanche salgado nutritivo, leve e rico em ferro.',
    category: 'lanche_salgado',
    calories: 260,
    protein: 12,
    carbs: 28,
    fat: 10,
    prepTime: 5,
    servings: 1,
    emoji: '🥬',
    ingredients: [
      '1 fatia de pão integral (50g)',
      '2 colheres de sopa de ricota (40g)',
      '1/2 xícara de espinafre refogado (50g)',
      'Sal e pimenta a gosto',
      'Fio de azeite'
    ],
    instructions: [
      'Torre o pão integral',
      'Espalhe a ricota sobre o pão',
      'Adicione o espinafre refogado por cima',
      'Tempere com sal e pimenta',
      'Regue com um fio de azeite'
    ],
    tips: 'Você pode usar espinafre cru também, fica mais crocante.',
    difficulty: 'facil',
    tags: ['leve', 'lanche', 'ferro'],
  },
  {
    id: 'receita-27',
    name: '🥓 Rolinhos de Queijo e Presunto',
    description: 'Lanche prático e proteico, perfeito para levar na bolsa.',
    category: 'lanche_salgado',
    calories: 280,
    protein: 18,
    carbs: 8,
    fat: 18,
    prepTime: 10,
    servings: 1,
    emoji: '🥓',
    ingredients: [
      '2 fatias de queijo minas ou mussarela (40g)',
      '2 fatias de presunto de peru (40g)',
      'Tiras de pepino e cenoura',
      'Folhas de alface',
      'Mostarda Dijon (opcional)'
    ],
    instructions: [
      'Sobre uma superfície, coloque a fatia de queijo',
      'Adicione o presunto por cima',
      'Coloque as tiras de legumes e a alface',
      'Enrole como um charutinho',
      'Prenda com palitos se necessário',
      'Sirva com mostarda se desejar'
    ],
    tips: 'Use presunto de peru para menos gordura. Ótimo para levar como lanche.',
    difficulty: 'facil',
    tags: ['prático', 'proteico', 'lanche', 'portátil'],
  },
  {
    id: 'receita-28',
    name: '🌯 Wrap de Frango Integral',
    description: 'Lanche prático e leve, fácil de comer em qualquer lugar.',
    category: 'lanche_salgado',
    calories: 300,
    protein: 26,
    carbs: 24,
    fat: 10,
    prepTime: 10,
    servings: 1,
    emoji: '🌯',
    ingredients: [
      '1 tortilha integral pequena (50g)',
      '80g de peito de frango desfiado',
      'Folhas de alface americana',
      'Tomate fatiado',
      'Iogurte natural para molho',
      'Sal e ervas'
    ],
    instructions: [
      'Tempere o frango desfiado com sal e ervas',
      'Aqueça a tortilha rapidamente em uma frigideira',
      'Espalhe o iogurte sobre a tortilha',
      'Adicione a alface, tomate e frango',
      'Enrole bem como um wrap',
      'Corte ao meio para servir'
    ],
    tips: 'Você pode usar frango de sobra de outras refeições.',
    difficulty: 'facil',
    tags: ['prático', 'lanche', 'portátil'],
  },
  {
    id: 'receita-29',
    name: '🐟 Bolinhos de Atum Crocantes',
    description: 'Lanche proteico fácil de preparar e muito saboroso.',
    category: 'lanche_salgado',
    calories: 320,
    protein: 28,
    carbs: 20,
    fat: 12,
    prepTime: 25,
    servings: 1,
    emoji: '🐟',
    ingredients: [
      '1 lata de atum em água escorrido (80g)',
      '1/2 xícara de aveia em flocos (30g)',
      '1 ovo grande',
      '1 colher de sopa de mostarda',
      'Salsinha picada a gosto',
      'Sal e pimenta'
    ],
    instructions: [
      'Pré-aqueça o forno a 180°C',
      'Em uma tigela, misture o atum escorrido com a aveia',
      'Adicione o ovo, mostarda, salsinha, sal e pimenta',
      'Misture bem até formar uma massa',
      'Forme bolinhos e coloque em uma assadeira forrada',
      'Asse por 15-20 minutos até dourar'
    ],
    tips: 'Rende cerca de 6 bolinhos. Ótimo para congelar e ter pronto na hora.',
    difficulty: 'medio',
    tags: ['proteico', 'atum', 'lanche', 'congelável'],
  },
  {
    id: 'receita-30',
    name: '🧀 Tostex Quente de Queijo',
    description: 'Lanche quente e reconfortante, perfeito para tardes frias.',
    category: 'lanche_salgado',
    calories: 290,
    protein: 14,
    carbs: 30,
    fat: 12,
    prepTime: 10,
    servings: 1,
    emoji: '🧀',
    ingredients: [
      '2 fatias de pão integral (100g)',
      '30g de queijo mussarela ou minas',
      '1 tomate médio fatiado',
      'Orégano a gosto',
      'Azeite de oliva'
    ],
    instructions: [
      'Espalhe o queijo sobre uma fatia de pão',
      'Adicione as fatias de tomate',
      'Polvilhe orégano a gosto',
      'Cubra com a outra fatia de pão',
      'Toste na sanduicheira ou frigideira até dourar',
      'Sirva quente com um fio de azeite por cima'
    ],
    tips: 'Use queijo minas para menos gordura. O orégano realça o sabor do tomate.',
    difficulty: 'facil',
    tags: ['quente', 'reconfortante', 'lanche'],
  }
];

// Função para buscar receitas por categoria
export const getRecipesByCategory = (category: RecipeCategory): Recipe[] => {
  return recipes.filter((r) => r.category === category);
};

// Função para buscar receita por ID
export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find((r) => r.id === id);
};

export default recipes;
