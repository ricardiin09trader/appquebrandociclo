export interface Phrase {
  quote: string;
  category: string;
}

export const phrases: Phrase[] = [
  { quote: 'Você não está de dieta. Você está quebrando um ciclo.', category: 'mentalidade' },
  { quote: 'Cada escolha saudável é uma declaração de amor próprio.', category: 'mentalidade' },
  { quote: 'Não é sobre ficar magra. É sobre ficar saudável e feliz.', category: 'mentalidade' },
  { quote: 'O corpo que você tem é o único lugar que você tem que viver. Cuide dele.', category: 'mentalidade' },
  { quote: 'Pequenos progressos ainda são progressos.', category: 'geral' },
  { quote: 'Um dia de cada vez, uma escolha de cada vez.', category: 'geral' },
  { quote: 'Você é mais forte do que suas desculpas.', category: 'mentalidade' },
  { quote: 'A água é o combustível do seu corpo. Hidrate-se!', category: 'agua' },
  { quote: 'Beber água é o ato de amor mais simples que você pode fazer por você.', category: 'agua' },
  { quote: 'Seu corpo está pedindo água, não comida.', category: 'agua' },
  { quote: 'Comer bem não é privação, é nutrição.', category: 'alimentacao' },
  { quote: 'Cada refeição é uma oportunidade de nutrir seu corpo.', category: 'alimentacao' },
  { quote: 'Comida saudável pode ser deliciosa. Descubra!', category: 'alimentacao' },
  { quote: 'Você não precisa comer menos, precisa comer melhor.', category: 'alimentacao' },
  { quote: 'O exercício é celebração do que seu corpo pode fazer.', category: 'exercicio' },
  { quote: 'Mover o corpo é agradecer por ele existir.', category: 'exercicio' },
  { quote: 'A consistência vence a intensidade.', category: 'geral' },
  { quote: 'Você não falhou. Você aprendeu.', category: 'mentalidade' },
  { quote: 'Seu progresso pode ser lento, mas é progresso.', category: 'geral' },
  { quote: 'A transformação começa na mente.', category: 'mentalidade' },
];

export function getRandomPhrase(): Phrase {
  return phrases[Math.floor(Math.random() * phrases.length)];
}
