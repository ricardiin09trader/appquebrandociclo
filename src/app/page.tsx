'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, BookOpen, ChefHat, Trophy, User, ChevronRight, ChevronLeft, 
  Heart, Plus, Minus, Check, Droplets, Target, Download, X, 
  Share2, Award, Clock, Brain, Utensils, GlassWater, Dumbbell,
  Star, Zap, Lock, Unlock, Play, Pause, RotateCcw, Edit3, Search, Flame,
  Sun, Moon, Smartphone, Info, XCircle, Share, ChevronDown, Mail, Eye, EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/useAppStore';
import { useThemeStore, applyTheme } from '@/store/useThemeStore';
import { juices as juicesData, type Juice as JuiceType } from '@/data/juices';
import { recipes as recipesData, type Recipe as RecipeType } from '@/data/recipes';

// ============================================
// FRASES MOTIVACIONAIS (20 VARIAÇÕES)
// ============================================
const motivationalPhrases = [
  { quote: "Você não está de dieta. Você está quebrando um ciclo.", category: "mentalidade" },
  { quote: "Cada escolha saudável é uma declaração de amor próprio.", category: "mentalidade" },
  { quote: "Não é sobre ficar magra. É sobre ficar saudável e feliz.", category: "mentalidade" },
  { quote: "O corpo que você tem é o único lugar que você tem que viver. Cuide dele.", category: "mentalidade" },
  { quote: "Pequenos progressos ainda são progressos.", category: "geral" },
  { quote: "Um dia de cada vez, uma escolha de cada vez.", category: "geral" },
  { quote: "Você é mais forte do que suas desculpas.", category: "mentalidade" },
  { quote: "A água é o combustível do seu corpo. Hidrate-se!", category: "agua" },
  { quote: "Beber água é o ato de amor mais simples que você pode fazer por você.", category: "agua" },
  { quote: "Seu corpo está pedindo água, não comida.", category: "agua" },
  { quote: "Comer bem não é privação, é nutrição.", category: "alimentacao" },
  { quote: "Cada refeição é uma oportunidade de nutrir seu corpo.", category: "alimentacao" },
  { quote: "Comida saudável pode ser deliciosa. Descubra!", category: "alimentacao" },
  { quote: "Você não precisa comer menos, precisa comer melhor.", category: "alimentacao" },
  { quote: "O exercício é celebração do que seu corpo pode fazer.", category: "exercicio" },
  { quote: "Mover o corpo é agradecer por ele existir.", category: "exercicio" },
  { quote: "A consistência vence a intensidade.", category: "geral" },
  { quote: "Você não falhou. Você aprendeu.", category: "mentalidade" },
  { quote: "Seu progresso pode ser lento, mas é progresso.", category: "geral" },
  { quote: "A transformação começa na mente.", category: "mentalidade" },
];

// ============================================
// JORNADA GAMIFICADA - FASES E LIÇÕES
// ============================================
const journeyPhases = [
  {
    id: 1,
    title: "Mentalidade",
    emoji: "🧠",
    color: "from-purple-500 to-purple-600",
    description: "Prepare sua mente para a transformação",
    lessons: [
      {
        id: 1,
        title: "Bem-vindo à Jornada",
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
          { question: "O que te motivou a iniciar esta jornada de transformação?", placeholder: "Escreva aqui sua motivação principal..." },
          { question: "Qual é o seu maior objetivo com essa mudança?", placeholder: "Descreva seu objetivo..." },
        ],
        xp: 20,
      },
      {
        id: 2,
        title: "Abordagem Equilibrada",
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
          { question: "Como você descreveria sua relação atual com a alimentação?", placeholder: "Descreva sua relação..." },
          { question: "O que você entende por 'abordagem equilibrada'?", placeholder: "Escreva sua compreensão..." },
        ],
        xp: 25,
      },
      {
        id: 3,
        title: "Crenças Limitantes",
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
          { question: "Quais crenças limitantes você identifica em si mesmo?", placeholder: "Liste suas crenças limitantes..." },
          { question: "Como você pode transformar cada uma dessas crenças em algo positivo?", placeholder: "Reescreva suas crenças de forma positiva..." },
        ],
        xp: 30,
      },
      {
        id: 4,
        title: "12 Estratégias de Sucesso",
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
          { question: "Quais dessas 12 estratégias você já pratica?", placeholder: "Liste as que já faz parte da sua rotina..." },
          { question: "Quais 3 estratégias você vai implementar primeiro?", placeholder: "Escolha 3 estratégias para começar..." },
          { question: "Como você pretende implementar cada uma delas?", placeholder: "Descreva seu plano de ação..." },
        ],
        xp: 35,
      },
    ],
  },
  {
    id: 2,
    title: "Hidratação",
    emoji: "💧",
    color: "from-blue-500 to-blue-600",
    description: "Descubra a importância da água",
    lessons: [
      {
        id: 1,
        title: "O Poder da Água",
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
          { question: "Qual é o seu peso atual? (para calcular sua meta de água)", placeholder: "Ex: 70kg" },
          { question: "Quantos copos de água você bebe atualmente por dia?", placeholder: "Ex: 4 copos" },
          { question: "Qual estratégia você vai usar para aumentar seu consumo de água?", placeholder: "Descreva sua estratégia..." },
        ],
        xp: 25,
      },
    ],
  },
  {
    id: 3,
    title: "Comer Emocional",
    emoji: "🍽️",
    color: "from-pink-500 to-pink-600",
    description: "Identifique seus gatilhos",
    lessons: [
      {
        id: 1,
        title: "O que é Comer Emocional?",
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
          { question: "Com que frequência você come por razões emocionais?", placeholder: "Ex: Diariamente, algumas vezes por semana..." },
          { question: "Em quais situações você mais recorre à comida?", placeholder: "Descreva as situações..." },
        ],
        xp: 20,
      },
      {
        id: 2,
        title: "Identificando Emoções",
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
          { question: "Quais emoções da tabela você identifica em si mesmo com mais frequência?", placeholder: "Liste as emoções..." },
          { question: "Faça um registro das vezes que comeu hoje e como estava se sentindo:", placeholder: "Ex: 10h - comi um biscoito - estava ansiosa..." },
        ],
        xp: 30,
      },
      {
        id: 3,
        title: "Comportamentos Alternativos",
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
          { question: "Para cada emoção que você identificou, qual comportamento alternativo você pode adotar?", placeholder: "Liste: Emoção → Comportamento alternativo..." },
          { question: "Quais dessas alternativas você já tem disponível no seu dia a dia?", placeholder: "Liste as que são possíveis para você..." },
          { question: "Quais novas alternativas você pretende implementar?", placeholder: "Descreva seu plano..." },
        ],
        xp: 40,
      },
    ],
  },
  {
    id: 4,
    title: "Plano Alimentar",
    emoji: "🥗",
    color: "from-green-500 to-green-600",
    description: "Seu menu de 1500kcal",
    lessons: [
      {
        id: 1,
        title: "Conhecendo seu Plano",
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
          { question: "Você entendeu as orientações? Qual é a principal dificuldade que você prevê?", placeholder: "Escreva suas preocupações..." },
          { question: "Como você pretende se organizar para seguir o plano?", placeholder: "Descreva sua estratégia..." },
        ],
        xp: 20,
      },
    ],
  },
];

// ============================================
// PLANO ALIMENTAR COMPLETO (1500 KCAL)
// ============================================
const completeMealPlan = {
  cafe_manha: {
    title: 'Café da Manhã',
    emoji: '🌅',
    calories: '~350 kcal',
    options: [
      {
        name: 'Opção 1',
        items: [
          { food: 'Pão de forma integral', amount: '2 fatias (50g)' },
          { food: 'Ovo de galinha', amount: '2 unidades (100g)' },
          { food: 'Café sem açúcar', amount: '1 xícara' },
        ],
      },
      {
        name: 'Opção 2',
        items: [
          { food: 'Iogurte zero', amount: '200g' },
          { food: 'Morango', amount: '100g' },
          { food: 'Aveia em flocos finos', amount: '1 colher de chá cheia (12g)' },
          { food: 'Whey Protein', amount: '1 scoop' },
        ],
      },
    ],
    substitutions: [
      { original: 'Pão de forma integral', options: ['Pão francês (1 unidade - 50g)', 'Goma de tapioca (60g)', 'Cuscuz de milho cozido (100g)'] },
      { original: 'Ovo de galinha', options: ['Queijo minas frescal (50g)', 'Peito de frango desfiado (80g)'] },
      { original: 'Morango', options: ['Maçã (100g)', 'Melão (100g)', 'Uva (100g)', 'Banana (1 unidade)'] },
    ],
  },
  almoco: {
    title: 'Almoço',
    emoji: '☀️',
    calories: '~550 kcal',
    options: [
      {
        name: 'Opção Única',
        items: [
          { food: 'Arroz branco cozido', amount: '80g' },
          { food: 'Feijão cozido', amount: '80g' },
          { food: 'Peito de frango grelhado', amount: '120g' },
          { food: 'Salada de legumes cozidos no vapor', amount: '100g' },
          { food: 'Salada crua', amount: 'À vontade' },
          { food: 'Melancia', amount: '250g' },
        ],
      },
    ],
    substitutions: [
      { original: 'Arroz branco cozido', options: ['Batata inglesa (150g)', 'Arroz integral (80g)', 'Macarrão (80g)'] },
      { original: 'Feijão carioca cozido', options: ['Feijão preto cozido (80g)', 'Grão de bico cozido (50g)'] },
      { original: 'Peito de frango', options: ['Carne Patinho (120g)', 'Filé de peixe grelhado/assado (120g)'] },
      { original: 'Melancia', options: ['Melão (250g)', 'Abacaxi (100g)'] },
    ],
  },
  lanche_tarde: {
    title: 'Lanche da Tarde',
    emoji: '🌻',
    calories: '~200 kcal',
    options: [
      {
        name: 'Opção 1',
        items: [
          { food: 'Cuscuz de milho cozido com sal', amount: '80g' },
          { food: 'Ovo de galinha', amount: '1 unidade (50g)' },
          { food: 'Semente de chia', amount: '1 colher de chá cheia (6g)' },
        ],
      },
      {
        name: 'Opção 2',
        items: [
          { food: 'Banana', amount: '1 unidade' },
          { food: 'Aveia', amount: '30g' },
          { food: 'Canela em pó', amount: '1 colher de café cheia (4g)' },
        ],
      },
    ],
    substitutions: [
      { original: 'Cuscuz de milho cozido', options: ['Pão de forma integral (2 fatias - 50g)', 'Pão francês (1 unidade - 50g)', 'Tapioca (1 unidade - 50g)'] },
    ],
  },
  jantar: {
    title: 'Jantar',
    emoji: '🌙',
    calories: '~350 kcal',
    options: [
      {
        name: 'Opção Única',
        items: [
          { food: 'Arroz branco cozido', amount: '80g' },
          { food: 'Feijão carioca cozido', amount: '80g' },
          { food: 'Peito de frango grelhado', amount: '120g' },
          { food: 'Salada de legumes cozidos no vapor com sal', amount: '100g' },
          { food: 'Salada crua', amount: 'À vontade' },
          { food: 'Abacaxi com canela (opcional)', amount: '2 fatias médias (150g)' },
        ],
      },
    ],
    substitutions: [
      { original: 'Arroz branco cozido', options: ['Batata inglesa (150g)', 'Macarrão (80g)', 'Arroz integral (80g)'] },
      { original: 'Peito de frango', options: ['Carne Patinho (120g)', 'Filé de peixe grelhado/assado (120g)'] },
      { original: 'Abacaxi com canela', options: ['Melancia (2 fatias pequenas - 200g)', 'Melão (3 fatias pequenas - 200g)'] },
    ],
  },
  ceia: {
    title: 'Ceia',
    emoji: '😴',
    calories: '~100 kcal',
    options: [
      {
        name: 'Opção Única',
        items: [
          { food: 'Morango', amount: '100g' },
          { food: 'Leite em pó', amount: '20g' },
        ],
      },
    ],
    substitutions: [
      { original: 'Morango', options: ['Uva (100g)', 'Kiwi (100g)'] },
    ],
  },
};

// ============================================
// FICHA DE TREINO COMPLETA
// ============================================
const workoutPlan = {
  segunda: {
    title: 'Segunda - Quadríceps',
    emoji: '🦵',
    color: 'from-red-500 to-red-600',
    exercises: [
      { name: 'Cadeira Extensora', sets: '4x12-15', rest: '60s' },
      { name: 'Afundo', sets: '4x12-15', rest: '60s' },
      { name: 'Búlgaro', sets: '4x12-15', rest: '60s' },
      { name: 'Mesa Flexora', sets: '4x12-15', rest: '60s' },
      { name: 'Panturrilha no Leg', sets: '5x15-20', rest: '45s' },
      { name: 'Abdominal Máquina', sets: '3x10-12', rest: '45s' },
    ],
  },
  terca: {
    title: 'Terça - Costas e Bíceps',
    emoji: '💪',
    color: 'from-purple-500 to-purple-600',
    exercises: [
      { name: 'Puxada Alta', sets: '4x10-12', rest: '60s' },
      { name: 'Remada Máquina Neutra', sets: '4x10-12', rest: '60s' },
      { name: 'Remada Máquina Aberta', sets: '4x10-12', rest: '60s' },
      { name: 'Rosca Alternada com Halteres', sets: '3x10-12', rest: '45s' },
      { name: 'Bíceps Scott Máquina', sets: '3x10-12', rest: '45s' },
    ],
  },
  quarta: {
    title: 'Quarta - Posterior',
    emoji: '🔥',
    color: 'from-orange-500 to-orange-600',
    exercises: [
      { name: 'Cadeira Flexora', sets: '4x12-15', rest: '60s' },
      { name: 'Stiff', sets: '4x12-15', rest: '60s' },
      { name: 'Mesa Flexora', sets: '4x12-15', rest: '60s' },
      { name: 'Terra Sumô', sets: '4x8-10', rest: '90s' },
      { name: 'Cadeira Abdutora', sets: '4x12-15', rest: '45s' },
      { name: 'Panturrilha no Leg', sets: '4x15-20', rest: '45s' },
    ],
  },
  quinta: {
    title: 'Quinta - Ombro e Tríceps',
    emoji: '🎯',
    color: 'from-blue-500 to-blue-600',
    exercises: [
      { name: 'Supino Inclinado com Halteres', sets: '3x10-12', rest: '60s' },
      { name: 'Desenvolvimento com Halteres', sets: '4x10-12', rest: '60s' },
      { name: 'Elevação Lateral com Halteres', sets: '4x10-12', rest: '45s' },
      { name: 'Remada Alta', sets: '4x10-12', rest: '60s' },
      { name: 'Tríceps Francês com Halter', sets: '3x10-12', rest: '45s' },
      { name: 'Tríceps Corda', sets: '3x10-12', rest: '45s' },
    ],
  },
  sexta: {
    title: 'Sexta - Glúteo',
    emoji: '🍑',
    color: 'from-pink-500 to-pink-600',
    exercises: [
      { name: 'Elevação Pélvica Máquina', sets: '4x10-12', rest: '60s' },
      { name: 'Coice na Polia', sets: '4x12-15', rest: '60s' },
      { name: 'Cadeira Abdutora', sets: '4x12-15', rest: '45s' },
      { name: 'Búlgaro', sets: '4x12-15', rest: '60s' },
      { name: 'Terra Sumô', sets: '4x8-10', rest: '90s' },
      { name: 'Abdominal Máquina', sets: '3x10-12', rest: '45s' },
    ],
  },
};

// ============================================
// TIPOS
// ============================================
interface Recipe {
  id: string;
  name: string;
  description?: string;
  category: string;
  calories: number;
  prepTime?: number;
  ingredients: string;
  instructions: string;
  tips?: string;
  isFavorite?: boolean;
}

interface Juice {
  id: string;
  name: string;
  description?: string;
  benefits: string;
  ingredients: string;
  instructions: string;
  isFavorite?: boolean;
}

interface UserProgress {
  phase1Lessons: number[];
  phase2Lessons: number[];
  phase3Lessons: number[];
  phase4Lessons: number[];
  exerciseAnswers: Record<string, string>;
}

// ============================================
// ANIMAÇÕES
// ============================================
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// ============================================
// COMPONENTE DE CONFETE
// ============================================
function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, y: -20, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), rotate: 0 }}
          animate={{ opacity: 0, y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100, rotate: Math.random() * 360 }}
          transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
          className="absolute text-2xl"
        >
          {['🎉', '✨', '🌟', '💫', '🎊'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// LANDING PAGE - COM LOGIN EMAIL
// ============================================
function LandingPage() {
  const { login } = useAppStore();
  const [mode, setMode] = useState<'intro' | 'login' | 'register'>('intro');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erro ao fazer login');
        setLoading(false);
        return;
      }
      login(data.user, data.userId);
    } catch (err) {
      setError('Erro de conexão');
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (step < 3) {
      if (step === 1) {
        if (!name || !email || !password) {
          setError('Preencha todos os campos');
          return;
        }
        if (password !== confirmPassword) {
          setError('As senhas não coincidem');
          return;
        }
        if (password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres');
          return;
        }
      }
      if (step === 2 && !weight) {
        setError('Informe seu peso atual');
        return;
      }
      setStep(step + 1);
      setError('');
      return;
    }

    if (!goalWeight) {
      setError('Informe sua meta de peso');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          weight: parseFloat(weight),
          goalWeight: parseFloat(goalWeight),
          objective: 'lose',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erro ao criar conta');
        setLoading(false);
        return;
      }
      login(data.user, data.userId);
    } catch (err) {
      setError('Erro de conexão');
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent" />
        <div className="relative max-w-lg mx-auto px-6 py-8">
          <motion.div className="text-center" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-xl">
              <span className="text-4xl">🌱</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quebrando Ciclo</h1>
            <p className="text-base text-gray-600">Sua jornada de transformação</p>
          </motion.div>
        </div>
      </div>

      {/* Progress Steps */}
      {mode === 'register' && (
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s < step ? 'bg-green-500 text-white' : s === step ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-10 h-1 mx-1 rounded ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Intro Screen */}
      {mode === 'intro' && (
        <div className="max-w-lg mx-auto px-6">
          <div className="space-y-3 mb-6">
            {journeyPhases.slice(0, 4).map((phase, index) => (
              <motion.div 
                key={phase.id}
                initial={{ x: -20, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${phase.color} rounded-xl flex items-center justify-center text-xl shadow-sm text-white`}>
                  {phase.emoji}
                </div>
                <div className="flex-1">
                  <span className="text-xs text-gray-400">Fase {phase.id}</span>
                  <h3 className="font-semibold text-gray-800 text-sm">{phase.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-4">Bem-vinda! 💚</h3>
            <div className="space-y-3">
              <Button onClick={() => setMode('login')} className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-semibold">
                <Mail className="mr-2 h-5 w-5" /> Entrar com Email
              </Button>
              <Button onClick={() => setMode('register')} variant="outline" className="w-full h-12 rounded-xl font-semibold">
                <User className="mr-2 h-5 w-5" /> Criar Conta
              </Button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              Ao continuar, você aceita nossos termos de uso
            </p>
          </motion.div>
        </div>
      )}

      {/* Login Screen */}
      {mode === 'login' && (
        <div className="max-w-lg mx-auto px-6">
          <motion.div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-4">Entrar 👋</h3>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                <XCircle className="h-4 w-4 flex-shrink-0" /> {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label className="text-gray-600">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="pl-10 h-12" />
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Senha</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" className="pl-10 pr-10 h-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <Button onClick={handleLogin} disabled={loading} className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600">
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              <button onClick={() => { setMode('intro'); setError(''); }} className="w-full text-sm text-gray-500 hover:text-gray-700">
                Voltar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Register Screen */}
      {mode === 'register' && (
        <div className="max-w-lg mx-auto px-6">
          <motion.div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={step}>
            {/* Step 1 */}
            {step === 1 && (
              <>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-4">Criar Conta 🌟</h3>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm"><XCircle className="h-4 w-4" /> {error}</div>}
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-600 text-sm">Nome</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className="mt-1 h-11" />
                  </div>
                  <div>
                    <Label className="text-gray-600 text-sm">Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="mt-1 h-11" />
                  </div>
                  <div>
                    <Label className="text-gray-600 text-sm">Senha</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="mt-1 h-11" />
                  </div>
                  <div>
                    <Label className="text-gray-600 text-sm">Confirmar Senha</Label>
                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repita a senha" className="mt-1 h-11" />
                  </div>
                </div>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <div className="text-center mb-4">
                  <div className="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <h3 className="text-lg font-bold">Qual é seu peso atual?</h3>
                  <p className="text-gray-500 text-sm">Isso nos ajuda a calcular sua meta de água</p>
                </div>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm"><XCircle className="h-4 w-4" /> {error}</div>}
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-600 text-sm">Peso atual (kg)</Label>
                    <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Ex: 70" className="mt-1 h-14 text-lg text-center" />
                  </div>
                  {weight && (
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                      <p className="text-sm text-blue-600">💧 <strong>Meta de água:</strong> {Math.ceil((parseFloat(weight) * 35) / 250)} copos/dia</p>
                      <p className="text-xs text-blue-500">({Math.round(parseFloat(weight) * 35)}ml = peso × 35ml)</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <>
                <div className="text-center mb-4">
                  <div className="w-14 h-14 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <Target className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold">Qual é sua meta?</h3>
                  <p className="text-gray-500 text-sm">O objetivo que deseja alcançar</p>
                </div>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm"><XCircle className="h-4 w-4" /> {error}</div>}
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-600 text-sm">Peso meta (kg)</Label>
                    <Input type="number" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} placeholder="Ex: 60" className="mt-1 h-14 text-lg text-center" />
                  </div>
                  {weight && goalWeight && (
                    <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-700">🎯 <strong>Olá, {name}!</strong></p>
                      <p className="text-sm text-gray-600 mt-2">Você vai sair de <strong>{weight}kg</strong> e chegar a <strong>{goalWeight}kg</strong></p>
                      <p className="text-lg font-bold text-green-600 mt-2">Perda de {(parseFloat(weight) - parseFloat(goalWeight)).toFixed(1)}kg 🌟</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-5">
              {step > 1 ? (
                <>
                  <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1 h-11" disabled={loading}>Voltar</Button>
                  <Button onClick={handleRegister} className="flex-1 h-11 bg-gradient-to-r from-green-500 to-green-600" disabled={loading}>
                    {loading ? 'Criando...' : step === 3 ? 'Iniciar Jornada' : 'Continuar'}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => { setMode('intro'); setError(''); }} variant="outline" className="flex-1 h-11">Voltar</Button>
                  <Button onClick={handleRegister} className="flex-1 h-11 bg-gradient-to-r from-green-500 to-green-600">Continuar</Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <div className="h-8" />
    </motion.div>
  );
}

// ============================================
// DASHBOARD PRINCIPAL
// ============================================
function Dashboard() {
  const { user, setCurrentView, setSelectedPhase } = useAppStore();
  const { theme, toggleTheme } = useThemeStore();
  const [todayCheck, setTodayCheck] = useState({
    drankWater: false, followedMeal: false, readContent: false, exercised: false, mindfulness: false,
  });
  const [water, setWater] = useState({ glasses: 0, goal: 8 });
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showPWABanner, setShowPWABanner] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    phase1Lessons: [],
    phase2Lessons: [],
    phase3Lessons: [],
    phase4Lessons: [],
    exerciseAnswers: {},
  });

  const randomQuoteIndex = Math.floor(Math.random() * motivationalPhrases.length);

  // Check if PWA banner should be shown
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (!dismissed && typeof window !== 'undefined') {
      // Show banner after 5 seconds
      const timer = setTimeout(() => setShowPWABanner(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Apply theme
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const dismissPWABanner = () => {
    setShowPWABanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  const fetchTodayCheck = useCallback(async () => {
    try {
      const res = await fetch('/api/user/checkin', { headers: { 'x-user-id': useAppStore.getState().userId || '' } });
      setTodayCheck(await res.json());
    } catch (error) { console.error('Erro:', error); }
  }, []);

  const fetchWater = useCallback(async () => {
    try {
      const res = await fetch('/api/water', { headers: { 'x-user-id': useAppStore.getState().userId || '' } });
      const data = await res.json();
      setWater({ glasses: data.glasses, goal: data.goal });
    } catch (error) { console.error('Erro:', error); }
  }, []);

  useEffect(() => {
    fetchTodayCheck();
    fetchWater();
    // Load user progress from localStorage
    const saved = localStorage.getItem('quebrando-ciclo-progress');
    if (saved) setUserProgress(JSON.parse(saved));
  }, [fetchTodayCheck, fetchWater]);

  const handleCheck = async (key: keyof typeof todayCheck) => {
    const newValue = !todayCheck[key];
    setTodayCheck({ ...todayCheck, [key]: newValue });
    try {
      await fetch('/api/user/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': useAppStore.getState().userId || '' },
        body: JSON.stringify({ ...todayCheck, [key]: newValue }),
      });
    } catch (error) { console.error('Erro:', error); }
  };

  const handleWater = async (increment: number) => {
    const newGlasses = Math.max(0, water.glasses + increment);
    setWater({ ...water, glasses: newGlasses });
    try {
      await fetch('/api/water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': useAppStore.getState().userId || '' },
        body: JSON.stringify({ glasses: newGlasses }),
      });
    } catch (error) { console.error('Erro:', error); }
  };

  const quote = motivationalPhrases[randomQuoteIndex];
  const checks = [
    { key: 'drankWater' as const, label: 'Água', emoji: '💧' },
    { key: 'followedMeal' as const, label: 'Dieta', emoji: '🥗' },
    { key: 'readContent' as const, label: 'Conteúdo', emoji: '📚' },
    { key: 'exercised' as const, label: 'Treino', emoji: '🏃' },
    { key: 'mindfulness' as const, label: 'Mente', emoji: '🧘' },
  ];
  const completedChecks = Object.values(todayCheck).filter(Boolean).length;
  const xpToday = completedChecks * 10;

  // Calculate total progress
  const totalLessons = journeyPhases.reduce((acc, p) => acc + p.lessons.length, 0);
  const completedLessons = userProgress.phase1Lessons.length + userProgress.phase2Lessons.length + 
                          userProgress.phase3Lessons.length + userProgress.phase4Lessons.length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <motion.div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* PWA Install Banner */}
      <AnimatePresence>
        {showPWABanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg"
          >
            <div className="max-w-lg mx-auto flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">📱 Instale o App!</p>
                <p className="text-xs text-purple-100 truncate">Adicione à tela inicial para acesso rápido</p>
              </div>
              <button
                onClick={dismissPWABanner}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-w-lg mx-auto mt-3 flex gap-2">
              <div className="flex-1 bg-white/10 rounded-lg p-2 text-xs text-center">
                <strong>iPhone:</strong> Toque em <Share className="h-3 w-3 inline mx-1" /> → "Adicionar à Tela Início"
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-2 text-xs text-center">
                <strong>Android:</strong> Menu ⋮ → "Adicionar à tela inicial"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-b-3xl ${showPWABanner ? 'mt-28' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-green-100 text-sm">Olá,</p>
            <h1 className="text-2xl font-bold">{user?.name || 'Usuária'} ✨</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme} 
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">Nível {user?.progress?.level || 1}</span>
              <span className="text-xs bg-yellow-400/20 text-yellow-200 px-2 py-0.5 rounded-full">
                {user?.progress?.xp || 0} XP
              </span>
            </div>
            <span className="text-xs">{progressPercent}% completo</span>
          </div>
          <Progress value={((user?.progress?.xp || 0) % 100)} className="h-2 bg-white/20" />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-green-100">🔥 {user?.progress?.streak || 0} dias seguidos</span>
            <span className="text-xs text-green-100">{completedLessons}/{totalLessons} lições</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Quote */}
        {quote && (
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-0 shadow-md">
            <CardContent className="p-4">
              <p className="text-gray-700 italic text-center leading-relaxed text-sm">"{quote.quote}"</p>
            </CardContent>
          </Card>
        )}
        
        {/* Daily Tasks */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" /> Missões de Hoje
              </h3>
              <span className="text-sm text-green-500 font-medium">+{xpToday} XP</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {checks.map((check) => (
                <button key={check.key} onClick={() => handleCheck(check.key)}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all ${todayCheck[check.key] ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100 border-2 border-transparent'}`}>
                  <span className="text-xl">{check.emoji}</span>
                  <span className="text-xs mt-1 text-gray-600">{check.label}</span>
                  {todayCheck[check.key] && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="h-3 w-3 text-green-500" /></motion.div>}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Water */}
        <Card className="shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowWaterModal(true)}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">💧</div>
                <div>
                  <p className="font-semibold text-gray-800">Hidratação</p>
                  <p className="text-sm text-gray-500">{water.glasses}/{water.goal} copos</p>
                </div>
              </div>
              <Progress value={(water.glasses / water.goal) * 100} className="h-2 w-16" />
            </div>
          </CardContent>
        </Card>
        
        {/* Journey Progress */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">📍 Sua Jornada</h3>
          <div className="space-y-2">
            {journeyPhases.map((phase) => {
              const completedPhaseLessons = (userProgress as Record<string, number[]>)[`phase${phase.id}Lessons`] || [];
              const isComplete = completedPhaseLessons.length === phase.lessons.length && phase.lessons.length > 0;
              const isInProgress = completedPhaseLessons.length > 0;
              
              return (
                <Card 
                  key={phase.id}
                  className={`shadow-sm cursor-pointer active:scale-[0.99] transition-transform ${isComplete ? 'bg-green-50 border-green-200' : ''}`}
                  onClick={() => { setSelectedPhase(phase.id); setCurrentView('phases'); }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${phase.color} rounded-xl flex items-center justify-center text-xl shadow-sm ${isComplete ? 'opacity-100' : ''}`}>
                        {isComplete ? '✅' : phase.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Fase {phase.id}</span>
                          {isInProgress && !isComplete && (
                            <span className="text-xs text-green-500">Em progresso</span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-800">{phase.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={phase.lessons.length > 0 ? (completedPhaseLessons.length / phase.lessons.length) * 100 : 0} className="h-1.5 flex-1" />
                          <span className="text-xs text-gray-400">{completedPhaseLessons.length}/{phase.lessons.length}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-sm cursor-pointer active:scale-[0.98] transition-transform" onClick={() => setCurrentView('nutrition')}>
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-green-100 rounded-xl flex items-center justify-center text-xl">🥗</div>
              <p className="font-medium text-sm mt-2">Nutrição</p>
              <p className="text-xs text-gray-500">Receitas e Sucos</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm cursor-pointer active:scale-[0.98] transition-transform" onClick={() => setCurrentView('mealplan')}>
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-amber-100 rounded-xl flex items-center justify-center text-xl">📋</div>
              <p className="font-medium text-sm mt-2">Plano 1500kcal</p>
              <p className="text-xs text-gray-500">Menu completo</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm cursor-pointer active:scale-[0.98] transition-transform" onClick={() => setCurrentView('workout')}>
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-purple-100 rounded-xl flex items-center justify-center text-xl">💪</div>
              <p className="font-medium text-sm mt-2">Ficha de Treino</p>
              <p className="text-xs text-gray-500">5 dias</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm cursor-pointer active:scale-[0.98] transition-transform" onClick={() => setCurrentView('phases')}>
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto bg-blue-100 rounded-xl flex items-center justify-center text-xl">📚</div>
              <p className="font-medium text-sm mt-2">Jornada</p>
              <p className="text-xs text-gray-500">4 fases</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Water Modal */}
      <AnimatePresence>
        {showWaterModal && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowWaterModal(false)}>
            <motion.div className="bg-white rounded-t-3xl w-full max-w-lg p-6" initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">💧</div>
                <h3 className="text-xl font-bold">Hidratação</h3>
                <p className="text-gray-500">Meta: {water.goal} copos por dia</p>
              </div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button variant="outline" size="lg" onClick={() => handleWater(-1)} className="rounded-full w-16 h-16"><Minus className="h-6 w-6" /></Button>
                <div className="text-5xl font-bold text-blue-500 w-24 text-center">{water.glasses}</div>
                <Button size="lg" onClick={() => handleWater(1)} className="rounded-full w-16 h-16 bg-blue-500 hover:bg-blue-600"><Plus className="h-6 w-6" /></Button>
              </div>
              <Progress value={(water.glasses / water.goal) * 100} className="h-3 mb-2" />
              <p className="text-center text-sm text-gray-500">{(water.glasses * 250)}ml de {(water.goal * 250)}ml</p>
              <Button onClick={() => setShowWaterModal(false)} className="w-full mt-6 h-12 rounded-xl">Confirmar</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <BottomNav />
    </motion.div>
  );
}

// ============================================
// BOTTOM NAVIGATION
// ============================================
function BottomNav() {
  const { currentView, setCurrentView } = useAppStore();
  const navItems = [
    { view: 'dashboard' as const, icon: Home, label: 'Início' },
    { view: 'phases' as const, icon: BookOpen, label: 'Jornada' },
    { view: 'nutrition' as const, icon: Utensils, label: 'Nutrição' },
    { view: 'achievements' as const, icon: Trophy, label: 'Conquistas' },
    { view: 'profile' as const, icon: User, label: 'Perfil' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
        {navItems.map((item) => (
          <button key={item.view} onClick={() => setCurrentView(item.view)}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${currentView === item.view ? 'text-green-600' : 'text-gray-400'}`}>
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// PHASES SCREEN (JORNADA)
// ============================================
function PhasesScreen() {
  const { currentView, setCurrentView, selectedPhase, setSelectedPhase } = useAppStore();
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quebrando-ciclo-progress');
      if (saved) return JSON.parse(saved);
    }
    return {
      phase1Lessons: [],
      phase2Lessons: [],
      phase3Lessons: [],
      phase4Lessons: [],
      exerciseAnswers: {},
    };
  });
  // Lesson detail state - always declared at top level
  const [currentLesson, setCurrentLesson] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showExercises, setShowExercises] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const saveProgress = (newProgress: UserProgress) => {
    setUserProgress(newProgress);
    localStorage.setItem('quebrando-ciclo-progress', JSON.stringify(newProgress));
  };

  // Get current phase
  const phase = selectedPhase > 0 ? journeyPhases.find(p => p.id === selectedPhase) : null;
  const lesson = phase?.lessons[currentLesson];
  const completedLessons = phase ? (userProgress as Record<string, number[]>)[`phase${phase.id}Lessons`] || [] : [];
  const isLessonComplete = lesson ? completedLessons.includes(lesson.id) : false;

  // Calculate saved answers using useMemo (avoids setState in effect)
  const initialAnswers = useMemo(() => {
    if (!phase || !lesson) return {};
    const saved: Record<number, string> = {};
    lesson.exercises.forEach((_, i) => {
      const key = `phase${phase.id}_lesson${lesson.id}_ex${i}`;
      if (userProgress.exerciseAnswers[key]) {
        saved[i] = userProgress.exerciseAnswers[key];
      }
    });
    return saved;
  }, [phase, lesson, userProgress.exerciseAnswers]);

  // Update answers when initialAnswers changes
  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);

  // Lesson Detail View
  if (selectedPhase > 0 && phase) {
    const completeLesson = () => {
      if (!lesson) return;
      // Save progress
      const newProgress = { ...userProgress };
      const phaseKey = `phase${phase.id}Lessons` as keyof UserProgress;
      if (!newProgress[phaseKey].includes(lesson.id)) {
        (newProgress[phaseKey] as number[]).push(lesson.id);
      }
      // Save answers
      Object.entries(answers).forEach(([index, answer]) => {
        const key = `phase${phase.id}_lesson${lesson.id}_ex${index}`;
        newProgress.exerciseAnswers[key] = answer;
      });
      saveProgress(newProgress);
      
      setShowConfetti(true);
      setLessonComplete(true);
      setTimeout(() => setShowConfetti(false), 3000);
    };

    const goToNextLesson = () => {
      if (!phase) return;
      if (currentLesson < phase.lessons.length - 1) {
        setCurrentLesson(currentLesson + 1);
        setShowExercises(false);
        setLessonComplete(false);
        setAnswers({});
      } else {
        setSelectedPhase(0);
        setCurrentLesson(0);
      }
    };

    return (
      <motion.div className="min-h-screen bg-gray-50 pb-24" {...fadeIn}>
        <Confetti show={showConfetti} />
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${phase.color} text-white p-5 rounded-b-3xl`}>
          <button onClick={() => setSelectedPhase(0)} className="flex items-center text-white/80 mb-3">
            <ChevronLeft className="h-5 w-5" /> Voltar
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{phase.emoji}</span>
            <div>
              <h1 className="text-xl font-bold">{phase.title}</h1>
              <p className="text-white/80 text-sm">Lição {currentLesson + 1} de {phase.lessons.length}</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={(completedLessons.length / phase.lessons.length) * 100} className="h-2 bg-white/20" />
          </div>
        </div>

        {/* Lesson Progress Pills */}
        <div className="p-3 overflow-x-auto">
          <div className="flex gap-2">
            {phase.lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => { setCurrentLesson(i); setShowExercises(false); setLessonComplete(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  currentLesson === i 
                    ? `bg-gradient-to-r ${phase.color} text-white shadow-md` 
                    : completedLessons.includes(l.id)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-white text-gray-600 shadow-sm'
                }`}
              >
                {completedLessons.includes(l.id) && currentLesson !== i ? '✓' : ''} {l.title}
              </button>
            ))}
          </div>
        </div>

        {lesson && (
          <div className="p-4 space-y-4">
            {/* Content */}
            <Card className="shadow-md">
              <CardContent className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{lesson.title}</h2>
                <div className="prose prose-sm max-w-none">
                  {lesson.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 text-gray-700 leading-relaxed">{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Show Exercises Button */}
            {!showExercises && lesson.exercises.length > 0 && (
              <Button 
                onClick={() => setShowExercises(true)} 
                className={`w-full h-14 bg-gradient-to-r ${phase.color} rounded-xl text-lg font-semibold shadow-lg`}
              >
                <Edit3 className="mr-2 h-5 w-5" /> Fazer Exercícios (+{lesson.xp} XP)
              </Button>
            )}

            {/* Exercises */}
            {showExercises && !lessonComplete && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-amber-800 mb-2">📝 Exercícios de Reflexão</h3>
                    <p className="text-sm text-amber-700">Responda às perguntas abaixo para completar esta lição.</p>
                  </CardContent>
                </Card>

                {lesson.exercises.map((exercise, index) => (
                  <Card key={index} className="shadow-md">
                    <CardContent className="p-4">
                      <Label className="text-gray-800 font-medium">{index + 1}. {exercise.question}</Label>
                      <Textarea
                        value={answers[index] || ''}
                        onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                        placeholder={exercise.placeholder}
                        className="mt-2 min-h-[100px]"
                      />
                    </CardContent>
                  </Card>
                ))}

                <Button 
                  onClick={completeLesson}
                  disabled={lesson.exercises.some((_, i) => !answers[i]?.trim())}
                  className={`w-full h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-lg font-semibold shadow-lg`}
                >
                  <Check className="mr-2 h-5 w-5" /> Completar Lição (+{lesson.xp} XP)
                </Button>
              </motion.div>
            )}

            {/* Lesson Complete */}
            {lessonComplete && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Lição Concluída!</h3>
                    <p className="text-green-700 mb-4">Você ganhou +{lesson.xp} XP</p>
                    <div className="flex gap-3">
                      <Button onClick={goToNextLesson} className="flex-1 bg-green-500 hover:bg-green-600">
                        {currentLesson < phase.lessons.length - 1 ? 'Próxima Lição' : 'Voltar à Jornada'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Skip for lessons without exercises */}
            {!showExercises && lesson.exercises.length === 0 && (
              <Button onClick={goToNextLesson} className={`w-full h-14 bg-gradient-to-r ${phase.color} rounded-xl font-semibold shadow-lg`}>
                Continuar <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        )}

        <BottomNav />
      </motion.div>
    );
  }

  // Phase List View
  return (
    <motion.div className="min-h-screen bg-gray-50 pb-24" {...fadeIn}>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold">📍 Sua Jornada</h1>
        <p className="text-green-100 mt-1">Do ponto A ao ponto B</p>
      </div>

      <div className="p-4 space-y-4">
        {journeyPhases.map((phase) => {
          const completedLessons = (userProgress as Record<string, number[]>)[`phase${phase.id}Lessons`] || [];
          const isComplete = completedLessons.length === phase.lessons.length && phase.lessons.length > 0;
          const isInProgress = completedLessons.length > 0;

          return (
            <Card 
              key={phase.id}
              className={`shadow-md cursor-pointer active:scale-[0.99] transition-transform ${isComplete ? 'bg-green-50 border-green-200' : ''}`}
              onClick={() => phase.lessons.length > 0 && setSelectedPhase(phase.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${phase.color} rounded-2xl flex items-center justify-center text-3xl shadow-md ${phase.lessons.length === 0 ? 'opacity-50' : ''}`}>
                    {isComplete ? '✅' : phase.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400">FASE {phase.id}</span>
                      {isInProgress && !isComplete && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Em progresso</span>
                      )}
                      {isComplete && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Completo</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-800">{phase.title}</h3>
                    <p className="text-sm text-gray-500">{phase.description}</p>
                    {phase.lessons.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={(completedLessons.length / phase.lessons.length) * 100} className="h-1.5 flex-1" />
                        <span className="text-xs text-gray-400">{completedLessons.length}/{phase.lessons.length}</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <BottomNav />
    </motion.div>
  );
}

// ============================================
// NUTRITION SCREEN - HUB DE NUTRIÇÃO
// ============================================
function NutritionScreen() {
  const { setCurrentView, setSelectedRecipe, setSelectedJuice, addFavorite, removeFavoriteByItem, isFavorite } = useAppStore();
  const [selectedTab, setSelectedTab] = useState<'receitas' | 'sucos'>('receitas');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryLabels: Record<string, string> = {
    cafe_salgado: '🍳 Café Salgado',
    cafe_doce: '🥞 Café Doce',
    principal: '🍽️ Principal',
    lanche_salgado: '🥪 Lanche Salgado',
    lanche_doce: '🍰 Lanche Doce',
  };

  const categories = [...new Set(recipesData.map(r => r.category))];
  
  const filteredRecipes = recipesData.filter(r => {
    const matchesCategory = !selectedCategory || r.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredJuices = juicesData.filter(j => {
    const matchesSearch = !searchQuery || 
      j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleRecipeFavorite = (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(recipeId, undefined)) {
      removeFavoriteByItem(recipeId, undefined);
    } else {
      addFavorite({ recipeId });
    }
  };

  const toggleJuiceFavorite = (juiceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(undefined, juiceId)) {
      removeFavoriteByItem(undefined, juiceId);
    } else {
      addFavorite({ juiceId });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'bg-green-100 text-green-700';
      case 'medio': return 'bg-yellow-100 text-yellow-700';
      case 'dificil': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div className="min-h-screen bg-gray-50 pb-24" {...fadeIn}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-b-3xl">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Utensils className="h-6 w-6" />
          Nutrição
        </h1>
        <p className="text-green-100 mt-1 text-sm">Receitas e Sucos Detox</p>
        
        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-300" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar receitas ou sucos..."
            className="pl-10 h-11 bg-white/20 border-0 text-white placeholder:text-green-200 rounded-xl"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-5 w-5 text-green-200" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="p-3 flex gap-2">
        <button 
          onClick={() => { setSelectedTab('receitas'); setSelectedCategory(null); }}
          className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${selectedTab === 'receitas' ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm'}`}
        >
          <ChefHat className="h-5 w-5" />
          Receitas ({filteredRecipes.length})
        </button>
        <button 
          onClick={() => setSelectedTab('sucos')}
          className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${selectedTab === 'sucos' ? 'bg-lime-500 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm'}`}
        >
          <GlassWater className="h-5 w-5" />
          Sucos ({filteredJuices.length})
        </button>
      </div>

      {/* Content */}
      {selectedTab === 'receitas' ? (
        <>
          {/* Categories */}
          <div className="px-3 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${!selectedCategory ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm'}`}>Todas</button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm'}`}>{categoryLabels[cat] || cat}</button>
              ))}
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="p-3 grid grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredRecipes.map((recipe, index) => {
                const isFav = isFavorite(recipe.id, undefined);
                return (
                  <motion.div
                    key={recipe.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <Card 
                      className="shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-transform bg-white border border-gray-100 hover:shadow-md" 
                      onClick={() => { setSelectedRecipe(recipe.id); setCurrentView('recipe-detail'); }}
                    >
                      <div className="h-20 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-3xl relative">
                        <span>{recipe.category.includes('cafe') ? '🥐' : recipe.category.includes('principal') ? '🍽️' : recipe.category.includes('lanche_doce') ? '🍰' : '🥪'}</span>
                        <button 
                          onClick={(e) => toggleRecipeFavorite(recipe.id, e)} 
                          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isFav ? 'bg-red-100 text-red-500' : 'bg-white/80 text-gray-400'}`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2 leading-tight mb-2">{recipe.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Flame className="h-3 w-3 text-orange-500" />
                              <span>{recipe.calories}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-blue-500" />
                              <span>{recipe.prepTime}m</span>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(recipe.difficulty || 'facil')}`}>
                            {recipe.difficulty === 'facil' ? 'Fácil' : recipe.difficulty === 'medio' ? 'Médio' : 'Difícil'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <ChefHat className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Nenhuma receita encontrada</p>
            </div>
          )}
        </>
      ) : (
        /* Juices List */
        <div className="p-3 space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredJuices.map((juice, index) => {
              const isFav = isFavorite(undefined, juice.id);
              return (
                <motion.div
                  key={juice.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card 
                    className="shadow-sm cursor-pointer active:scale-[0.99] transition-transform bg-white border border-gray-100 hover:shadow-md" 
                    onClick={() => { setSelectedJuice(juice.id); setCurrentView('juice-detail'); }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-lime-50 to-green-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🥤</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800">{juice.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">{juice.description}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <Clock className="h-3 w-3" />
                            <span>{juice.prepTime} min</span>
                            <span>•</span>
                            <span>{juice.benefits.length} benefícios</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => toggleJuiceFavorite(juice.id, e)} 
                          className={`p-2 flex-shrink-0 rounded-full transition-all ${isFav ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400'}`}
                        >
                          <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {filteredJuices.length === 0 && (
            <div className="text-center py-12">
              <GlassWater className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Nenhum suco encontrado</p>
            </div>
          )}
        </div>
      )}
      <BottomNav />
    </motion.div>
  );
}

// ============================================
// RECIPES SCREEN - DADOS LOCAIS
// ============================================
function RecipesScreen() {
  const { setCurrentView, setSelectedRecipe } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categoryLabels: Record<string, string> = {
    cafe_salgado: 'Café Salgado',
    cafe_doce: 'Café Doce',
    principal: 'Principal',
    lanche_salgado: 'Lanche Salgado',
    lanche_doce: 'Lanche Doce',
  };

  // Usar dados locais
  const recipes = recipesData.map(r => ({ ...r, isFavorite: favorites.includes(r.id) }));
  const categories = [...new Set(recipes.map(r => r.category))];
  const filteredRecipes = selectedCategory ? recipes.filter(r => r.category === selectedCategory) : recipes;

  const toggleFavorite = (recipeId: string) => {
    if (favorites.includes(recipeId)) {
      setFavorites(favorites.filter(id => id !== recipeId));
    } else {
      setFavorites([...favorites, recipeId]);
    }
  };

  return (
    <motion.div className="min-h-screen bg-gray-50 pb-24" {...fadeIn}>
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-5 rounded-b-3xl">
        <h1 className="text-2xl font-bold">Receitas Saudáveis 🍳</h1>
        <p className="text-orange-100 mt-1 text-sm">30 receitas entre 250-400 kcal</p>
      </div>
      
      {categories.length > 0 && (
        <div className="p-3 overflow-x-auto">
          <div className="flex gap-2 pb-1">
            <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${!selectedCategory ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm'}`}>Todas</button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm'}`}>{categoryLabels[cat] || cat}</button>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-3 grid grid-cols-2 gap-3">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-transform bg-white border border-gray-100" onClick={() => { setSelectedRecipe(recipe.id); setCurrentView('recipe-detail'); }}>
            <div className="h-24 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-4xl">
              {recipe.category.includes('cafe') ? '🥐' : recipe.category.includes('principal') ? '🍽️' : recipe.category.includes('lanche_doce') ? '🍰' : '🥪'}
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm line-clamp-2 leading-tight">{recipe.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{recipe.calories} kcal</span>
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }} className="p-1"><Heart className={`h-4 w-4 ${recipe.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} /></button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <BottomNav />
    </motion.div>
  );
}

// ============================================
// JUICES SCREEN - DADOS LOCAIS
// ============================================
function JuicesScreen() {
  const { setCurrentView, setSelectedJuice } = useAppStore();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Usar dados locais
  const juices = juicesData.map(j => ({ ...j, isFavorite: favorites.includes(j.id) }));

  const toggleFavorite = (juiceId: string) => {
    if (favorites.includes(juiceId)) {
      setFavorites(favorites.filter(id => id !== juiceId));
    } else {
      setFavorites([...favorites, juiceId]);
    }
  };

  return (
    <motion.div className="min-h-screen bg-gray-50 pb-24" {...fadeIn}>
      <div className="bg-gradient-to-r from-lime-400 to-lime-500 text-white p-5 rounded-b-3xl">
        <h1 className="text-2xl font-bold">Sucos Detox 🥤</h1>
        <p className="text-lime-100 mt-1 text-sm">10 receitas nutritivas</p>
      </div>
      
      <div className="p-3 space-y-3">
        {juices.map((juice) => (
          <Card key={juice.id} className="shadow-sm cursor-pointer active:scale-[0.99] transition-transform bg-white border border-gray-100" onClick={() => { setSelectedJuice(juice.id); setCurrentView('juice-detail'); }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-lime-50 to-lime-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🥤</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800">{juice.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{juice.description}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(juice.id); }} className="p-2 flex-shrink-0"><Heart className={`h-5 w-5 ${juice.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} /></button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <BottomNav />
    </motion.div>
  );
}

// ============================================
// MEAL PLAN SCREEN
// ============================================
function MealPlanScreen() {
  const { setCurrentView } = useAppStore();
  const [selectedMeal, setSelectedMeal] = useState<'cafe_manha' | 'almoco' | 'lanche_tarde' | 'jantar' | 'ceia'>('cafe_manha');
  const [showSubstitutions, setShowSubstitutions] = useState<string | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const mealOrder = ['cafe_manha', 'almoco', 'lanche_tarde', 'jantar', 'ceia'] as const;
  const currentMeal = completeMealPlan[selectedMeal];

  const nutritionalGuidelines = [
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

  return (
    <motion.div className="min-h-screen bg-gray-50 pb-24" {...fadeIn}>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-b-3xl">
        <button onClick={() => setCurrentView('dashboard')} className="flex items-center text-white/80 mb-3"><ChevronLeft className="h-5 w-5" /> Voltar</button>
        <h1 className="text-2xl font-bold">Plano Alimentar 1500 kcal 📋</h1>
        <p className="text-green-100 mt-1 text-sm">Nutricionista Natalia Cavalcante</p>
      </div>

      {/* Water Tip */}
      <div className="p-3">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💧</div>
              <div>
                <h3 className="font-semibold text-blue-800 text-sm">Antes de tudo, beba ÁGUA!</h3>
                <p className="text-xs text-blue-700 mt-1"><strong>Cálculo:</strong> Seu peso × 35 = ml de água por dia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meal Tabs */}
      <div className="p-3 overflow-x-auto">
        <div className="flex gap-2">
          {mealOrder.map((mealKey) => {
            const meal = completeMealPlan[mealKey];
            return (
              <button key={mealKey} onClick={() => setSelectedMeal(mealKey)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl whitespace-nowrap transition-all text-sm ${
                  selectedMeal === mealKey ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm'
                }`}>
                <span className="text-lg">{meal.emoji}</span>
                <span className="font-medium">{meal.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Meal Content */}
      <div className="p-3 space-y-3">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentMeal.emoji}</span>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{currentMeal.title}</h2>
                <p className="text-sm text-gray-500">{currentMeal.calories}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {currentMeal.options.map((option, optIndex) => (
          <Card key={optIndex} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm ${optIndex === 0 ? 'bg-green-500' : 'bg-orange-500'}`}>{optIndex + 1}</div>
                <h3 className="font-semibold text-gray-800">{option.name}</h3>
              </div>
              <div className="space-y-2">
                {option.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-gray-700 text-sm">{item.food}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{item.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {currentMeal.substitutions.length > 0 && (
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <button onClick={() => setShowSubstitutions(showSubstitutions === selectedMeal ? null : selectedMeal)} className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔄</span>
                  <h3 className="font-semibold text-gray-800 text-sm">Opções de Substituição</h3>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${showSubstitutions === selectedMeal ? 'rotate-90' : ''}`} />
              </button>
              {showSubstitutions === selectedMeal && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 space-y-2">
                  {currentMeal.substitutions.map((sub, subIndex) => (
                    <div key={subIndex} className="bg-gray-50 rounded-lg p-2">
                      <p className="font-medium text-gray-700 text-xs mb-1"><span className="text-green-600">Trocar:</span> {sub.original}</p>
                      <div className="flex flex-wrap gap-1">
                        {sub.options.map((opt, optIndex) => (
                          <span key={optIndex} className="px-2 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600">{opt}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Guidelines Toggle */}
      <div className="px-3">
        <Button onClick={() => setShowGuidelines(!showGuidelines)} className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm text-sm">
          <span className="mr-2">📖</span>{showGuidelines ? 'Ocultar' : 'Ver'} Orientações
        </Button>
      </div>

      {showGuidelines && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="p-3 space-y-2">
          {nutritionalGuidelines.map((guide, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{guide.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{guide.title}</h4>
                    <p className="text-xs text-gray-600">{guide.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      <div className="p-3">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
          <CardContent className="p-4 text-center">
            <p className="font-bold">Total diário: ~1500 kcal</p>
            <p className="text-green-100 text-xs mt-1">Ajuste as porções conforme sua necessidade</p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </motion.div>
  );
}

// ============================================
// WORKOUT SCREEN
// ============================================
function WorkoutScreen() {
  const { setCurrentView } = useAppStore();
  const [selectedDay, setSelectedDay] = useState<'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta'>('segunda');
  const [completedExercises, setCompletedExercises] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quebrando-ciclo-workout');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  const toggleExercise = (exerciseName: string) => {
    const newCompleted = completedExercises.includes(exerciseName)
      ? completedExercises.filter(e => e !== exerciseName)
      : [...completedExercises, exerciseName];
    setCompletedExercises(newCompleted);
    localStorage.setItem('quebrando-ciclo-workout', JSON.stringify(newCompleted));
  };

  const dayOrder = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'] as const;
  const currentWorkout = workoutPlan[selectedDay];

  return (
    <motion.div className="min-h-screen bg-gray-50 pb-24" {...fadeIn}>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-5 rounded-b-3xl">
        <button onClick={() => setCurrentView('dashboard')} className="flex items-center text-white/80 mb-3"><ChevronLeft className="h-5 w-5" /> Voltar</button>
        <h1 className="text-2xl font-bold">Ficha de Treino 💪</h1>
        <p className="text-purple-100 mt-1 text-sm">5 dias por semana</p>
      </div>

      {/* Day Selector */}
      <div className="p-3 overflow-x-auto">
        <div className="flex gap-2">
          {dayOrder.map((day) => {
            const dayLabels: Record<string, string> = { segunda: 'Seg', terca: 'Ter', quarta: 'Qua', quinta: 'Qui', sexta: 'Sex' };
            return (
              <button key={day} onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                  selectedDay === day ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm'
                }`}>
                {dayLabels[day]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Workout Header */}
      <div className="p-3">
        <Card className={`shadow-md bg-gradient-to-r ${currentWorkout.color}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-white">
              <span className="text-3xl">{currentWorkout.emoji}</span>
              <div>
                <h2 className="font-bold text-lg">{currentWorkout.title}</h2>
                <p className="text-white/80 text-sm">{currentWorkout.exercises.length} exercícios</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exercises */}
      <div className="p-3 space-y-2">
        {currentWorkout.exercises.map((exercise, index) => {
          const isComplete = completedExercises.includes(`${selectedDay}-${exercise.name}`);
          return (
            <Card 
              key={index} 
              className={`shadow-sm cursor-pointer transition-all ${isComplete ? 'bg-green-50 border-green-200' : 'bg-white'}`}
              onClick={() => toggleExercise(`${selectedDay}-${exercise.name}`)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    isComplete ? 'bg-green-500 text-white' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {isComplete ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm">{exercise.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-purple-600 font-medium">{exercise.sets}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">Descanso: {exercise.rest}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Weekly Schedule */}
      <div className="p-3">
        <Card className="bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2 text-blue-800">📅 Sugestão Semanal</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Segunda:</strong> Quadríceps</p>
              <p><strong>Terça:</strong> Costas e Bíceps</p>
              <p><strong>Quarta:</strong> Posterior</p>
              <p><strong>Quinta:</strong> Ombro e Tríceps</p>
              <p><strong>Sexta:</strong> Glúteo</p>
              <p className="text-blue-500 text-xs mt-2">Sábado/Domingo: Descanso ou caminhada leve</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </motion.div>
  );
}

// ============================================
// ACHIEVEMENTS SCREEN
// ============================================
function AchievementsScreen() {
  const { user } = useAppStore();
  const [showInfo, setShowInfo] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quebrando-ciclo-progress');
      if (saved) return JSON.parse(saved);
    }
    return {
      phase1Lessons: [],
      phase2Lessons: [],
      phase3Lessons: [],
      phase4Lessons: [],
      exerciseAnswers: {},
    };
  });

  const totalLessons = journeyPhases.reduce((acc, p) => acc + p.lessons.length, 0);
  const completedLessons = userProgress.phase1Lessons.length + userProgress.phase2Lessons.length + 
                          userProgress.phase3Lessons.length + userProgress.phase4Lessons.length;

  const achievements = [
    { emoji: '🔥', name: 'Primeira Chama', desc: 'Complete 1 dia de sequência', requirement: '1 dia', unlocked: (user?.progress?.streak || 0) >= 1 },
    { emoji: '🔥🔥', name: 'Semana Incansável', desc: 'Complete 7 dias seguidos', requirement: '7 dias', unlocked: (user?.progress?.streak || 0) >= 7 },
    { emoji: '💧', name: 'Hidratado', desc: 'Bata a meta de água 1 dia', requirement: '1 dia', unlocked: false },
    { emoji: '💧💧', name: 'Fonte de Vida', desc: 'Bata a meta de água por 7 dias', requirement: '7 dias', unlocked: false },
    { emoji: '🧠', name: 'Mente Aberta', desc: 'Complete a Fase 1', requirement: 'Fase 1', unlocked: userProgress.phase1Lessons.length >= 4 },
    { emoji: '🍽️', name: 'Consciência Alimentar', desc: 'Complete a Fase 3', requirement: 'Fase 3', unlocked: userProgress.phase3Lessons.length >= 3 },
    { emoji: '🥗', name: 'Nutricionista', desc: 'Complete a Fase 4', requirement: 'Fase 4', unlocked: userProgress.phase4Lessons.length >= 1 },
    { emoji: '🥑', name: 'Chef Saudável', desc: 'Favorite 5 receitas', requirement: '5 favoritos', unlocked: false },
    { emoji: '🏆', name: 'Ciclo Quebrado', desc: 'Complete todas as fases', requirement: '100%', unlocked: completedLessons >= totalLessons && totalLessons > 0 },
    { emoji: '📅', name: 'Consistência', desc: '30 dias de sequência', requirement: '30 dias', unlocked: (user?.progress?.streak || 0) >= 30 },
    { emoji: '⭐', name: 'Meio Caminho', desc: 'Complete 50% das lições', requirement: '50%', unlocked: completedLessons >= totalLessons / 2 },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <motion.div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24" {...fadeIn}>
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Trophy className="h-7 w-7" /> Conquistas</h1>
            <p className="text-amber-100 mt-1">{unlockedCount} de {achievements.length} desbloqueadas</p>
          </div>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>
        <Progress value={(unlockedCount / achievements.length) * 100} className="h-2 mt-3 bg-white/20" />
      </div>

      <div className="p-4 space-y-4">
        {/* How Achievements Work - Info Card */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 text-base">Como Funcionam as Conquistas?</h3>
                      <p>🏆 <strong>Conquistas</strong> são marcos de progresso na sua jornada.</p>
                      <p>📅 Complete <strong>missões diárias</strong> para ganhar XP e manter sua sequência.</p>
                      <p>🔥 <strong>Sequência (streak)</strong> conta dias consecutivos de atividade.</p>
                      <p>📚 Complete as <strong>lições das fases</strong> para desbloquear conquistas.</p>
                      <p>💧 <strong>Hidratação</strong> - bata sua meta de água diariamente.</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 pt-2 border-t border-blue-200 dark:border-blue-700 mt-2">
                        💡 Dica: A consistência é mais importante que a perfeição!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievement Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{unlockedCount}</p>
              <p className="text-xs text-green-600 dark:text-green-400">Desbloqueadas</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{user?.progress?.streak || 0}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">Dias Seguidos</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{achievements.length}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className={`shadow-md transition-all ${achievement.unlocked ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-300 dark:border-green-700' : 'bg-gray-50 dark:bg-gray-800 opacity-60'}`}>
                <CardContent className="p-4 text-center">
                  <div className={`text-3xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                    {achievement.unlocked ? achievement.emoji : '🔒'}
                  </div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{achievement.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{achievement.desc}</p>
                  <div className="mt-2">
                    {achievement.unlocked ? (
                      <span className="text-xs bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 px-2 py-0.5 rounded-full">
                        ✓ Desbloqueada!
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                        {achievement.requirement}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Motivation */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              💪 Continue sua jornada! Cada conquista desbloqueada representa um passo em direção aos seus objetivos.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </motion.div>
  );
}

// ============================================
// PROFILE SCREEN
// ============================================
function ProfileScreen() {
  const { user, logout } = useAppStore();
  const [weight, setWeight] = useState(user?.profile?.weight?.toString() || '');
  const [goalWeight, setGoalWeight] = useState(user?.profile?.goalWeight?.toString() || '');
  const [showConfetti, setShowConfetti] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quebrando-ciclo-progress');
      if (saved) return JSON.parse(saved);
    }
    return {
      phase1Lessons: [],
      phase2Lessons: [],
      phase3Lessons: [],
      phase4Lessons: [],
      exerciseAnswers: {},
    };
  });

  const motivationalMessages = [
    "Cada passo conta! Continue firme na sua jornada 💚",
    "Você está se transformando a cada dia! ✨",
    "O progresso é progresso, não importa o tamanho! 🌱",
    "Você é mais forte do que imagina! 💪",
    "Celebre essa vitória! Você merece! 🎉",
  ];

  const handleUpdateWeight = async () => {
    if (!weight) return;
    try {
      await fetch('/api/user/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-user-id': useAppStore.getState().userId || '' }, body: JSON.stringify({ weight, goalWeight }) });
      setShowConfetti(true);
      setMotivationalMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
      setTimeout(() => { setShowConfetti(false); setMotivationalMessage(''); }, 3000);
    } catch (error) { console.error('Erro:', error); }
  };

  const totalLessons = journeyPhases.reduce((acc, p) => acc + p.lessons.length, 0);
  const completedLessons = userProgress.phase1Lessons.length + userProgress.phase2Lessons.length + 
                          userProgress.phase3Lessons.length + userProgress.phase4Lessons.length;

  return (
    <motion.div className="min-h-screen bg-gray-50 pb-24" {...fadeIn}>
      <Confetti show={showConfetti} />
      
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">👤</div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-green-100">Nível {user?.progress?.level || 1}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div><p className="text-2xl font-bold">{user?.progress?.xp || 0}</p><p className="text-xs text-green-100">XP Total</p></div>
          <div><p className="text-2xl font-bold">🔥 {user?.progress?.streak || 0}</p><p className="text-xs text-green-100">Sequência</p></div>
          <div><p className="text-2xl font-bold">{completedLessons}/{totalLessons}</p><p className="text-xs text-green-100">Lições</p></div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {motivationalMessage && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-xl text-center">
            <p className="font-medium">{motivationalMessage}</p>
          </motion.div>
        )}

        <Card className="shadow-md">
          <CardContent className="p-4 space-y-4">
            <div>
              <Label>Peso Atual (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Seu peso" className="mt-1" />
            </div>
            <div>
              <Label>Meta de Peso (kg)</Label>
              <Input type="number" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} placeholder="Sua meta" className="mt-1" />
            </div>
            <Button onClick={handleUpdateWeight} className="w-full bg-green-500 hover:bg-green-600">Atualizar Peso</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Progresso das Fases</h3>
            <div className="space-y-3">
              {journeyPhases.map((phase, i) => {
                const completed = (userProgress as Record<string, number[]>)[`phase${phase.id}Lessons`] || [];
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{phase.emoji} {phase.title}</span>
                      <span className="text-gray-500">{completed.length}/{phase.lessons.length}</span>
                    </div>
                    <Progress value={phase.lessons.length > 0 ? (completed.length / phase.lessons.length) * 100 : 0} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={() => logout()} variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50">Sair da Conta</Button>
      </div>
      <BottomNav />
    </motion.div>
  );
}

// ============================================
// RECIPE DETAIL SCREEN
// ============================================
function RecipeDetailScreen() {
  const { selectedRecipe, setCurrentView, addFavorite, removeFavoriteByItem, isFavorite } = useAppStore();
  const recipe = recipesData.find(r => r.id === selectedRecipe);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Receita não encontrada</p>
          <Button onClick={() => setCurrentView('nutrition')} className="mt-4">Voltar</Button>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(recipe.id, undefined);
  const categoryLabels: Record<string, string> = {
    cafe_salgado: '🍳 Café Salgado',
    cafe_doce: '🥞 Café Doce',
    principal: '🍽️ Principal',
    lanche_salgado: '🥪 Lanche Salgado',
    lanche_doce: '🍰 Lanche Doce',
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'bg-green-100 text-green-700 border-green-200';
      case 'medio': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'dificil': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavoriteByItem(recipe.id, undefined);
    } else {
      addFavorite({ recipeId: recipe.id });
    }
  };

  return (
    <motion.div className="min-h-screen bg-gray-50 pb-6" {...fadeIn}>
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-100 to-amber-100 pt-4 pb-20 relative">
        <button 
          onClick={() => setCurrentView('nutrition')} 
          className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-sm z-10"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex items-center justify-center pt-8">
          <span className="text-6xl">
            {recipe.category.includes('cafe') ? '🥐' : recipe.category.includes('principal') ? '🍽️' : recipe.category.includes('lanche_doce') ? '🍰' : '🥪'}
          </span>
        </div>
      </div>

      <div className="px-4 -mt-12 space-y-4">
        {/* Main Info Card */}
        <Card className="shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                    {categoryLabels[recipe.category] || recipe.category}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getDifficultyColor(recipe.difficulty || 'facil')}`}>
                    {recipe.difficulty === 'facil' ? 'Fácil' : recipe.difficulty === 'medio' ? 'Médio' : 'Difícil'}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">{recipe.name}</h1>
                {recipe.description && <p className="text-gray-600 text-sm mt-2">{recipe.description}</p>}
              </div>
              <button
                onClick={handleToggleFavorite}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFav ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'}`}
              >
                <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Nutritional Info */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-3 text-center">
              <Flame className="h-5 w-5 mx-auto text-orange-500 mb-1" />
              <p className="text-lg font-bold text-orange-600">{recipe.calories}</p>
              <p className="text-xs text-gray-500">kcal</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-3 text-center">
              <Clock className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <p className="text-lg font-bold text-blue-600">{recipe.prepTime}</p>
              <p className="text-xs text-gray-500">minutos</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-3 text-center">
              <Utensils className="h-5 w-5 mx-auto text-green-500 mb-1" />
              <p className="text-lg font-bold text-green-600">{recipe.servings}</p>
              <p className="text-xs text-gray-500">porções</p>
            </CardContent>
          </Card>
        </div>

        {/* Ingredients */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg">🥗</span>
              Ingredientes
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">👨‍🍳</span>
              Modo de Preparo
            </h2>
            <ol className="space-y-3">
              {recipe.instructions.map((inst, i) => (
                <li key={i} className="flex gap-3 text-gray-600 text-sm">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{inst}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Tips */}
        {recipe.tips && (
          <Card className="shadow-md bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2 flex items-center gap-2 text-amber-800">
                <span>💡</span> Dica
              </h2>
              <p className="text-sm text-amber-700">{recipe.tips}</p>
            </CardContent>
          </Card>
        )}

        {/* Favorite Button */}
        <Button
          onClick={handleToggleFavorite}
          className={`w-full h-12 rounded-xl font-semibold ${isFav ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
        >
          <Heart className={`h-5 w-5 mr-2 ${isFav ? 'fill-current' : ''}`} />
          {isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Button>
      </div>
    </motion.div>
  );
}

// ============================================
// JUICE DETAIL SCREEN
// ============================================
function JuiceDetailScreen() {
  const { selectedJuice, setCurrentView, addFavorite, removeFavoriteByItem, isFavorite } = useAppStore();
  const juice = juicesData.find(j => j.id === selectedJuice);

  if (!juice) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <GlassWater className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Suco não encontrado</p>
          <Button onClick={() => setCurrentView('nutrition')} className="mt-4">Voltar</Button>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(undefined, juice.id);

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavoriteByItem(undefined, juice.id);
    } else {
      addFavorite({ juiceId: juice.id });
    }
  };

  return (
    <motion.div className="min-h-screen bg-gray-50 pb-6" {...fadeIn}>
      {/* Header */}
      <div className="bg-gradient-to-br from-lime-100 to-green-100 pt-4 pb-20 relative">
        <button 
          onClick={() => setCurrentView('nutrition')} 
          className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-sm z-10"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex items-center justify-center pt-8">
          <span className="text-6xl">🥤</span>
        </div>
      </div>

      <div className="px-4 -mt-12 space-y-4">
        {/* Main Info Card */}
        <Card className="shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-xs bg-lime-100 text-lime-700 px-2 py-0.5 rounded-full">
                  ✨ Detox
                </span>
                <h1 className="text-xl font-bold text-gray-800 mt-2">{juice.name}</h1>
                {juice.description && <p className="text-gray-600 text-sm mt-2">{juice.description}</p>}
              </div>
              <button
                onClick={handleToggleFavorite}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFav ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'}`}
              >
                <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Prep Time */}
        <div className="flex justify-center">
          <Card className="bg-lime-50 border-lime-100">
            <CardContent className="p-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-lime-600" />
              <span className="font-semibold text-lime-700">{juice.prepTime} minutos</span>
              <span className="text-lime-600">de preparo</span>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <Card className="shadow-md bg-lime-50 border-lime-100">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2 text-lime-800">
              <span className="w-8 h-8 bg-lime-200 rounded-lg flex items-center justify-center text-lg">✨</span>
              Benefícios
            </h2>
            <ul className="space-y-2">
              {juice.benefits.map((ben, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-lime-500 mt-0.5">✓</span>
                  {ben}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-lg">🥬</span>
              Ingredientes
            </h2>
            <ul className="space-y-2">
              {juice.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">🧉</span>
              Modo de Preparo
            </h2>
            <ol className="space-y-3">
              {juice.instructions.map((inst, i) => (
                <li key={i} className="flex gap-3 text-gray-600 text-sm">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{inst}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Tip */}
        <Card className="shadow-md bg-lime-50 border-lime-200">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2 flex items-center gap-2 text-lime-800">
              <span>💡</span> Dica
            </h2>
            <p className="text-sm text-lime-700">
              Beba imediatamente após o preparo para aproveitar todos os nutrientes. Sucos detox são melhores consumidos em jejum ou entre refeições.
            </p>
          </CardContent>
        </Card>

        {/* Favorite Button */}
        <Button
          onClick={handleToggleFavorite}
          className={`w-full h-12 rounded-xl font-semibold ${isFav ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white`}
        >
          <Heart className={`h-5 w-5 mr-2 ${isFav ? 'fill-current' : ''}`} />
          {isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Button>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN APP
// ============================================
export default function QuebrandoCicloApp() {
  const { currentView, isLoggedIn } = useAppStore();

  if (!isLoggedIn) return <LandingPage />;

  switch (currentView) {
    case 'dashboard': return <Dashboard />;
    case 'phases': return <PhasesScreen />;
    case 'nutrition': return <NutritionScreen />;
    case 'recipes': return <RecipesScreen />;
    case 'recipe-detail': return <RecipeDetailScreen />;
    case 'juices': return <JuicesScreen />;
    case 'juice-detail': return <JuiceDetailScreen />;
    case 'mealplan': return <MealPlanScreen />;
    case 'workout': return <WorkoutScreen />;
    case 'achievements': return <AchievementsScreen />;
    case 'profile': return <ProfileScreen />;
    default: return <Dashboard />;
  }
}
