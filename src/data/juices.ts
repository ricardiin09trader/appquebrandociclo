// Dados dos 10 Sucos Detox extraídos do eBook
// Nutricionista: Natalia Cavalcante | CRN 17639

export interface Juice {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  instructions: string[];
  prepTime: number;
}

export const juices: Juice[] = [
  {
    id: 'suco-1',
    name: 'Suco Verde Revigorante',
    description: 'Rico em antioxidantes, vitaminas e minerais. Perfeito para começar o dia com energia.',
    benefits: [
      'Espinafre rico em antioxidantes, vitaminas e minerais',
      'Maçã verde contribui com fibras e doçura natural',
      'Pepino hidratante e baixo em calorias',
      'Gengibre anti-inflamatório e estimula o metabolismo',
      'Limão fornece vitamina C e ajuda na digestão'
    ],
    ingredients: [
      '2 xícaras de espinafre',
      '1 maçã verde',
      '1/2 pepino',
      '2 cm de gengibre',
      'Suco de 1 limão',
      '1/2 a 1 xícara de água (ajuste a consistência)'
    ],
    instructions: [
      'Lave bem todos os ingredientes',
      'Corte a maçã e o pepino em pedaços',
      'Descasque o gengibre',
      'Bata tudo no liquidificador',
      'Coe se preferir',
      'Sirva gelado'
    ],
    prepTime: 5
  },
  {
    id: 'suco-2',
    name: 'Suco Refrescante de Melancia',
    description: 'Hidratante e refrescante, perfeito para dias quentes.',
    benefits: [
      'Melancia rica em água, vitaminas e antioxidantes',
      'Pepino hidratante e ajuda na eliminação de toxinas',
      'Hortelã proporciona frescor e ajuda na digestão'
    ],
    ingredients: [
      '2 xícaras de melancia sem sementes',
      '1/2 pepino',
      'Algumas folhas de hortelã'
    ],
    instructions: [
      'Corte a melancia em cubos',
      'Descasque e corte o pepino',
      'Bata tudo no liquidificador',
      'Sirva bem gelado com gelo'
    ],
    prepTime: 5
  },
  {
    id: 'suco-3',
    name: 'Suco de Abacaxi com Gengibre',
    description: 'Digestivo e metabólico, perfeito após as refeições.',
    benefits: [
      'Abacaxi rico em bromelina, que auxilia na digestão',
      'Gengibre anti-inflamatório e estimula o metabolismo',
      'Couve fonte de fibras e vitaminas',
      'Limão fornece vitamina C e ajuda na desintoxicação'
    ],
    ingredients: [
      '2 xícaras de abacaxi',
      '2 cm de gengibre',
      '1 folha de couve',
      'Suco de 1 limão'
    ],
    instructions: [
      'Corte o abacaxi em cubos',
      'Lave bem a couve',
      'Descasque o gengibre',
      'Bata tudo no liquidificador',
      'Adicione o suco de limão',
      'Sirva gelado'
    ],
    prepTime: 5
  },
  {
    id: 'suco-4',
    name: 'Suco de Beterraba e Cenoura',
    description: 'Rico em antioxidantes, melhora a saúde da pele.',
    benefits: [
      'Beterraba rica em antioxidantes e melhora a saúde da pele',
      'Cenouras fornecem vitamina A e antioxidantes',
      'Maçã contribui com fibras e doçura natural',
      'Limão ajuda na digestão e fornece vitamina C'
    ],
    ingredients: [
      '1 beterraba média',
      '2 cenouras',
      '1 maçã',
      'Suco de 1 limão'
    ],
    instructions: [
      'Descasque a beterraba e as cenouras',
      'Corte tudo em pedaços menores',
      'Bata no liquidificador com um pouco de água',
      'Adicione o suco de limão',
      'Sirva gelado'
    ],
    prepTime: 7
  },
  {
    id: 'suco-5',
    name: 'Suco de Framboesa e Espinafre',
    description: 'Rico em antioxidantes e ferro, perfeito para a saúde.',
    benefits: [
      'Framboesas ricas em antioxidantes e fibras',
      'Espinafre excelente fonte de ferro e vitaminas',
      'Pepino hidratante e baixo em calorias',
      'Aipo fornece fibras e ajuda na digestão'
    ],
    ingredients: [
      '1 xícara de framboesas (frescas ou congeladas)',
      '2 xícaras de espinafre',
      '1/2 pepino',
      '1 talo de aipo'
    ],
    instructions: [
      'Lave bem o espinafre, pepino e aipo',
      'Corte o pepino e aipo em pedaços',
      'Bata tudo no liquidificador',
      'Sirva imediatamente'
    ],
    prepTime: 5
  },
  {
    id: 'suco-6',
    name: 'Suco de Abacate e Espinafre',
    description: 'Cremoso e nutritivo, proporciona saciedade.',
    benefits: [
      'Espinafre rico em antioxidantes e vitaminas',
      'Abacate fornece gorduras saudáveis e ajuda na saciedade',
      'Maçã verde contribui com fibras e doçura natural',
      'Limão fornece vitamina C e ajuda na digestão'
    ],
    ingredients: [
      '2 xícaras de espinafre',
      '1/2 abacate maduro',
      '1 maçã verde',
      'Suco de 1 limão',
      '1/2 a 1 xícara de água'
    ],
    instructions: [
      'Lave bem o espinafre',
      'Corte o abacate e a maçã',
      'Bata tudo no liquidificador até ficar cremoso',
      'Sirva gelado'
    ],
    prepTime: 5
  },
  {
    id: 'suco-7',
    name: 'Suco de Açaí e Morango',
    description: 'Energético e antioxidante, perfeito para pré-treino.',
    benefits: [
      'Açaí rico em antioxidantes e ácidos graxos saudáveis',
      'Morangos fonte de vitamina C e fibras',
      'Sementes de chia ricas em fibras e ômega-3',
      'Água de coco hidratante e fornece eletrólitos'
    ],
    ingredients: [
      '1/2 xícara de polpa de açaí',
      '1 xícara de morangos',
      '1 colher de sopa de sementes de chia',
      '1 xícara de água de coco'
    ],
    instructions: [
      'Bata o açaí com a água de coco',
      'Adicione os morangos e a chia',
      'Bata até ficar homogêneo',
      'Sirva gelado'
    ],
    prepTime: 5
  },
  {
    id: 'suco-8',
    name: 'Suco de Pêssego e Camomila',
    description: 'Relaxante e digestivo, perfeito para a noite.',
    benefits: [
      'Pêssegos ricos em vitaminas A e C',
      'Camomila promove o relaxamento e melhora o sono',
      'Iogurte fornece probióticos para saúde digestiva',
      'Mel adiciona doçura natural'
    ],
    ingredients: [
      '2 pêssegos maduros',
      '1 sachê de chá de camomila (infundido e resfriado)',
      '1/2 xícara de iogurte natural',
      '1 colher de sopa de mel (opcional)'
    ],
    instructions: [
      'Prepare o chá de camomila e deixe esfriar',
      'Corte os pêssegos em pedaços',
      'Bata o pêssego com o chá de camomila',
      'Adicione o iogurte e o mel',
      'Bata bem e sirva'
    ],
    prepTime: 10
  },
  {
    id: 'suco-9',
    name: 'Suco de Pepino e Limão',
    description: 'Super hidratante e detox, baixo em calorias.',
    benefits: [
      'Pepino hidratante e auxilia na eliminação de toxinas',
      'Limão rico em vitamina C e ajuda na digestão',
      'Hortelã proporciona frescor e apoia a digestão',
      'Água de coco ótima fonte de hidratação'
    ],
    ingredients: [
      '1 pepino',
      'Suco de 1 limão',
      'Algumas folhas de hortelã',
      '1 xícara de água de coco'
    ],
    instructions: [
      'Descasque e corte o pepino',
      'Bata o pepino com a água de coco',
      'Adicione o suco de limão e a hortelã',
      'Sirva bem gelado'
    ],
    prepTime: 5
  },
  {
    id: 'suco-10',
    name: 'Suco de Melão e Cúrcuma',
    description: 'Anti-inflamatório poderoso e hidratante.',
    benefits: [
      'Melão rico em vitaminas A e C, além de ser hidratante',
      'Cúrcuma poderoso anti-inflamatório',
      'Pimenta-do-reino melhora a absorção da cúrcuma',
      'Limão fornece vitamina C e auxilia na digestão'
    ],
    ingredients: [
      '2 xícaras de melão maduro',
      '1 colher de chá de cúrcuma em pó',
      'Uma pitada de pimenta-do-reino',
      'Suco de 1 limão'
    ],
    instructions: [
      'Corte o melão em cubos',
      'Bata o melão no liquidificador',
      'Adicione a cúrcuma e a pimenta',
      'Por último o suco de limão',
      'Sirva gelado'
    ],
    prepTime: 5
  }
];

export default juices;
