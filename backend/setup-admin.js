const db = require('./database');
const bcrypt = require('bcryptjs');

async function setupAdmin() {
  const email = 'aires@barberagemclub.com';
  const senha = 'admin123';
  const nome = 'Aires';
  const sobrenome = 'Administrador';
  const celular = '28999999999';
  const nascimento = '1990-01-01';
  
  try {
    // Adicionar coluna tipo se não existir
    db.run(`ALTER TABLE usuarios ADD COLUMN tipo TEXT DEFAULT 'usuario'`, function(err) {
      // Ignora erro - pode significar que a coluna já existe
      console.log('Tentativa de adicionar coluna tipo');

      // Verificar se o usuário já existe
      db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, user) => {
        if (err) {
          console.error('Erro ao consultar usuário:', err);
          return;
        }
        
        if (user) {
          // Usuário já existe, atualiza para admin
          db.run('UPDATE usuarios SET tipo = "admin" WHERE email = ?', [email], function(err) {
            if (err) {
              console.error('Erro ao atualizar usuário para admin:', err);
            } else {
              console.log('Usuário atualizado para admin com sucesso!');
            }
          });
        } else {
          // Usuário não existe, cria novo admin
          const hash = await bcrypt.hash(senha, 10);
          
          db.run(
            `INSERT INTO usuarios (nome, sobrenome, celular, email, nascimento, senha, tipo)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, sobrenome, celular, email, nascimento, hash, 'admin'],
            function (err) {
              if (err) {
                console.error('Erro ao criar admin:', err);
              } else {
                console.log('Admin criado com sucesso!');
              }
            }
          );
        }
      });
    });
  } catch (error) {
    console.error('Erro ao configurar admin:', error);
  }
}

setupAdmin();
