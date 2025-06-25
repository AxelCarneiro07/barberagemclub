const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rota de cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, sobrenome, celular, email, nascimento, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);

    db.run(
      `INSERT INTO usuarios (nome, sobrenome, celular, email, nascimento, senha)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, sobrenome, celular, email, nascimento, hash],
      function (err) {
        if (err) {
          return res.status(400).json({ erro: 'E-mail já cadastrado.' });
        }
        return res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso!' });
      }
    );
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// Rota de login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ erro: 'Usuário não encontrado.' });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ erro: 'Senha incorreta.' });

    const token = jwt.sign({ 
      id: user.id, 
      nome: user.nome, 
      tipo: user.tipo || 'usuario' // Adiciona o tipo ao token
    }, 'segredo_barberagem', { expiresIn: '1h' });

    res.json({ 
      mensagem: 'Login bem-sucedido!', 
      token,
      tipo: user.tipo || 'usuario' // Retorna o tipo para o frontend
    });
  });
});

// Rota para promover um usuário a administrador (protegida)
router.post('/promover-admin', (req, res) => {
  const { token, emailUsuario } = req.body;
  
  try {
    // Verificar se quem está solicitando é um admin
    const decoded = jwt.verify(token, 'segredo_barberagem');
    if (!decoded || decoded.tipo !== 'admin') {
      return res.status(403).json({ erro: 'Sem permissão para esta operação.' });
    }
    
    // Promover o usuário especificado a admin
    db.run(`UPDATE usuarios SET tipo = 'admin' WHERE email = ?`, [emailUsuario], function(err) {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
      if (this.changes === 0) return res.status(404).json({ erro: 'Usuário não encontrado.' });
      
      res.json({ mensagem: 'Usuário promovido a administrador com sucesso!' });
    });
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
});

module.exports = router;
