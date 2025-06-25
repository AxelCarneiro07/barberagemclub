const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta FrontEnd (um nível acima da pasta backend)
app.use(express.static(path.join(__dirname, '../FrontEnd')));

// Rota para servir cadastro.html diretamente
app.get('/cadastro.html', (req, res) => {
  const filePath = path.join(__dirname, '../FrontEnd', 'cadastro.html');
  console.log('Tentando servir arquivo:', filePath);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    console.log('Arquivo não encontrado:', filePath);
    res.status(404).send('Arquivo não encontrado. Verifique se cadastro.html está na pasta FrontEnd/');
  }
});

// Rota para servir login.html diretamente
app.get('/login.html', (req, res) => {
  const filePath = path.join(__dirname, '../FrontEnd', 'login.html');
  console.log('Tentando servir arquivo:', filePath);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    console.log('Arquivo não encontrado:', filePath);
    res.status(404).send('Arquivo não encontrado. Verifique se login.html está na pasta FrontEnd/');
  }
});

// Rota raiz - redireciona para cadastro
app.get('/', (req, res) => {
  res.redirect('/cadastro.html');
});

// Importar rotas de autenticação
try {
  const authRoutes = require('./routes/auth');
  app.use(authRoutes);
  console.log('Rotas de autenticação carregadas com sucesso!');
} catch (error) {
  console.log('Erro ao carregar rotas de autenticação:', error.message);
  console.log('Servidor funcionará apenas para servir arquivos HTML');
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Estrutura de pastas:`);
  console.log(`- Pasta backend (atual): ${__dirname}`);
  console.log(`- Pasta FrontEnd: ${path.join(__dirname, '../FrontEnd')}`);
  
  // Verificar se os arquivos existem
  const cadastroPath = path.join(__dirname, '../FrontEnd', 'cadastro.html');
  const loginPath = path.join(__dirname, '../FrontEnd', 'login.html');
  const cssPath = path.join(__dirname, '../FrontEnd', 'stylelogin.css');
  
  console.log(`- cadastro.html existe: ${fs.existsSync(cadastroPath)}`);
  console.log(`- login.html existe: ${fs.existsSync(loginPath)}`);
  console.log(`- stylelogin.css existe: ${fs.existsSync(cssPath)}`);
  
  console.log(`\nTente acessar:`);
  console.log(`- http://localhost:${PORT}/cadastro.html`);
  console.log(`- http://localhost:${PORT}/login.html`);
  console.log(`- http://localhost:${PORT}/ (redireciona para cadastro)`);
});