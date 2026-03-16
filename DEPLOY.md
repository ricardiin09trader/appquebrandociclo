# Guia de Deploy - Quebrando Ciclo

## 📋 Variáveis de Ambiente no Vercel

Acesse **Settings > Environment Variables** e adicione:

### 1. DATABASE_URL (Pooler - para Serverless)
```
postgresql://postgres:%28Ketchup22%29123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 2. DIRECT_DATABASE_URL (Direct - para migrations)
```
postgresql://postgres:%28Ketchup22%29123@db.hmqudmwyddszvbtalbfy.supabase.co:5432/postgres
```

## 🚀 Passos para Deploy

1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório: `ricardiin09trader/appquebrandociclo`
3. Configure as variáveis de ambiente acima
4. Clique em **Deploy**

## 📱 Após o Deploy

1. Execute o comando para criar as tabelas:
   - Vá em **Storage** no Supabase
   - Ou use o Prisma migrate

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
- [x] PostgreSQL (Supabase)
