# Guia de Deploy - Quebrando Ciclo

## 📋 Variáveis de Ambiente no Vercel

Acesse **Settings > Environment Variables** e adicione:

### 1. DATABASE_URL (Session Pooler - para IPv4/Serverless)
```
postgresql://postgres:%28Ketchup22%29123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

### 2. DIRECT_DATABASE_URL (Direct - para migrations)
```
postgresql://postgres:%28Ketchup22%29123@db.hmqudmwyddszvbtalbfy.supabase.co:5432/postgres
```

### 3. ADMIN_SECRET
```
quebrando-ciclo-admin-2024
```

## 🚀 Passos para Deploy

1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório: `ricardiin09trader/appquebrandociclo`
3. Configure as variáveis de ambiente acima
4. Clique em **Deploy**

## ⚠️ Importante - Erro "Not IPv4 compatible"

Se você receber esse erro, certifique-se de usar o **Session Pooler** (porta 6543) em vez da conexão direta:
- ❌ Errado: `db.hmqudmwyddszvbtalbfy.supabase.co:5432`
- ✅ Correto: `aws-0-sa-east-1.pooler.supabase.com:6543`

## 🔐 Acesso Admin

- **Rota:** `/admin`
- **Senha:** `quebrando-ciclo-admin-2024`

## ✅ Status

- [x] Login com Email
- [x] Registro de Usuárias
- [x] XP Bar Funcional
- [x] Contador de Dias (Streak)
- [x] Dashboard Admin
- [x] Check-in Diário (5 missões)
- [x] Sistema de Água
- [x] PostgreSQL (Supabase) com Session Pooler
