const https = require('https');

// Dados do projeto
const projectData = {
  name: 'quebrando-ciclo',
  gitRepository: {
    type: 'github',
    repo: 'ricardiin09trader/appquebrandociclo'
  },
  framework: 'nextjs',
  environmentVariables: [
    { key: 'DATABASE_URL', value: 'postgresql://postgres:%28Ketchup22%29123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require', target: ['production'] },
    { key: 'DIRECT_DATABASE_URL', value: 'postgresql://postgres:%28Ketchup22%29123@db.hmqudmwyddszvbtalbfy.supabase.co:5432/postgres', target: ['production'] },
    { key: 'ADMIN_SECRET', value: 'quebrando-ciclo-admin-2024', target: ['production'] },
    { key: 'NEXTAUTH_SECRET', value: 'quebrando-ciclo-nextauth-secret-2024', target: ['production'] }
  ],
  buildCommand: 'prisma generate && prisma db push --accept-data-loss && next build',
  installCommand: 'bun install'
};

console.log('🔗 Link direto para deploy:');
console.log('');
console.log('https://vercel.com/new/import?s=https://github.com/ricardiin09trader/appquebrandociclo&environmentVariables=DATABASE_URL%3Dpostgresql%3A%2F%2Fpostgres%3A%2528Ketchup22%2529123%40aws-0-sa-east-1.pooler.supabase.com%3A6543%2Fpostgres%3Fpgbouncer%3Dtrue%26sslmode%3Drequire%26DIRECT_DATABASE_URL%3Dpostgresql%3A%2F%2Fpostgres%3A%2528Ketchup22%2529123%40db.hmqudmwyddszvbtalbfy.supabase.co%3A5432%2Fpostgres%26ADMIN_SECRET%3Dquebrando-ciclo-admin-2024%26NEXTAUTH_SECRET%3Dquebrando-ciclo-nextauth-secret-2024');
