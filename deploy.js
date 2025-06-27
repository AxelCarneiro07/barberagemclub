const fs = require('fs-extra');
const path = require('path');

console.log('🚀 Preparando aplicação para deploy...');

// Garantir que o diretório public existe
const publicDir = path.join(__dirname, 'public');
fs.ensureDirSync(publicDir);

// Copiar arquivos do frontend para public
console.log('📂 Copiando arquivos do frontend...');
fs.copySync(
  path.join(__dirname, 'frontend'),
  publicDir,
  { overwrite: true }
);

// Verificar se o .env existe, senão criar a partir do exemplo
const envPath = path.join(__dirname, 'backend', '.env');
const envExamplePath = path.join(__dirname, 'backend', '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('⚙️ Criando arquivo .env a partir do exemplo...');
  fs.copySync(envExamplePath, envPath);
}

// Adicionar a configuração do caminho para o frontend no .env
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
if (!envContent.includes('FRONTEND_PATH')) {
  console.log('⚙️ Configurando caminho para o frontend...');
  fs.appendFileSync(envPath, '\n# Frontend path\nFRONTEND_PATH=' + publicDir);
}

console.log('✅ Deploy preparado com sucesso!');
console.log('📝 Para iniciar a aplicação, execute: npm start');