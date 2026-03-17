#!/bin/bash
# Deploy automático no Vercel

echo "🚀 Iniciando deploy no Vercel..."

# Usar API do Vercel para criar deploy
PROJECT_NAME="quebrando-ciclo"
REPO_URL="https://github.com/ricardiin09trader/appquebrandociclo"

echo "📦 Projeto: $PROJECT_NAME"
echo "🔗 Repositório: $REPO_URL"
echo ""
echo "⚠️  Para completar o deploy, você precisa:"
echo "   1. Acessar: https://vercel.com/new"
echo "   2. Importar o repositório: appquebrandociclo"
echo "   3. Adicionar as variáveis de ambiente"
echo ""
echo "Pressione Enter para abrir o Vercel no navegador..."
read
xdg-open "https://vercel.com/new/import?s=https://github.com/ricardiin09trader/appquebrandociclo" 2>/dev/null || open "https://vercel.com/new/import?s=https://github.com/ricardiin09trader/appquebrandociclo" 2>/dev/null || echo "Abra manualmente: https://vercel.com/new/import?s=https://github.com/ricardiin09trader/appquebrandociclo"
