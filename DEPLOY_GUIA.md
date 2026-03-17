# 🚀 DEPLOY COMPLETO - Quebrando Ciclo

## ⚠️ IMPORTANTE: O ambiente sandbox não pode conectar externamente

Por isso, você precisa fazer o deploy manualmente seguindo estes passos:

---

## 1️⃣ CONFIGURAR SUPABASE (Banco de Dados)

### Acesse o Supabase
1. Vá para [supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Abra o projeto existente

### Execute o SQL
1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**
3. Cole todo o conteúdo do arquivo `supabase-schema.sql`
4. Clique em **Run** (ou pressione Ctrl+Enter)

### Pegar as Connection Strings
1. Vá em **Settings** → **Database**
2. Copie a **Connection string** (URI)
   - Para `DATABASE_URL`: Use a **Session Pooler** (porta 6543)
   - Para `DIRECT_DATABASE_URL`: Use a **Direct connection** (porta 5432)

---

## 2️⃣ DEPLOY NO VERCEL

### Acesse o Vercel
1. Vá para [vercel.com](https://vercel.com)
2. Faça login ou crie uma conta
3. Clique em **"Add New"** → **"Project"**

### Importe do GitHub
1. Conecte sua conta GitHub
2. Selecione: **`ricardiin09trader/appquebrandociclo`**
3. Clique em **Import**

### Configure as Variáveis de Ambiente

Adicione estas **3 variáveis**:

| Nome | Valor |
|------|-------|
| `DATABASE_URL` | `postgresql://postgres:%28Ketchup22%29123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require` |
| `DIRECT_DATABASE_URL` | `postgresql://postgres:%28Ketchup22%29123@db.hmqudmwyddszvbtalbfy.supabase.co:5432/postgres` |
| `ADMIN_SECRET` | `quebrando-ciclo-admin-2024` |

### Deploy
1. Clique em **Deploy**
2. Aguarde 2-3 minutos
3. Pronto! 🎉

---

## 3️⃣ APÓS O DEPLOY

### Verificar se funcionou
1. Acesse a URL gerada pelo Vercel
2. Teste criar uma conta
3. Teste fazer login

### Configurar Domínio Personalizado (opcional)
1. No Vercel, vá em **Settings** → **Domains**
2. Adicione seu domínio

---

## 📱 FUNCIONALIDADES DO APP

### ✅ Implementado
- Login/Registro com email
- Sistema de XP e 8 níveis
- Check-in diário (5 missões)
- Sequência (streak)
- Plano alimentar BLOQUEADO até Fase 1 e 2
- Receitas e Sucos
- Fichas de Treino
- Painel Admin

### 🔐 Acesso Admin
- Na tela de login, clique em **"Acesso Admin"**
- Senha: `quebrando-ciclo-admin-2024`

---

## 🔧 TROUBLESHOOTING

### Erro "Can't reach database"
- Verifique se as variáveis de ambiente estão corretas
- Use o **Session Pooler** (porta 6543) para `DATABASE_URL`
- Use a **Direct connection** (porta 5432) para `DIRECT_DATABASE_URL`

### Erro "Not IPv4 compatible"
- Use a connection string do **Pooler**, não a direta
- Formato: `aws-0-sa-east-1.pooler.supabase.com:6543`

### Build falha no Vercel
- Verifique se todas as variáveis foram adicionadas
- Veja os logs em **Deployments** → clique no deploy → **Build Logs**

---

## 📂 ARQUIVOS IMPORTANTES

- `supabase-schema.sql` - Script SQL para criar tabelas
- `prisma/schema.postgres.prisma` - Schema PostgreSQL
- `.env.production` - Variáveis de produção

---

**Repositório:** https://github.com/ricardiin09trader/appquebrandociclo
