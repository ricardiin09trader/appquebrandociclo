const https = require('https');

// Criar projeto no Vercel via API
const projectName = 'quebrando-ciclo';
const repoUrl = 'https://github.com/ricardiin09trader/appquebrandociclo';

console.log('🚀 Criando projeto no Vercel...');
console.log(`📦 Projeto: ${projectName}`);
console.log(`🔗 Repositório: ${repoUrl}`);
console.log('');
console.log('Para completar o deploy automaticamente, você precisa de um Vercel Token.');
console.log('');
console.log('📋 SIGA ESTES PASSOS:');
console.log('');
console.log('1. Acesse: https://vercel.com/account/tokens');
console.log('2. Clique em "Create Token"');
console.log('3. Dê um nome (ex: "deploy-quebrando-ciclo")');
console.log('4. Copie o token gerado');
console.log('');
console.log('Depois execute:');
console.log('  vercel --token SEU_TOKEN --yes');
