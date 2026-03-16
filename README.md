# 🔄 Quebrando Ciclo - App Gamificado de Nutrição

Aplicativo web gamificado para ajudar pessoas a quebrar ciclos de hábitos alimentares ruins e desenvolver uma relação mais saudável com a comida.

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Linguagem de programação
- **Prisma** - ORM para banco de dados
- **Supabase** - Banco de dados PostgreSQL
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Zustand** - Gerenciamento de estado

## 📋 Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- Conta no [Vercel](https://vercel.com) (para deploy)

## 🔧 Configuração Local

1. **Clone o repositório**
```bash
git clone https://github.com/ricardiin09trader/appquebrandociclo.git
cd appquebrandociclo
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais do Supabase:
```
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
DIRECT_DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma db push
```

5. **Execute o projeto**
```bash
npm run dev
```

## 🚀 Deploy no Vercel

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure as variáveis de ambiente:
   - `DATABASE_URL`
   - `DIRECT_DATABASE_URL`
5. Deploy!

## 📱 Funcionalidades

- ✅ Sistema de fases progressivas
- ✅ Receitas saudáveis
- ✅ Sucos detox
- ✅ Plano alimentar
- ✅ Controle de água
- ✅ Gamificação com XP e níveis
- ✅ Conquistas e achievements
- ✅ Perfil do usuário

## 🔒 Segurança

- **NUNCA** commite o arquivo `.env` no GitHub
- Use variáveis de ambiente no Vercel
- Troque a senha do banco regularmente

## 📄 Licença

MIT
