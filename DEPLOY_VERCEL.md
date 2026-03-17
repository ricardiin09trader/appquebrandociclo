# 🚀 Deploy no Vercel - Quebrando Ciclo

## ✅ Projeto Pronto para Deploy!

O código já está no GitHub: `ricardiin09trader/appquebrandociclo`

---

## 📋 Passos para Deploy no Vercel

### 1. Acesse o Vercel
- Vá para: **https://vercel.com**
- Faça login com sua conta GitHub

### 2. Importar Projeto
- Clique em **"Add New Project"**
- Selecione o repositório: `appquebrandociclo`
- Clique em **"Import"**

### 3. Configurar Variáveis de Ambiente

**IMPORTANTE:** Adicione estas variáveis em **Environment Variables**:

```
DATABASE_URL=postgresql://postgres:%28Ketchup22%29123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require

DIRECT_DATABASE_URL=postgresql://postgres:%28Ketchup22%29123@db.hmqudmwyddszvbtalbfy.supabase.co:5432/postgres

ADMIN_SECRET=quebrando-ciclo-admin-2024

NEXTAUTH_SECRET=quebrando-ciclo-nextauth-secret-2024

NEXTAUTH_URL=https://[seu-dominio].vercel.app
```

### 4. Deploy
- Clique em **"Deploy"**
- Aguarde o build completar (2-3 minutos)

---

## 🔧 Configurações de Build

O projeto já está configurado com:
- **Framework:** Next.js
- **Build Command:** `prisma generate && prisma db push --accept-data-loss && next build`
- **Install Command:** `bun install`
- **Região:** São Paulo (gru1)

---

## 📱 Após o Deploy

1. **Acesse o App:** Seu app estará em `https://[nome-projeto].vercel.app`
2. **Acesso Admin:** Use a senha `quebrando-ciclo-admin-2024` na tela de login
3. **Banco de Dados:** Já conectado ao Supabase PostgreSQL

---

## ⚠️ Solução de Problemas

### Erro de Build
- Verifique se todas as variáveis de ambiente estão configuradas
- O banco Supabase deve estar ativo

### Erro de Conexão
- Use a URL do Session Pooler (porta 6543) para DATABASE_URL
- Use a URL direta (porta 5432) para DIRECT_DATABASE_URL

---

## 🎮 Funcionalidades do App

- ✅ Sistema de XP e Níveis (8 níveis)
- ✅ 5 Fases de progresso
- ✅ Plano Alimentar bloqueado até Fase 1 e 2 completas
- ✅ Guia de Gamificação
- ✅ Acompanhamento de água e peso
- ✅ Painel Admin

---

**Pronto para produção!** 🎉
