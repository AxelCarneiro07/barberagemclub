const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  // In production, specify allowed origins
  // In development, allow all
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Determine frontend path - either from env var, public dir, or frontend dir
const determineFrontendPath = () => {
  if (process.env.FRONTEND_PATH && fs.existsSync(process.env.FRONTEND_PATH)) {
    return process.env.FRONTEND_PATH;
  }
  
  const publicPath = path.join(__dirname, '../public');
  if (fs.existsSync(publicPath)) {
    return publicPath;
  }
  
  return path.join(__dirname, '../frontend');
};

const frontendPath = determineFrontendPath();
console.log(`Serving frontend files from: ${frontendPath}`);
app.use(express.static(frontendPath));

// Serve HTML pages
const serveHtmlPage = (page) => {
  return (req, res) => {
    const filePath = path.join(frontendPath, page);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send(`Arquivo não encontrado: ${page}`);
    }
  };
};

app.get('/cadastro.html', serveHtmlPage('cadastro.html'));
app.get('/login.html', serveHtmlPage('login.html'));
app.get('/admin.html', serveHtmlPage('admin.html'));
app.get('/barberagemclub.html', serveHtmlPage('barberagemclub.html'));
app.get('/produtos.html', serveHtmlPage('produtos.html'));
app.get('/parceiros.html', serveHtmlPage('parceiros.html'));
app.get('/painel-admin.html', serveHtmlPage('painel-admin.html'));

// Root route - redirect to home page
app.get('/', (req, res) => {
  res.redirect('/barberagemclub.html');
});

// Import authentication routes
try {
  const authRoutes = require('./routes/auth');
  app.use(authRoutes);
  console.log('Rotas de autenticação carregadas com sucesso!');
} catch (error) {
  console.log('Erro ao carregar rotas de autenticação:', error.message);
  console.log('Servidor funcionará apenas para servir arquivos HTML');
}

// Catch-all route to handle SPA routing if needed
app.get('*', (req, res) => {
  const indexPath = path.join(frontendPath, 'barberagemclub.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Página não encontrada');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} no modo ${process.env.NODE_ENV || 'development'}`);
  console.log(`Verifique se o frontend está disponível em ${frontendPath}`);
});