# 🎮 GUIA DE GAMIFICAÇÃO - Quebrando Ciclo

## 📊 SISTEMA DE XP E NÍVEIS

### Como Ganhar XP

| Ação | XP Ganho |
|------|----------|
| ✅ Missão diária completada | +20 XP |
| 📚 Lição lida | +25 XP |
| 🔥 Dia de sequência (streak) | +10 XP |
| 🏆 Conquista desbloqueada | +50 XP |
| 💧 Meta de água atingida | +15 XP |

### Níveis do App

| Nível | Nome | XP Necessário | Emoji |
|-------|------|---------------|-------|
| 1 | Iniciante | 0 XP | 🌱 |
| 2 | Aprendiz | 100 XP | 🌿 |
| 3 | Dedicada | 250 XP | 🍃 |
| 4 | Consciente | 500 XP | 🌸 |
| 5 | Transformadora | 800 XP | 🌺 |
| 6 | Inspiração | 1.200 XP | ⭐ |
| 7 | Mestra | 1.700 XP | 🌟 |
| 8 | Lenda | 2.500 XP | 👑 |

---

## 🔒 BLOQUEIO DE CONTEÚDO

### Por que bloqueamos o Plano Alimentar?

Acreditamos que a **transformação começa na mente**. Por isso, o Plano Alimentar só é desbloqueado após completar:

1. **Fase 1: Mentalidade** (4 lições)
   - Bem-vindo à Jornada
   - Abordagem Equilibrada
   - Crenças Limitantes
   - 12 Estratégias de Sucesso

2. **Fase 2: Hidratação** (1 lição)
   - O Poder da Água

### Benefícios desse sistema:
- ✅ Usuária entende a metodologia antes de começar
- ✅ Cria comprometimento com a jornada
- ✅ Mentalidade preparada para a transformação
- ✅ Maior taxa de sucesso a longo prazo

---

## 🏆 SISTEMA DE CONQUISTAS

### Conquistas Disponíveis

| Conquista | Requisito | Emoji |
|-----------|-----------|-------|
| Primeira Chama | 1 dia de sequência | 🔥 |
| Semana Incansável | 7 dias seguidos | 🔥🔥 |
| Hidratado | Meta de água 1 dia | 💧 |
| Fonte de Vida | Meta de água 7 dias | 💧💧 |
| Mente Aberta | Completar Fase 1 | 🧠 |
| Consciência Alimentar | Completar Fase 3 | 🍽️ |
| Nutricionista | Completar Fase 4 | 🥗 |
| Chef Saudável | Favoritar 5 receitas | 🥑 |
| Ciclo Quebrado | Completar todas as fases | 🏆 |
| Consistência | 30 dias de sequência | 📅 |
| Meio Caminho | 50% das lições | ⭐ |

---

## 🔥 SISTEMA DE STREAK (SEQUÊNCIA)

### Como Funciona
- A cada dia com check-in, você ganha +1 na sequência
- Se perder um dia, a sequência zera
- Bônus de XP por streak:
  - 7 dias: +50 XP
  - 14 dias: +100 XP
  - 30 dias: +300 XP

### Dicas para Manter a Sequência
1. Defina um horário fixo para o check-in
2. Use lembretes no celular
3. Comece o dia com o app aberto
4. Complete pelo menos 1 missão por dia

---

## 📱 MISSÕES DIÁRIAS

### 5 Missões por Dia (100 XP total)

1. **💧 Beber água** - Atingir meta de copos
2. **🥗 Seguir dieta** - Seguir plano alimentar
3. **📚 Ler conteúdo** - Ler lição do dia
4. **🏃 Exercitar** - Praticar atividade física
5. **🧘 Mindfulness** - Momento de consciência

### Bônus Especiais
- Todas as missões no mesmo dia: +30 XP bônus
- 7 dias completos: +100 XP extra
- Fim de semana perfeito: +50 XP

---

## 🎯 ESTRATÉGIA DE ENGAGEMENT

### Loop de Gamificação
```
Check-in Diário → Ganha XP → Sobe de Nível → Desbloqueia Conteúdo → Se sente motivada → Volta amanhã
```

### Gatilhos Motivacionais
1. **Progresso Visual** - Barras de XP sempre visíveis
2. **Recompensas Frequentes** - XP a cada ação
3. **Desafios Progressivos** - Níveis cada vez mais difíceis
4. **Feedback Imediato** - Animações e celebrações
5. **Conteúdo Exclusivo** - Desbloqueio por progresso

---

## 💡 IMPLEMENTAÇÃO TÉCNICA

### Cálculo de Nível
```typescript
function calculateLevel(xp: number) {
  // Retorna nível atual, nome, emoji, progresso para próximo
}
```

### Verificação de Acesso
```typescript
function canAccessMealPlan(progress: UserProgress) {
  // Verifica se Fase 1 e 2 estão completas
  // Retorna: { canAccess: boolean, completedPhases: number }
}
```

### Persistência
- Progresso salvo no localStorage
- Sincronizado com banco de dados (Supabase)
- XP total calculado em tempo real

---

## 🚀 PRÓXIMAS FEATURES

1. **Ranking Semanal** - Competição entre usuárias
2. **Badges Exclusivas** - Conquistas especiais por evento
3. **Desafios Semanais** - Metas extras com bônus
4. **Loja de Recompensas** - Trocar XP por benefícios
5. **Times/Grupos** - Competição em grupo

---

**Versão:** 1.0  
**Última Atualização:** Março 2024
