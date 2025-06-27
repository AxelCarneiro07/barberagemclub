/**
 * Admin Account Setup Script
 * 
 * This script creates an initial admin account in the database
 * if it doesn't already exist. It's meant to be run once during deployment
 * or initial setup.
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Get database path from environment variable or use default
const dbPath = process.env.DB_PATH || path.join(__dirname, 'barberagem.db');

// Create admin user function
async function createAdminUser() {
  return new Promise((resolve, reject) => {
    console.log('Verificando/criando conta de administrador...');
    
    // Connect to the database
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return reject(err);
      }
      
      // Check if admin user already exists
      db.get('SELECT * FROM usuarios WHERE email = ? AND tipo = ?', 
        ['aires@barberagemclub.com', 'admin'], 
        async (err, row) => {
          if (err) {
            db.close();
            return reject(err);
          }
          
          // If admin already exists, we're done
          if (row) {
            console.log('Conta de administrador já existe. Nenhuma ação necessária.');
            db.close();
            return resolve(true);
          }
          
          // Admin doesn't exist, create one
          try {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            
            // Create admin user
            db.run(
              `INSERT INTO usuarios (nome, sobrenome, celular, email, nascimento, senha, tipo) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`,
              ['Aires', 'Barberagem', '11987654321', 'aires@barberagemclub.com', '1980-01-01', hashedPassword, 'admin'],
              function(err) {
                db.close();
                
                if (err) {
                  console.error('Erro ao criar administrador:', err.message);
                  return reject(err);
                }
                
                console.log('✅ Conta de administrador criada com sucesso!');
                console.log('   Email: aires@barberagemclub.com');
                console.log('   Senha: admin123');
                console.log('   ⚠️  ALTERE A SENHA APÓS O PRIMEIRO LOGIN! ⚠️');
                
                return resolve(true);
              }
            );
          } catch (error) {
            db.close();
            console.error('Erro ao criar hash da senha:', error.message);
            return reject(error);
          }
        }
      );
    });
  });
}

// Run the setup
createAdminUser()
  .then(() => {
    console.log('✅ Configuração concluída!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erro durante a configuração:', err);
    process.exit(1);
  });