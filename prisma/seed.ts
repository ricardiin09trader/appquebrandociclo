import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // ============================================
  // FASES
  // ============================================
  console.log("📦 Criando fases...");
  
  const phases = await Promise.all([
    prisma.phase.upsert({
      where: { number: 1 },
      update: {},
      create: {
        number: 1,
        title: "Mentalidade",
        emoji: "🧠",
        description: "Prepare sua mente para a transformação. Quebre crenças limitantes e desenvolva uma mentalidade vencedora.",
        color: "#9333EA",
      },
    }),
    prisma.phase.upsert({
      where: { number: 2 },
      update: {},
      create: {
        number: 2,
        title: "Hidratação",
        emoji: "💧",
        description: "Descubra a importância da água para seu corpo e mente. Estabeleça o hábito de se hidratar corretamente.",
        color: "#3B82F6",
      },
    }),
    prisma.phase.upsert({
      where: { number: 3 },
      update: {},
      create: {
        number: 3,
        title: "Plano Alimentar",
        emoji: "🥗",
        description: "Conheça seu plano personalizado de 1500kcal e aprenda a se alimentar de forma saudável e prazerosa.",
        color: "#22C55E",
      },
    }),
    prisma.phase.upsert({
      where: { number: 4 },
      update: {},
      create: {
        number: 4,
        title: "Receitas Saudáveis",
        emoji: "🍳",
        description: "Explore 30 receitas deliciosas entre 250-400kcal. Cozinha saudável pode ser incrível!",
        color: "#F97316",
      },
    }),
    prisma.phase.upsert({
      where: { number: 5 },
      update: {},
      create: {
        number: 5,
        title: "Sucos Detox",
        emoji: "🥤",
        description: "Aprenda receitas de sucos desintoxicantes para acelerar seu metabolismo e nutrir seu corpo.",
        color: "#84CC16",
      },
    }),
  ]);

  console.log(`✅ ${phases.length} fases criadas`);

  // ============================================
  // CONTEÚDO DAS FASES
  // ============================================
  console.log("📚 Criando conteúdo das fases...");

  // FASE 1 - Mentalidade
  const phase1Content = [
    {
      phaseId: phases[0].id,
      order: 1,
      title: "Bem-vinda à sua jornada! ✨",
      content: `<div class="space-y-4">
        <p class="text-lg">Você não está de dieta. Você está <strong>quebrando um ciclo</strong>.</p>
        <p>Esse ciclo que te prendeu por anos, que te fez perder e ganhar peso infinitas vezes, que te fez se sentir culpada por comer um chocolate, que te fez acreditar que você não consegue...</p>
        <p class="text-primary font-semibold">Esse ciclo está chegando ao fim. Aqui. Agora.</p>
        <p>Não vamos falar só de emagrecimento. Vamos falar sobre <strong>você</strong>. Sobre o que te levou até aqui, sobre as crenças que carrega, sobre os padrões que repete sem perceber.</p>
      </div>`,
      type: "text",
    },
    {
      phaseId: phases[0].id,
      order: 2,
      title: "O que é Comer Emocional? 🍽️",
      content: `<div class="space-y-4">
        <p>O comer emocional está presente em nossas vidas por um simples motivo: somos seres humanos!</p>
        <p>Enquanto vivermos, teremos que lidar com nossas emoções e, em algumas ocasiões, a comida estará presente nesse processo.</p>
        <p>Comer faz parte das nossas comemorações (aniversários, casamentos, saídas com os amigos) e nos traz sensações boas.</p>
        <p>Às vezes, comemos também por estarmos tristes e, até certo ponto, isso é perfeitamente normal.</p>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
          <p class="font-semibold">A grande questão:</p>
          <p>O comer emocional é problema quando a comida se torna a resposta pra <strong>tudo</strong>: tédio, tristeza, alegria, raiva, ansiedade... e acontece numa frequência alta, quase que diária.</p>
        </div>
      </div>`,
      type: "text",
    },
    {
      phaseId: phases[0].id,
      order: 3,
      title: "Identificando Emoções e Gatilhos 🔍",
      content: `<div class="space-y-4">
        <p>Primeiro, se faz necessária a tomada de consciência dos sentimentos associados ao comer.</p>
        <div class="bg-green-50 p-4 rounded-lg">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Emoção/Sentimento</th>
                <th class="text-left py-2">Resposta Comum</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td>😟 Ansiedade</td><td>Usar comida para acalmar</td></tr>
              <tr class="border-b"><td>😐 Tédio</td><td>Comer para fazer alguma coisa</td></tr>
              <tr class="border-b"><td>😤 Estresse</td><td>Comer para ter alívio</td></tr>
              <tr class="border-b"><td>🎁 Suborno</td><td>"Acabe a tarefa e ganha algo"</td></tr>
              <tr class="border-b"><td>🕳️ Vazio</td><td>Comer por falta de sentido</td></tr>
              <tr class="border-b"><td>🎉 Excitação</td><td>Comer como diversão</td></tr>
              <tr class="border-b"><td>😢 Solidão</td><td>Usar comida como companhia</td></tr>
              <tr class="border-b"><td>😠 Frustração/Raiva</td><td>Comer como catarse</td></tr>
              <tr class="border-b"><td>😭 Tristeza</td><td>Usar comida como consolo</td></tr>
              <tr><td>🏆 Prêmio</td><td>"Eu mereço"</td></tr>
            </tbody>
          </table>
        </div>
      </div>`,
      type: "text",
    },
    {
      phaseId: phases[0].id,
      order: 4,
      title: "Exercício de Autoconhecimento 📝",
      content: `<div class="space-y-4">
        <p>Ao final do dia, registre todos os sentimentos envolvidos nas diversas situações vivenciadas pela manhã, tarde e noite.</p>
        <p>Depois, identifique qual comportamento foi associado a cada sentimento:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Você foi imediatamente comer?</li>
          <li>Assistiu uma série?</li>
          <li>Fez uma pausa?</li>
        </ul>
        <div class="bg-blue-50 p-4 rounded-lg mt-4">
          <p class="italic">Nos primeiros dias será um exercício difícil, mas com a prática, passará a ser algo natural e você ficará mais consciente das suas emoções.</p>
        </div>
      </div>`,
      type: "exercise",
      isExercise: true,
      exerciseQuestion: "Pense: Se você identificou que recorre frequentemente à comida quando se sente ansioso(a), que ação diferente você poderia realizar? (Ex: tomar banho relaxante, assistir série, ouvir música, ligar para um amigo)",
    },
    {
      phaseId: phases[0].id,
      order: 5,
      title: "Comportamentos Alternativos 💡",
      content: `<div class="space-y-4">
        <p>Aqui estão algumas formas de lidar com os sentimentos sem recorrer à comida:</p>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="bg-purple-50 p-3 rounded-lg">
            <p class="font-semibold">😰 Ansiedade</p>
            <p class="text-sm">Respiração profunda, meditação, caminhada</p>
          </div>
          <div class="bg-blue-50 p-3 rounded-lg">
            <p class="font-semibold">😐 Tédio</p>
            <p class="text-sm">Ler, aprender algo novo, hobby criativo</p>
          </div>
          <div class="bg-red-50 p-3 rounded-lg">
            <p class="font-semibold">😤 Estresse</p>
            <p class="text-sm">Exercício, banho relaxante, música calma</p>
          </div>
          <div class="bg-yellow-50 p-3 rounded-lg">
            <p class="font-semibold">😢 Tristeza</p>
            <p class="text-sm">Conversar com amigo, escrever, chorar (liberar)</p>
          </div>
          <div class="bg-orange-50 p-3 rounded-lg">
            <p class="font-semibold">😠 Raiva</p>
            <p class="text-sm">Exercício físico, escrever, bater almofada</p>
          </div>
          <div class="bg-green-50 p-3 rounded-lg">
            <p class="font-semibold">🕳️ Vazio</p>
            <p class="text-sm">Meditação, voluntariado, propósito espiritual</p>
          </div>
        </div>
      </div>`,
      type: "tip",
    },
    {
      phaseId: phases[0].id,
      order: 6,
      title: "Crenças Limitantes 🧩",
      content: `<div class="space-y-4">
        <p>Crenças limitantes são pensamentos que acreditamos ser verdades absolutas, mas que na verdade nos impedem de crescer e alcançar nossos objetivos.</p>
        <div class="bg-red-50 p-4 rounded-lg">
          <p class="font-semibold mb-2">Crenças comuns sobre emagrecimento:</p>
          <ul class="list-disc pl-6 space-y-1">
            <li>"Eu não consigo emagrecer"</li>
            <li>"É muito difícil para mim"</li>
            <li>"Vou passar fome"</li>
            <li>"Vou sofrer para sempre"</li>
            <li>"Não tenho tempo"</li>
            <li>"Comida saudável é cara"</li>
          </ul>
        </div>
        <div class="bg-green-50 p-4 rounded-lg mt-4">
          <p class="font-semibold mb-2">Transformando crenças:</p>
          <ul class="list-disc pl-6 space-y-1">
            <li>"Eu não consigo" → "Estou aprendendo a conseguir"</li>
            <li>"É muito difícil" → "Vou fazer um passo de cada vez"</li>
            <li>"Vou passar fome" → "Vou me nutrir de forma saudável"</li>
          </ul>
        </div>
      </div>`,
      type: "text",
    },
    {
      phaseId: phases[0].id,
      order: 7,
      title: "🌟 Mensagem Final da Fase 1",
      content: `<div class="space-y-4 text-center">
        <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
          <p class="text-xl font-semibold mb-4">"Você não está quebrada. Você está descobrindo quem realmente é."</p>
          <p>Você completou a primeira fase! Sua mente está pronta para a transformação.</p>
          <p class="mt-4 text-lg">🎁 <strong>+50 XP conquistados!</strong></p>
        </div>
        <p class="text-sm text-muted-foreground">Próxima fase: Hidratação 💧</p>
      </div>`,
      type: "text",
    },
  ];

  for (const content of phase1Content) {
    await prisma.phaseContent.create({
      data: content,
    });
  }

  console.log(`✅ Conteúdo da Fase 1 criado`);

  // ============================================
  // RECEITAS
  // ============================================
  console.log("🍳 Criando receitas...");

  const recipes = [
    // CAFÉ DA MANHÃ SALGADO
    {
      name: "Torrada de Cream Cheese com Salmão Defumado",
      description: "Uma torrada elegante e nutritiva para começar o dia com proteínas de qualidade.",
      category: "cafe_salgado",
      calories: 320,
      prepTime: 5,
      servings: 1,
      ingredients: JSON.stringify([
        "1 fatia de pão integral",
        "1 colher de sopa de cream cheese light",
        "30g de salmão defumado",
        "Alcaparras a gosto",
        "Endro (dill) fresco para decorar (opcional)"
      ]),
      instructions: JSON.stringify([
        "Espalhe o cream cheese na fatia de pão integral.",
        "Coloque as fatias de salmão defumado sobre o cream cheese.",
        "Adicione alcaparras a gosto.",
        "Se desejar, decore com folhas de endro fresco."
      ]),
      tips: "Rica em ômega-3 e proteínas de alta qualidade.",
    },
    {
      name: "Omelete de Frango e Cenoura",
      description: "Omelete proteica com frango desfiado e cenoura ralada.",
      category: "cafe_salgado",
      calories: 280,
      prepTime: 10,
      servings: 1,
      ingredients: JSON.stringify([
        "2 ovos",
        "50g de peito de frango cozido e desfiado",
        "1/4 de cenoura ralada",
        "Sal e pimenta a gosto",
        "Ervas frescas a gosto (salsa, cebolinha, coentro)"
      ]),
      instructions: JSON.stringify([
        "Bata os ovos em uma tigela e misture o frango desfiado e a cenoura ralada.",
        "Tempere com sal, pimenta e ervas frescas.",
        "Aqueça uma frigideira antiaderente e despeje a mistura.",
        "Cozinhe até que a omelete esteja firme dos dois lados."
      ]),
      tips: "Ótima opção para usar sobras de frango.",
    },
    {
      name: "Torrada de Ricota e Tomate",
      description: "Torrada leve com ricota cremosa e tomate fresco.",
      category: "cafe_salgado",
      calories: 250,
      prepTime: 5,
      servings: 1,
      ingredients: JSON.stringify([
        "1 fatia de pão integral",
        "2 colheres de sopa de ricota",
        "Tomate fatiado",
        "Manjericão fresco para decorar",
        "Sal e pimenta a gosto"
      ]),
      instructions: JSON.stringify([
        "Espalhe a ricota na fatia de pão integral.",
        "Adicione as fatias de tomate por cima.",
        "Tempere com sal e pimenta a gosto.",
        "Decore com folhas de manjericão fresco."
      ]),
      tips: "Rica em cálcio e licopeno.",
    },
    {
      name: "Omelete de Espinafre e Mussarela",
      description: "Omelete verde nutritiva com queijo derretido.",
      category: "cafe_salgado",
      calories: 300,
      prepTime: 8,
      servings: 1,
      ingredients: JSON.stringify([
        "2 ovos",
        "1 xícara de espinafre picado",
        "30g de queijo mussarela ralado",
        "Sal e pimenta a gosto"
      ]),
      instructions: JSON.stringify([
        "Bata os ovos, adicione o espinafre e queijo mussarela ralado.",
        "Tempere com sal e pimenta.",
        "Cozinhe em fogo médio até ficar firme."
      ]),
      tips: "O espinafre é rico em ferro e vitaminas.",
    },
    {
      name: "Torrada de Abacate com Ovo Mexido",
      description: "Combinação perfeita de gorduras boas e proteínas.",
      category: "cafe_salgado",
      calories: 350,
      prepTime: 10,
      servings: 1,
      ingredients: JSON.stringify([
        "1 fatia de pão integral",
        "1/2 abacate maduro",
        "1 ovo",
        "Sal e pimenta a gosto"
      ]),
      instructions: JSON.stringify([
        "Amasse o abacate em uma tigela e tempere com sal e pimenta.",
        "Prepare um ovo mexido.",
        "Coloque o abacate amassado sobre a fatia de pão integral.",
        "Adicione o ovo mexido por cima."
      ]),
      tips: "O abacate é rico em gorduras saudáveis para o coração.",
    },
    // CAFÉ DA MANHÃ DOCE
    {
      name: "Mingau de Aveia com Morangos",
      description: "Mingau cremoso e reconfortante com frutas frescas.",
      category: "cafe_doce",
      calories: 280,
      prepTime: 5,
      servings: 1,
      ingredients: JSON.stringify([
        "1/2 xícara de aveia",
        "1 xícara de leite de amêndoas",
        "Morangos fatiados",
        "Mel a gosto"
      ]),
      instructions: JSON.stringify([
        "Cozinhe a aveia no leite de amêndoas.",
        "Adicione os morangos e um fio de mel."
      ]),
      tips: "Rica em fibras e antioxidantes.",
    },
    {
      name: "Smoothie de Banana e Amêndoas",
      description: "Vitamina cremosa e energética para manhãs corridas.",
      category: "cafe_doce",
      calories: 300,
      prepTime: 3,
      servings: 1,
      ingredients: JSON.stringify([
        "1 banana madura",
        "200ml de leite de amêndoas",
        "10g de amêndoas picadas",
        "Canela a gosto"
      ]),
      instructions: JSON.stringify([
        "Bata a banana com leite de amêndoas, amêndoas e canela no liquidificador."
      ]),
      tips: "Ótima opção pré-treino.",
    },
    {
      name: "Panquecas de Chocolate e Banana",
      description: "Panquecas saudáveis sem farinha refinada.",
      category: "cafe_doce",
      calories: 320,
      prepTime: 10,
      servings: 1,
      ingredients: JSON.stringify([
        "1 banana madura",
        "2 ovos",
        "1 colher de sopa de cacau em pó",
        "Mel a gosto"
      ]),
      instructions: JSON.stringify([
        "Amasse a banana, misture com ovos e cacau em pó.",
        "Cozinhe como panquecas em frigideira antiaderente.",
        "Regue com mel."
      ]),
      tips: "Sem glúten e rica em proteínas.",
    },
    {
      name: "Iogurte de Coco com Manga",
      description: "Tigela tropical refrescante e cremosa.",
      category: "cafe_doce",
      calories: 270,
      prepTime: 3,
      servings: 1,
      ingredients: JSON.stringify([
        "150g de iogurte de coco",
        "1/2 manga picada",
        "Coco ralado a gosto",
        "Mel a gosto"
      ]),
      instructions: JSON.stringify([
        "Misture o iogurte de coco com manga, coco ralado e mel."
      ]),
      tips: "Rica em probióticos e vitaminas.",
    },
    {
      name: "Waffle de Maçã e Canela",
      description: "Waffle saudável com sabor de casa de vó.",
      category: "cafe_doce",
      calories: 260,
      prepTime: 8,
      servings: 1,
      ingredients: JSON.stringify([
        "1 maçã ralada",
        "1 ovo",
        "2 colheres de sopa de farinha de aveia",
        "1/2 colher de chá de canela"
      ]),
      instructions: JSON.stringify([
        "Misture a maçã ralada, ovo, farinha de aveia e canela.",
        "Cozinhe em uma waffleira ou frigideira."
      ]),
      tips: "Pode congelar para consumir depois.",
    },
    // PRATOS PRINCIPAIS
    {
      name: "Frango Grelhado com Brócolis e Quinoa",
      description: "Refeição completa e balanceada para almoço ou jantar.",
      category: "principal",
      calories: 380,
      prepTime: 25,
      servings: 1,
      ingredients: JSON.stringify([
        "Peito de frango grelhado temperado a gosto (100g)",
        "1 xícara de brócolis cozido no vapor (100g)",
        "1/2 xícara de quinoa cozida (150g)"
      ]),
      instructions: JSON.stringify([
        "Grelhe o frango com temperos de sua preferência.",
        "Cozinhe o brócolis no vapor.",
        "Prepare a quinoa conforme instruções da embalagem.",
        "Sirva o frango com os legumes e a quinoa."
      ]),
      tips: "Quinoa é um grão rico em proteínas completas.",
    },
    {
      name: "Salmão ao Limão com Espargos e Couve",
      description: "Refeição gourmet rica em ômega-3.",
      category: "principal",
      calories: 350,
      prepTime: 20,
      servings: 1,
      ingredients: JSON.stringify([
        "Filé de salmão (100g)",
        "Espargos grelhados (100g)",
        "Folhas de couve refogadas (100g)",
        "Suco de limão"
      ]),
      instructions: JSON.stringify([
        "Cozinhe o salmão no suco de limão.",
        "Grelhe os espargos.",
        "Refogue a couve.",
        "Sirva como prato principal."
      ]),
      tips: "Salmão é excelente para saúde cardiovascular.",
    },
    {
      name: "Carne Magra com Abóbora e Brócolis",
      description: "Refeição nutritiva com carboidratos complexos.",
      category: "principal",
      calories: 370,
      prepTime: 25,
      servings: 1,
      ingredients: JSON.stringify([
        "Carne magra grelhada (110g)",
        "Abóbora cozida e amassada (150g)",
        "Brócolis cozidos no vapor (100g)"
      ]),
      instructions: JSON.stringify([
        "Grelhe a carne magra.",
        "Cozinhe a abóbora e amasse.",
        "Cozinhe os brócolis no vapor.",
        "Sirva a carne sobre a abóbora com os brócolis ao lado."
      ]),
      tips: "Abóbora é rica em vitamina A e fibras.",
    },
    {
      name: "Frango ao Curry com Vegetais",
      description: "Prato aromático e saboroso com especiarias.",
      category: "principal",
      calories: 360,
      prepTime: 20,
      servings: 1,
      ingredients: JSON.stringify([
        "Peito de frango ao curry (100g)",
        "Legumes (cenoura, abobrinha, pimentão) refogados",
        "Arroz integral (100g)"
      ]),
      instructions: JSON.stringify([
        "Prepare o frango ao curry.",
        "Refogue os legumes.",
        "Cozinhe o arroz integral.",
        "Sirva como uma refeição completa."
      ]),
      tips: "Curry tem propriedades anti-inflamatórias.",
    },
    {
      name: "Tilápia Grelhada com Abobrinha e Arroz",
      description: "Peixe branco leve com acompanhamentos saudáveis.",
      category: "principal",
      calories: 340,
      prepTime: 20,
      servings: 1,
      ingredients: JSON.stringify([
        "Filé de tilápia (100g)",
        "Abobrinha grelhada (100g)",
        "Arroz integral cozido (150g)"
      ]),
      instructions: JSON.stringify([
        "Grelhe a tilápia e a abobrinha.",
        "Cozinhe o arroz integral.",
        "Sirva os três componentes no prato."
      ]),
      tips: "Tilápia é um peixe magro e versátil.",
    },
    // LANCHES DOCES
    {
      name: "Iogurte com Frutas e Mel",
      description: "Lanche rápido e nutritivo.",
      category: "lanche_doce",
      calories: 250,
      prepTime: 3,
      servings: 1,
      ingredients: JSON.stringify([
        "150g de iogurte grego light",
        "1/2 xícara de morangos ou outras frutas frescas",
        "1 colher de chá de mel"
      ]),
      instructions: JSON.stringify([
        "Misture o iogurte com as frutas picadas.",
        "Regue com mel."
      ]),
      tips: "Iogurte grego tem mais proteínas que o tradicional.",
    },
    {
      name: "Pão de Banana com Pasta de Amendoim",
      description: "Lanche energético e saciante.",
      category: "lanche_doce",
      calories: 320,
      prepTime: 3,
      servings: 1,
      ingredients: JSON.stringify([
        "1 banana",
        "1 colher de sopa de pasta de amendoim",
        "2 fatias de pão integral"
      ]),
      instructions: JSON.stringify([
        "Corte a banana em rodelas.",
        "Espalhe a pasta de amendoim sobre as fatias de pão.",
        "Adicione as rodelas de banana."
      ]),
      tips: "Pasta de amendoim natural é mais saudável.",
    },
    {
      name: "Muffin de Banana e Aveia",
      description: "Muffin saudável para lanches.",
      category: "lanche_doce",
      calories: 280,
      prepTime: 25,
      servings: 2,
      ingredients: JSON.stringify([
        "1 banana madura",
        "1 ovo",
        "1/2 xícara de aveia",
        "1 colher de chá de canela"
      ]),
      instructions: JSON.stringify([
        "Amasse a banana, misture com o ovo, a aveia e a canela.",
        "Asse a massa em forminhas de muffin até dourar (180°C por 15-20 min)."
      ]),
      tips: "Pode congelar para consumir durante a semana.",
    },
    // LANCHES SALGADOS
    {
      name: "Torrada de Creme de Ricota com Espinafre",
      description: "Lanche salgado nutritivo.",
      category: "lanche_salgado",
      calories: 260,
      prepTime: 5,
      servings: 1,
      ingredients: JSON.stringify([
        "1 fatia de pão integral",
        "2 colheres de sopa de creme de ricota light",
        "1/2 xícara de espinafre cozido e picado",
        "Sal e pimenta a gosto"
      ]),
      instructions: JSON.stringify([
        "Espalhe o creme de ricota sobre a fatia de pão.",
        "Cubra com o espinafre cozido e picado.",
        "Tempere com sal e pimenta."
      ]),
      tips: "Espinafre é rico em ferro e vitaminas.",
    },
    {
      name: "Rolinhos de Queijo e Presunto",
      description: "Lanche prático para levar.",
      category: "lanche_salgado",
      calories: 280,
      prepTime: 5,
      servings: 1,
      ingredients: JSON.stringify([
        "2 fatias de queijo magro",
        "2 fatias de presunto magro",
        "Tiras de pepino e cenoura",
        "Folhas de alface"
      ]),
      instructions: JSON.stringify([
        "Coloque as fatias de queijo e presunto.",
        "Adicione as tiras de pepino, cenoura e alface.",
        "Enrole todos os ingredientes em forma de rolinhos."
      ]),
      tips: "Ótimo para levar na marmita.",
    },
    {
      name: "Wrap de Frango e Alface",
      description: "Wrap prático e proteico.",
      category: "lanche_salgado",
      calories: 300,
      prepTime: 5,
      servings: 1,
      ingredients: JSON.stringify([
        "100g de peito de frango grelhado desfiado",
        "Folhas de alface",
        "1 wrap integral"
      ]),
      instructions: JSON.stringify([
        "Monte o wrap com o frango e as folhas de alface.",
        "Enrole e sirva."
      ]),
      tips: "Adicione molho de iogurte se desejar.",
    },
    {
      name: "Bolinhos de Atum com Aveia",
      description: "Bolinhos proteicos assados.",
      category: "lanche_salgado",
      calories: 320,
      prepTime: 25,
      servings: 2,
      ingredients: JSON.stringify([
        "1 lata de atum em água, escorrido",
        "1/2 xícara de aveia em flocos",
        "1 ovo",
        "1 colher de sopa de mostarda",
        "Salsinha picada a gosto"
      ]),
      instructions: JSON.stringify([
        "Misture o atum, aveia, ovo, mostarda e salsinha.",
        "Forme pequenos bolinhos.",
        "Asse por 15-20 minutos a 180°C até dourar."
      ]),
      tips: "Pode congelar para consumir depois.",
    },
    // VEGETARIANAS
    {
      name: "Tofu Grelhado com Legumes",
      description: "Refeição vegetariana rica em proteínas.",
      category: "vegetariana",
      calories: 350,
      prepTime: 15,
      servings: 1,
      ingredients: JSON.stringify([
        "200g de tofu firme, cortado em cubos",
        "1 abobrinha média fatiada",
        "1 pimentão vermelho em tiras",
        "1 cenoura em rodelas",
        "Molho de soja e azeite"
      ]),
      instructions: JSON.stringify([
        "Tempere o tofu com molho de soja e azeite.",
        "Grelhe o tofu até dourar.",
        "Grelhe também os legumes.",
        "Sirva o tofu com os legumes grelhados."
      ]),
      tips: "Tofu absorve bem os temperos.",
    },
    {
      name: "Wrap Vegetariano com Hummus",
      description: "Wrap leve e saboroso.",
      category: "vegetariana",
      calories: 300,
      prepTime: 5,
      servings: 1,
      ingredients: JSON.stringify([
        "1 tortilha de trigo integral",
        "1/4 de xícara de hummus",
        "1/2 xícara de espinafre fresco",
        "Fatias de pepino e tomate",
        "Cebola roxa fatiada"
      ]),
      instructions: JSON.stringify([
        "Aqueça a tortilha.",
        "Espalhe o hummus.",
        "Adicione os vegetais.",
        "Enrole e sirva."
      ]),
      tips: "Hummus é rico em proteínas vegetais.",
    },
    // PROTEÍNAS MAGRAS
    {
      name: "Peito de Peru Grelhado com Aspargos",
      description: "Refeição magra e elegante.",
      category: "proteina",
      calories: 350,
      prepTime: 20,
      servings: 1,
      ingredients: JSON.stringify([
        "2 peitos de peru (150g)",
        "1 maço de aspargos frescos",
        "Suco de 1 limão",
        "Azeite de oliva"
      ]),
      instructions: JSON.stringify([
        "Tempere os peitos de peru com azeite, limão, sal e pimenta.",
        "Grelhe por 4-5 minutos de cada lado.",
        "Grelhe os aspargos junto.",
        "Sirva com raspas de limão."
      ]),
      tips: "Peru é uma das carnes mais magras.",
    },
    {
      name: "Frango Grelhado com Molho de Mostarda",
      description: "Frango suculento com molho especial.",
      category: "proteina",
      calories: 350,
      prepTime: 15,
      servings: 1,
      ingredients: JSON.stringify([
        "2 peitos de frango",
        "Molho: mostarda Dijon, mostarda amarela, iogurte grego, limão"
      ]),
      instructions: JSON.stringify([
        "Misture as mostardas com iogurte e limão para o molho.",
        "Grelhe os peitos de frango.",
        "Sirva com o molho por cima."
      ]),
      tips: "Molho de mostarda tem zero gordura.",
    },
    // SOPAS
    {
      name: "Sopa de Lentilhas",
      description: "Sopa reconfortante e nutritiva.",
      category: "sopa",
      calories: 250,
      prepTime: 30,
      servings: 2,
      ingredients: JSON.stringify([
        "1 xícara de lentilhas secas",
        "1 cebola picada",
        "2 cenouras em rodelas",
        "2 dentes de alho",
        "Cominho, páprica, açafrão",
        "4 xícaras de caldo de legumes"
      ]),
      instructions: JSON.stringify([
        "Refogue cebola e alho no azeite.",
        "Adicione os temperos.",
        "Acrescente lentilhas, cenouras e caldo.",
        "Cozinhe por 20-25 minutos.",
        "Adicione suco de limão ao final."
      ]),
      tips: "Lentilhas são ricas em proteínas e fibras.",
    },
    {
      name: "Sopa de Tomate Assado",
      description: "Sopa cremosa com tomates assados.",
      category: "sopa",
      calories: 250,
      prepTime: 60,
      servings: 2,
      ingredients: JSON.stringify([
        "1,5 kg de tomates maduros",
        "3 dentes de alho",
        "1 cebola grande",
        "Azeite de oliva",
        "4 xícaras de caldo de legumes",
        "Manjericão fresco"
      ]),
      instructions: JSON.stringify([
        "Asse os tomates, alho e cebola a 200°C por 45 min.",
        "Bata tudo no liquidificador.",
        "Adicione o caldo de legumes e aqueça.",
        "Sirva com manjericão fresco."
      ]),
      tips: "Tomates assados têm sabor mais intenso.",
    },
    {
      name: "Sopa de Brócolis",
      description: "Sopa cremosa e nutritiva.",
      category: "sopa",
      calories: 250,
      prepTime: 25,
      servings: 2,
      ingredients: JSON.stringify([
        "2 xícaras de brócolis",
        "1 cebola picada",
        "2 dentes de alho",
        "1 batata média",
        "2 xícaras de caldo de legumes",
        "1/2 xícara de leite desnatado"
      ]),
      instructions: JSON.stringify([
        "Refogue cebola e alho.",
        "Adicione brócolis, batata e caldo.",
        "Cozinhe até os legumes ficarem macios.",
        "Bata no liquidificador.",
        "Adicione o leite e aqueça."
      ]),
      tips: "Adicione noz-moscada para mais sabor.",
    },
    // SOBREMESAS SAUDÁVEIS
    {
      name: "Tigela de Açaí com Granola",
      description: "Tigela energética e deliciosa.",
      category: "lanche_doce",
      calories: 300,
      prepTime: 5,
      servings: 1,
      ingredients: JSON.stringify([
        "100g de polpa de açaí congelada",
        "1 banana madura",
        "1/2 xícara de morangos",
        "1/4 de xícara de granola sem açúcar",
        "1 colher de sopa de sementes de chia"
      ]),
      instructions: JSON.stringify([
        "Bata o açaí no liquidificador até ficar cremoso.",
        "Despeje em uma tigela.",
        "Disponha banana, morangos, granola e chia por cima."
      ]),
      tips: "Açaí é rico em antioxidantes.",
    },
    {
      name: "Mousse de Chocolate com Abacate",
      description: "Mousse cremosa e saudável.",
      category: "lanche_doce",
      calories: 300,
      prepTime: 10,
      servings: 2,
      ingredients: JSON.stringify([
        "2 abacates maduros",
        "1/4 de xícara de cacau em pó",
        "1/4 de xícara de mel",
        "1 colher de chá de extrato de baunilha"
      ]),
      instructions: JSON.stringify([
        "Bata todos os ingredientes no liquidificador até ficar cremoso.",
        "Leve à geladeira por 30 minutos antes de servir."
      ]),
      tips: "Abacate dá cremosidade sem precisar de creme de leite.",
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({ data: recipe });
  }

  console.log(`✅ ${recipes.length} receitas criadas`);

  // ============================================
  // SUCOS DETOX
  // ============================================
  console.log("🥤 Criando sucos detox...");

  const juices = [
    {
      name: "Suco Verde Detox",
      description: "Combinação perfeita para começar o dia com energia e desintoxicação.",
      benefits: JSON.stringify([
        "Desintoxica o fígado",
        "Melhora a digestão",
        "Aumenta a energia",
        "Rico em clorofila"
      ]),
      ingredients: JSON.stringify([
        "2 folhas de couve",
        "1 maçã verde",
        "1 limão com casca",
        "1 pedaço de gengibre",
        "200ml de água de coco"
      ]),
      instructions: JSON.stringify([
        "Lave bem todos os ingredientes.",
        "Corte a maçã em pedaços.",
        "Bata tudo no liquidificador.",
        "Coar é opcional.",
        "Beba imediatamente."
      ]),
      prepTime: 5,
    },
    {
      name: "Suco de Abacaxi com Hortelã",
      description: "Refrescante e diurético, perfeito para reduzir inchaço.",
      benefits: JSON.stringify([
        "Diurético natural",
        "Reduz inchaço",
        "Melhora a digestão",
        "Anti-inflamatório"
      ]),
      ingredients: JSON.stringify([
        "2 fatias de abacaxi",
        "Folhas de hortelã a gosto",
        "200ml de água",
        "Gelo a gosto"
      ]),
      instructions: JSON.stringify([
        "Bata o abacaxi com a água.",
        "Adicione as folhas de hortelã.",
        "Bata novamente.",
        "Sirva com gelo."
      ]),
      prepTime: 3,
    },
    {
      name: "Suco de Cenoura e Laranja",
      description: "Rico em vitamina A e C, excelente para a pele.",
      benefits: JSON.stringify([
        "Melhora a saúde da pele",
        "Fortalece a imunidade",
        "Rico em antioxidantes",
        "Bom para a visão"
      ]),
      ingredients: JSON.stringify([
        "2 cenouras médias",
        "2 laranjas espremidas",
        "1 pedaço de gengibre",
        "200ml de água"
      ]),
      instructions: JSON.stringify([
        "Descasque e corte as cenouras.",
        "Bata as cenouras com a água.",
        "Adicione o suco de laranja.",
        "Coar se preferir mais suave."
      ]),
      prepTime: 5,
    },
    {
      name: "Suco Vermelho Antioxidante",
      description: "Combinação de frutas vermelhas ricas em antioxidantes.",
      benefits: JSON.stringify([
        "Combate radicais livres",
        "Anti-envelhecimento",
        "Melhora a circulação",
        "Energia natural"
      ]),
      ingredients: JSON.stringify([
        "1 xícara de morangos",
        "1/2 xícara de framboesas",
        "1 beterraba pequena",
        "200ml de água"
      ]),
      instructions: JSON.stringify([
        "Lave bem as frutas e a beterraba.",
        "Corte a beterraba em pedaços.",
        "Bata tudo no liquidificador.",
        "Sirva gelado."
      ]),
      prepTime: 5,
    },
    {
      name: "Suco de Pepino e Limão",
      description: "Ultra refrescante e hidratante, perfeito para dias quentes.",
      benefits: JSON.stringify([
        "Ultra hidratante",
        "Baixas calorias",
        "Refrescante",
        "Diurético leve"
      ]),
      ingredients: JSON.stringify([
        "1/2 pepino",
        "Suco de 1 limão",
        "Folhas de hortelã",
        "200ml de água gelada"
      ]),
      instructions: JSON.stringify([
        "Descasque o pepino se preferir.",
        "Bata o pepino com a água.",
        "Adicione o suco de limão e hortelã.",
        "Sirva bem gelado."
      ]),
      prepTime: 3,
    },
    {
      name: "Suco de Gengibre e Limão",
      description: "Termogênico poderoso para acelerar o metabolismo.",
      benefits: JSON.stringify([
        "Acelera o metabolismo",
        "Termogênico natural",
        "Melhora a digestão",
        "Fortalece imunidade"
      ]),
      ingredients: JSON.stringify([
        "2cm de raiz de gengibre",
        "Suco de 2 limões",
        "1 colher de mel (opcional)",
        "300ml de água morna ou gelada"
      ]),
      instructions: JSON.stringify([
        "Rale ou fatie o gengibre.",
        "Misture com o suco de limão.",
        "Adicione água e mel se desejar.",
        "Pode ser bebido quente ou frio."
      ]),
      prepTime: 3,
    },
    {
      name: "Suco de Maçã e Couve",
      description: "Doce e nutritivo, perfeito para iniciantes em sucos verdes.",
      benefits: JSON.stringify([
        "Doce e palatável",
        "Rico em fibras",
        "Desintoxicante suave",
        "Saciante"
      ]),
      ingredients: JSON.stringify([
        "2 maçãs verdes",
        "2 folhas de couve",
        "Suco de 1/2 limão",
        "200ml de água"
      ]),
      instructions: JSON.stringify([
        "Corte as maçãs em pedaços (com casca).",
        "Lave bem as folhas de couve.",
        "Bata tudo no liquidificador.",
        "Coe se preferir mais suave."
      ]),
      prepTime: 5,
    },
    {
      name: "Suco de Uva e Aipo",
      description: "Combinação única para desintoxicação profunda.",
      benefits: JSON.stringify([
        "Desintoxicação profunda",
        "Rico em resveratrol",
        "Anti-inflamatório",
        "Melhora a circulação"
      ]),
      ingredients: JSON.stringify([
        "1 xícara de uvas roxas",
        "2 talos de aipo",
        "Suco de 1/2 limão",
        "200ml de água"
      ]),
      instructions: JSON.stringify([
        "Lave bem as uvas e o aipo.",
        "Corte o aipo em pedaços.",
        "Bata tudo no liquidificador.",
        "Sirva imediatamente."
      ]),
      prepTime: 5,
    },
    {
      name: "Suco Tropical Detox",
      description: "Sabor tropical com poder desintoxicante.",
      benefits: JSON.stringify([
        "Rico em vitamina C",
        "Digestivo",
        "Energético",
        "Refrescante"
      ]),
      ingredients: JSON.stringify([
        "1 fatia de abacaxi",
        "1/2 manga",
        "Suco de 1 laranja",
        "Folhas de hortelã"
      ]),
      instructions: JSON.stringify([
        "Corte as frutas em pedaços.",
        "Bata com o suco de laranja.",
        "Adicione hortelã a gosto.",
        "Sirva bem gelado."
      ]),
      prepTime: 5,
    },
    {
      name: "Suco de Melancia com Limão",
      description: "O mais refrescante de todos, perfeito para o verão.",
      benefits: JSON.stringify([
        "Super hidratante",
        "Diurético natural",
        "Baixíssimas calorias",
        "Rico em licopeno"
      ]),
      ingredients: JSON.stringify([
        "2 xícaras de melancia picada",
        "Suco de 1/2 limão",
        "Folhas de hortelã",
        "Gelo a gosto"
      ]),
      instructions: JSON.stringify([
        "Bata a melancia no liquidificador.",
        "Adicione o suco de limão.",
        "Decore com hortelã.",
        "Sirva com muito gelo."
      ]),
      prepTime: 3,
    },
  ];

  for (const juice of juices) {
    await prisma.juice.create({ data: juice });
  }

  console.log(`✅ ${juices.length} sucos detox criados`);

  // ============================================
  // PLANO ALIMENTAR 1500kcal
  // ============================================
  console.log("📋 Criando plano alimentar...");

  const mealPlans = [
    // Segunda-feira
    { dayOfWeek: 1, mealType: "cafe_manha", description: "Torrada integral com 2 colheres de pasta de amendoim + 1 banana + chá sem açúcar", calories: 350, options: JSON.stringify(["Substituir banana por maçã", "Substituir pasta de amendoim por cream cheese light"]) },
    { dayOfWeek: 1, mealType: "almoco", description: "Frango grelhado (120g) + arroz integral (4 colheres) + brócolis refogado + salada verde", calories: 450, options: JSON.stringify(["Substituir frango por peixe", "Substituir brócolis por abobrinha"]) },
    { dayOfWeek: 1, mealType: "lanche_tarde", description: "Iogurte grego light (150g) com 1/2 xícara de frutas vermelhas", calories: 180, options: JSON.stringify(["Substituir por vitamina de frutas"]) },
    { dayOfWeek: 1, mealType: "jantar", description: "Omelete de 2 ovos com espinafre + salada de tomate e pepino", calories: 300, options: JSON.stringify(["Substituir por sopa de legumes"]) },
    { dayOfWeek: 1, mealType: "ceia", description: "1 fatia de queijo branco + 1 torrada integral", calories: 120, options: JSON.stringify(["Substituir por iogurte natural"]) },
    
    // Terça-feira
    { dayOfWeek: 2, mealType: "cafe_manha", description: "Mingau de aveia (3 colheres) com leite desnatado + 1 maçã picada + canela", calories: 320, options: JSON.stringify(["Substituir maçã por banana", "Adicionar mel a gosto"]) },
    { dayOfWeek: 2, mealType: "almoco", description: "Salmão grelhado (120g) + purê de batata doce + aspargos ao vapor", calories: 420, options: JSON.stringify(["Substituir salmão por tilápia", "Substituir purê por quinoa"]) },
    { dayOfWeek: 2, mealType: "lanche_tarde", description: "Mix de castanhas (30g) + 1 pera", calories: 200, options: JSON.stringify(["Substituir castanhas por amendoim"]) },
    { dayOfWeek: 2, mealType: "jantar", description: "Sopa de lentilhas com legumes + 1 fatia de pão integral", calories: 320, options: JSON.stringify(["Substituir sopa por salada com atum"]) },
    { dayOfWeek: 2, mealType: "ceia", description: "1 xícara de chá de camomila + 2 biscoitos integrais", calories: 80, options: JSON.stringify(["Substituir biscoitos por fruta seca"]) },
    
    // Quarta-feira
    { dayOfWeek: 3, mealType: "cafe_manha", description: "Panqueca de banana e aveia (2 unidades) com mel + café com leite desnatado", calories: 340, options: JSON.stringify(["Substituir mel por frutas", "Adicionar canela"]) },
    { dayOfWeek: 3, mealType: "almoco", description: "Carne magra grelhada (120g) + abóbora refogada + salada de folhas verdes", calories: 430, options: JSON.stringify(["Substituir carne por frango", "Substituir abóbora por cenoura"]) },
    { dayOfWeek: 3, mealType: "lanche_tarde", description: "Smoothie de morango com iogurte (250ml)", calories: 180, options: JSON.stringify(["Substituir por vitamina de banana"]) },
    { dayOfWeek: 3, mealType: "jantar", description: "Wrap de frango com alface e tomate + cenoura baby", calories: 290, options: JSON.stringify(["Substituir wrap por salada completa"]) },
    { dayOfWeek: 3, mealType: "ceia", description: "1 potinho de gelatina diet + 1 noz", calories: 50, options: JSON.stringify(["Substituir por iogurte light"]) },
    
    // Quinta-feira
    { dayOfWeek: 4, mealType: "cafe_manha", description: "Torrada de abacate com ovo mexido + suco de laranja natural (150ml)", calories: 380, options: JSON.stringify(["Substituir ovo por queijo cottage", "Substituir suco por chá"]) },
    { dayOfWeek: 4, mealType: "almoco", description: "Tilápia assada com limão + arroz integral + legumes grelhados", calories: 400, options: JSON.stringify(["Substituir tilápia por salmão", "Variar legumes"]) },
    { dayOfWeek: 4, mealType: "lanche_tarde", description: "1 banana com 1 colher de pasta de amendoim", calories: 200, options: JSON.stringify(["Substituir banana por maçã com canela"]) },
    { dayOfWeek: 4, mealType: "jantar", description: "Salada de atum com grão de bico, tomate e cebola + azeite", calories: 280, options: JSON.stringify(["Substituir atum por frango desfiado"]) },
    { dayOfWeek: 4, mealType: "ceia", description: "1 xícara de leite morno com mel", calories: 120, options: JSON.stringify(["Substituir por chá de erva doce"]) },
    
    // Sexta-feira
    { dayOfWeek: 5, mealType: "cafe_manha", description: "Iogurte grego com granola e frutas picadas + 1 fatia de queijo branco", calories: 330, options: JSON.stringify(["Variar frutas", "Substituir granola por aveia"]) },
    { dayOfWeek: 5, mealType: "almoco", description: "Frango ao curry com couve-flor e arroz integral", calories: 450, options: JSON.stringify(["Substituir frango por tofu", "Reduzer arroz"]) },
    { dayOfWeek: 5, mealType: "lanche_tarde", description: "Muffin de banana e aveia caseiro", calories: 180, options: JSON.stringify(["Substituir por barra de cereal integral"]) },
    { dayOfWeek: 5, mealType: "jantar", description: "Tigela de açaí com morango e chia (sem cobertura doce)", calories: 280, options: JSON.stringify(["Substituir açaí por salada de frutas"]) },
    { dayOfWeek: 5, mealType: "ceia", description: "1 fatia de queijo minas + 1 colher de mel", calories: 100, options: JSON.stringify(["Substituir por ricota com mel"]) },
    
    // Sábado
    { dayOfWeek: 6, mealType: "cafe_manha", description: "Omelete de claras com tomate e queijo + torrada integral + suco verde", calories: 350, options: JSON.stringify(["Adicionar espinafre à omelete", "Variar vegetais no suco"]) },
    { dayOfWeek: 6, mealType: "almoco", description: "Hambúrguer caseiro de frango + batata doce assada + salada verde", calories: 440, options: JSON.stringify(["Substituir hambúrguer por carne magra grelhada"]) },
    { dayOfWeek: 6, mealType: "lanche_tarde", description: "Tigela de iogurte com coco e manga", calories: 200, options: JSON.stringify(["Substituir manga por abacaxi"]) },
    { dayOfWeek: 6, mealType: "jantar", description: "Sopa de brócolis com queijo cottage + croutons integrais", calories: 280, options: JSON.stringify(["Substituir sopa por salada quente"]) },
    { dayOfWeek: 6, mealType: "ceia", description: "Chá de hortelã + 2 torradas com geleia diet", calories: 90, options: JSON.stringify(["Substituir geleia por cream cheese"]) },
    
    // Domingo
    { dayOfWeek: 7, mealType: "cafe_manha", description: "Waffle de maçã e canela com mel + café com leite", calories: 360, options: JSON.stringify(["Substituir waffle por panqueca de aveia"]) },
    { dayOfWeek: 7, mealType: "almoco", description: "Peito de peru grelhado + purê de couve-flor + aspargos + salada", calories: 420, options: JSON.stringify(["Substituir peru por frango", "Variar acompanhamentos"]) },
    { dayOfWeek: 7, mealType: "lanche_tarde", description: "Vitamina de banana com aveia e canela (250ml)", calories: 200, options: JSON.stringify(["Adicionar cacau em pó"]) },
    { dayOfWeek: 7, mealType: "jantar", description: "Rolinho de queijo e presunto com vegetais + pepino em palitos", calories: 260, options: JSON.stringify(["Substituir por wrap vegetariano"]) },
    { dayOfWeek: 7, mealType: "ceia", description: "1 maçã assada com canela", calories: 80, options: JSON.stringify(["Substituir por pera cozida"]) },
  ];

  for (const meal of mealPlans) {
    await prisma.mealPlan.create({ data: meal });
  }

  console.log(`✅ ${mealPlans.length} refeições do plano criadas`);

  // ============================================
  // CONQUISTAS
  // ============================================
  console.log("🏆 Criando conquistas...");

  const achievements = [
    { code: "first_day", name: "Primeiro Passo", description: "Completou o primeiro dia do programa", emoji: "🌟", xpReward: 20, category: "special", requirement: JSON.stringify({ type: "first_login" }) },
    { code: "streak_3", name: "Três Dias Seguidos", description: "Manteve sequência de 3 dias", emoji: "🔥", xpReward: 30, category: "streak", requirement: JSON.stringify({ type: "streak", value: 3 }) },
    { code: "streak_7", name: "Uma Semana!", description: "Completou 7 dias consecutivos", emoji: "🎉", xpReward: 50, category: "streak", requirement: JSON.stringify({ type: "streak", value: 7 }) },
    { code: "streak_14", name: "Duas Semadas!", description: "Manteve sequência por 14 dias", emoji: "💪", xpReward: 100, category: "streak", requirement: JSON.stringify({ type: "streak", value: 14 }) },
    { code: "streak_30", name: "Mês Completo!", description: "30 dias de dedicação!", emoji: "🏆", xpReward: 200, category: "streak", requirement: JSON.stringify({ type: "streak", value: 30 }) },
    { code: "water_7", name: "Hidratada!", description: "Bateu meta de água por 7 dias", emoji: "💧", xpReward: 40, category: "water", requirement: JSON.stringify({ type: "water_streak", value: 7 }) },
    { code: "phase1", name: "Mentalidade Forte", description: "Completou a Fase 1: Mentalidade", emoji: "🧠", xpReward: 50, category: "phase", requirement: JSON.stringify({ type: "phase_complete", phase: 1 }) },
    { code: "phase2", name: "Hidratação Master", description: "Completou a Fase 2: Hidratação", emoji: "💧", xpReward: 50, category: "phase", requirement: JSON.stringify({ type: "phase_complete", phase: 2 }) },
    { code: "phase3", name: "Nutrição Consciente", description: "Completou a Fase 3: Plano Alimentar", emoji: "🥗", xpReward: 50, category: "phase", requirement: JSON.stringify({ type: "phase_complete", phase: 3 }) },
    { code: "phase4", name: "Chef Saudável", description: "Completou a Fase 4: Receitas", emoji: "🍳", xpReward: 50, category: "phase", requirement: JSON.stringify({ type: "phase_complete", phase: 4 }) },
    { code: "phase5", name: "Detox Expert", description: "Completou a Fase 5: Sucos Detox", emoji: "🥤", xpReward: 50, category: "phase", requirement: JSON.stringify({ type: "phase_complete", phase: 5 }) },
    { code: "meals_7", name: "Compromisso Alimentar", description: "Seguiu o plano por 7 dias", emoji: "🍽️", xpReward: 60, category: "meals", requirement: JSON.stringify({ type: "meals_streak", value: 7 }) },
    { code: "first_recipe", name: "Mão na Massa", description: "Adicionou primeira receita aos favoritos", emoji: "👩‍🍳", xpReward: 10, category: "special", requirement: JSON.stringify({ type: "first_favorite" }) },
    { code: "level_5", name: "Nível 5!", description: "Alcançou o nível 5", emoji: "⭐", xpReward: 30, category: "special", requirement: JSON.stringify({ type: "level", value: 5 }) },
    { code: "level_10", name: "Nível 10!", description: "Alcançou o nível 10", emoji: "🌟", xpReward: 60, category: "special", requirement: JSON.stringify({ type: "level", value: 10 }) },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
  }

  console.log(`✅ ${achievements.length} conquistas criadas`);

  // ============================================
  // FRASES MOTIVACIONAIS
  // ============================================
  console.log("💫 Criando frases motivacionais...");

  const quotes = [
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
    { quote: "Acredite: você é capaz de mais do que imagina.", category: "mentalidade" },
    { quote: "Cada copo de água é um brinde à sua saúde.", category: "agua" },
    { quote: "Cozinhar em casa é um ato de amor próprio.", category: "alimentacao" },
    { quote: "Seu corpo trabalha duro por você. Trabalhe duro por ele.", category: "exercicio" },
    { quote: "Não desista. O começo é sempre o mais difícil.", category: "geral" },
    { quote: "Você merece se sentir bem na sua própria pele.", category: "mentalidade" },
    { quote: "A mudança que você busca começa com a decisão de tentar.", category: "geral" },
    { quote: "Celebre cada vitória, por menor que pareça.", category: "geral" },
    { quote: "Seu futuro eu vai agradecer pelo que você faz hoje.", category: "geral" },
    { quote: "A jornada de mil quilômetros começa com um único passo.", category: "geral" },
  ];

  for (const quote of quotes) {
    await prisma.motivationalQuote.create({ data: quote });
  }

  console.log(`✅ ${quotes.length} frases motivacionais criadas`);

  console.log("\n🌱 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
