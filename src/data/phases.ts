export interface Exercise {
  question: string;
  placeholder: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  xp: number;
  exercises: Exercise[];
}

export interface Phase {
  id: number;
  title: string;
  emoji: string;
  color: string;
  description: string;
  lessons: Lesson[];
}

export const phases: Phase[] = [
  {
    id: 1,
    title: 'Mentalidade',
    emoji: '🧠',
    color: 'from-purple-500 to-purple-600',
    description: 'Prepare sua mente para a transformação',
    lessons: [
      {
        id: 1, title: 'Bem-vindo à Jornada', xp: 20,
        content: `# Sua Jornada Começa Aqui! 🌟

"Dê o primeiro passo com fé. Não é necessário que você veja toda a escada. Apenas dê o primeiro passo." - Martin Luther King

Você decidiu embarcar nesta jornada de transformação. Antes de mergulharmos nas estratégias práticas, é fundamental construir as bases mentais para o seu triunfo.

## O que você vai descobrir:

✨ Que o emagrecimento não é apenas uma mudança física
✨ Como desenvolver uma relação saudável com a comida
✨ A importância de uma mentalidade positiva
✨ Estratégias para superar crenças limitantes

**Lembre-se:** O verdadeiro sucesso vai além dos números na balança. Vamos transformar sua mentalidade e seu corpo, criando um novo capítulo emocionante em sua vida.`,
        exercises: [
          { question: 'O que te motivou a iniciar esta jornada de transformação?', placeholder: 'Escreva aqui sua motivação principal...' },
          { question: 'Qual é o seu maior objetivo com essa mudança?', placeholder: 'Descreva seu objetivo...' },
        ],
      },
      {
        id: 2, title: 'Abordagem Equilibrada', xp: 25,
        content: `# Abordagem Equilibrada para o Emagrecimento 📊

Vamos explorar os benefícios de adotar uma abordagem equilibrada para alcançar seus objetivos.

## 1. Transformação Completa 🔄
Uma abordagem equilibrada vai além de perder peso. Ela abrange uma mudança completa, incluindo a saúde da mente, das emoções e do corpo.

## 2. Relação Positiva com a Alimentação 🍎
Você cultiva uma relação amigável com a comida e o corpo. Priorizando alimentos nutritivos e prazerosos, em vez de apenas impor restrições.

## 3. Progresso Sustentável 📈
O sucesso duradouro depende da sustentabilidade. Hábitos realistas e práticos são mantidos a longo prazo.

## 4. Bem-Estar Mental e Emocional 🧘
Uma abordagem equilibrada melhora a saúde física e impacta positivamente o bem-estar mental.

## 5. Autoconfiança e Autoestima 💪
Construir conquistas consistentes gera um sentimento de orgulho e empoderamento.`,
        exercises: [
          { question: 'Como você descreveria sua relação atual com a alimentação?', placeholder: 'Descreva sua relação...' },
          { question: 'O que você entende por "abordagem equilibrada"?', placeholder: 'Escreva sua compreensão...' },
        ],
      },
      {
        id: 3, title: 'Crenças Limitantes', xp: 30,
        content: `# Superando Crenças Limitantes 🚫➡️✅

Crenças limitantes podem estar bloqueando seu progresso. Vamos identificá-las e superá-las!

## Crenças Comuns que Limitam:

❌ "Não sou capaz de emagrecer"
❌ "Dieta é sempre difícil"
❌ "Eu herdei essa genética"
❌ "Não tenho tempo para me exercitar"
❌ "Só serei feliz quando emagrecer"
❌ "Já tentei tudo e nada funciona"

## Impacto no Comportamento:
Essas crenças podem levar à:
- Autossabotagem
- Procrastinação
- Desistência precoce
- Baixa autoestima

## Como Superar:
1. **Identifique** a crença limitante
2. **Questione** se ela é verdadeira
3. **Reframe** para uma crença positiva
4. **Aja** de acordo com a nova crença`,
        exercises: [
          { question: 'Quais crenças limitantes você identifica em si mesmo?', placeholder: 'Liste suas crenças limitantes...' },
          { question: 'Como você pode transformar cada uma dessas crenças em algo positivo?', placeholder: 'Reescreva suas crenças de forma positiva...' },
        ],
      },
      {
        id: 4, title: '12 Estratégias de Sucesso', xp: 35,
        content: `# 12 Estratégias para Mentalidade Positiva 🎯

## 1. Autoconhecimento 🪞
Compreenda seus padrões alimentares, emoções e motivações pessoais.

## 2. Defina Objetivos Realistas 🎯
Metas alcançáveis e mensuráveis. Ex: "Adicionar mais vegetais às refeições"

## 3. Distinga Fome de Emoção 🤔
Reconheça quando está com fome física versus fome emocional.

## 4. Evite Restrições Extremas ⚖️
RESTRIÇÃO GERA COMPULSÃO. Equilíbrio é fundamental.

## 5. Esteja Atento à Saciedade 🛑
Pare de comer quando se sentir satisfeito, não completamente cheio.

## 6. Planejamento é Chave 📅
Programe suas refeições com antecedência.

## 7. Alimente-se para Nutrir 🥗
Veja os alimentos como combustível para seu corpo.

## 8. Inclua Proteína 🍗
Ajuda a manter a saciedade.

## 9. Mantenha-se Ativo 🏃
Encontre uma atividade que você goste.

## 10. Mantenha-se Hidratado 💧
Água pode evitar confundir sede com fome.

## 11. Escolha Alimentos Integrais 🌾
Opte por alimentos naturais e menos processados.

## 12. Ame a Jornada ❤️
Celebre cada conquista, por menor que seja.`,
        exercises: [
          { question: 'Quais dessas 12 estratégias você já pratica?', placeholder: 'Liste as que já faz parte da sua rotina...' },
          { question: 'Quais 3 estratégias você vai implementar primeiro?', placeholder: 'Escolha 3 estratégias para começar...' },
          { question: 'Como você pretende implementar cada uma delas?', placeholder: 'Descreva seu plano de ação...' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Hidratação',
    emoji: '💧',
    color: 'from-blue-500 to-blue-600',
    description: 'Descubra a importância da água',
    lessons: [
      {
        id: 1, title: 'O Poder da Água', xp: 25,
        content: `# O Poder da Água na Transformação 💧

## Por que a água é tão importante?

A água é essencial para todas as funções do corpo. Ela:
- Regula a temperatura corporal
- Auxilia na digestão
- Elimina toxinas
- Mantém a pele saudável
- Melhora o funcionamento do cérebro
- Auxilia na perda de peso

## Cálculo da sua Meta Diária 📊

**Fórmula:** Seu peso × 35 = ml de água por dia

### Exemplo:
Maria tem 60kg
60 × 35 = 2.100ml
Maria deve tomar 2 litros e 100ml por dia

## Dicas Práticas 💡

✅ Ande sempre com uma garrafinha bonitinha
✅ Defina alarmes para lembrar de beber água
✅ Beba um copo antes de cada refeição
✅ Adicione limão, hortelã ou frutas para dar sabor
✅ Comece o dia com um copo de água em jejum`,
        exercises: [
          { question: 'Qual é o seu peso atual? (para calcular sua meta de água)', placeholder: 'Ex: 70kg' },
          { question: 'Quantos copos de água você bebe atualmente por dia?', placeholder: 'Ex: 4 copos' },
          { question: 'Qual estratégia você vai usar para aumentar seu consumo de água?', placeholder: 'Descreva sua estratégia...' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Comer Emocional',
    emoji: '🍽️',
    color: 'from-pink-500 to-pink-600',
    description: 'Identifique seus gatilhos',
    lessons: [
      {
        id: 1, title: 'O que é Comer Emocional?', xp: 20,
        content: `# O que é Comer Emocional? 🤔

Comer emocional está presente em nossas vidas por um simples motivo: **somos seres humanos!**

Enquanto vivermos, teremos que lidar com nossas emoções e, em algumas ocasiões, a comida estará presente nesse processo.

## Quando é Normal? ✅
- Comer em comemorações (aniversários, casamentos)
- Comer por tristeza ocasional
- Comer para celebrar momentos especiais

## Quando é um Problema? ⚠️

A grande questão é quando a **comida se torna a resposta para tudo**:
- Tédio
- Tristeza
- Alegria
- Raiva
- Ansiedade

E acontece numa **frequência alta, quase que diária**.`,
        exercises: [
          { question: 'Com que frequência você come por razões emocionais?', placeholder: 'Ex: Diariamente, algumas vezes por semana...' },
          { question: 'Em quais situações você mais recorre à comida?', placeholder: 'Descreva as situações...' },
        ],
      },
      {
        id: 2, title: 'Identificando Emoções', xp: 30,
        content: `# Identificando Suas Emoções 🔍

A tomada de consciência dos sentimentos associados ao comer é fundamental.

## Tabela de Emoções e Respostas:

| Emoção/Sentimento | Resposta |
|-------------------|----------|
| 😰 Ansiedade | Usar comida para acalmar |
| 😴 Tédio | Comer para fazer alguma coisa |
| 😫 Estresse | Comer para ter alívio |
| 🎁 Suborno | "Acabe a tarefa e você ganha algo" |
| 🕳️ Vazio | Comer por falta de sentido |
| 🎉 Excitação | Comer como algo divertido |
| 😢 Solidão | Usar comida como companhia |
| 😤 Frustração/Raiva | Comer como catarse |
| 😰 Tristeza | Usar comida como consolo |
| ⏰ Procrastinação | "Vou fazer depois de comer" |
| 🏆 Prêmio | "Eu mereço" |

## Pergunta-chave:
Antes de comer, pergunte-se: **"Estou com fome física ou emocional?"**`,
        exercises: [
          { question: 'Quais emoções da tabela você identifica em si mesmo com mais frequência?', placeholder: 'Liste as emoções...' },
          { question: 'Faça um registro das vezes que comeu hoje e como estava se sentindo:', placeholder: 'Ex: 10h - comi um biscoito - estava ansiosa...' },
        ],
      },
      {
        id: 3, title: 'Comportamentos Alternativos', xp: 40,
        content: `# Comportamentos Alternativos 🔄

Agora que você identificou suas emoções, vamos encontrar alternativas para cada situação!

## Exemplos de Comportamentos Alternativos:

### 😰 Para Ansiedade:
- Tomar um banho relaxante
- Fazer exercícios de respiração
- Ouvir música calma
- Meditar por 5 minutos

### 😴 Para Tédio:
- Ler um livro
- Fazer um passeio
- Aprender algo novo
- Ligar para um amigo

### 😫 Para Estresse:
- Praticar atividade física
- Fazer alongamento
- Escrever em um diário
- Tomar um chá relaxante

### 😢 Para Tristeza:
- Assistir uma série leve
- Conversar com alguém querido
- Fazer algo que te dá prazer
- Ouvir uma playlist animada

### 😤 Para Raiva/Frustração:
- Escrever como se sente
- Fazer exercício intenso
- Organizar algo
- Sair para caminhar`,
        exercises: [
          { question: 'Para cada emoção que você identificou, qual comportamento alternativo você pode adotar?', placeholder: 'Liste: Emoção → Comportamento alternativo...' },
          { question: 'Quais dessas alternativas você já tem disponível no seu dia a dia?', placeholder: 'Liste as que são possíveis para você...' },
          { question: 'Quais novas alternativas você pretende implementar?', placeholder: 'Descreva seu plano...' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Plano Alimentar',
    emoji: '🥗',
    color: 'from-green-500 to-green-600',
    description: 'Seu menu de 1500kcal',
    lessons: [
      {
        id: 1, title: 'Conhecendo seu Plano', xp: 20,
        content: `# Plano Alimentar 1500 kcal 📋

Nutricionista: Natalia Cavalcante | CRN 17639

## Nossos Objetivos 🎯

✅ Emagrecimento sustentável
✅ Reeducação alimentar
✅ Saúde e bem-estar

## Antes de tudo, beba ÁGUA! 💧

**Cálculo:** Seu peso × 35 = ml de água por dia

## Orientações Importantes ⚠️

⏰ **Intervalo:** 3 horas entre refeições
⚖️ **Pesagem:** Use balança digital
😴 **Sono:** 7-8 horas por dia
🚫 **Proibido:** Açúcares, doces, refrigerantes
✅ **Permitido:** Café, adoçante, refrigerante zero

## Duração: 30 dias

Após esse período, consulte seu nutricionista para ajustes.`,
        exercises: [
          { question: 'Você entendeu as orientações? Qual é a principal dificuldade que você prevê?', placeholder: 'Escreva suas preocupações...' },
          { question: 'Como você pretende se organizar para seguir o plano?', placeholder: 'Descreva sua estratégia...' },
        ],
      },
    ],
  },
];

export function getTotalLessons(): number {
  return phases.reduce((acc, p) => acc + p.lessons.length, 0);
}

export function getTotalXP(): number {
  return phases.reduce((acc, p) => acc + p.lessons.reduce((a, l) => a + l.xp, 0), 0);
}
