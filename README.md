# Barberagem Club

Sistema completo para gerenciamento de barbearia com interface para clientes e administradores.

## Estrutura do Projeto

Este projeto utiliza uma estrutura unificada para facilitar o deploy:

- **Backend**: API Node.js com Express e SQLite
- **Frontend**: Interface HTML/CSS/JavaScript servida pelo Express

## Funcionalidades

- Cadastro e login de usuários
- Visualização de serviços e produtos
- Área administrativa com controle de acesso
- Visualização de barbeiros para agendamento

## Requisitos

- Node.js 14.x ou superior
- NPM ou PNPM para gerenciamento de pacotes

## Instalação e Execução Local

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/barberagem-club.git
cd barberagem-club
```

### 2. Instale as dependências

```bash
npm install
```

Este comando instalará as dependências tanto do projeto principal quanto do backend.

### 3. Configure o administrador inicial

```bash
npm run setup
```

### 4. Inicie o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## Configuração para Produção

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório backend com base no `.env.example`:

```
# SERVER CONFIGURATION
PORT=3000
NODE_ENV=production

# SECURITY
JWT_SECRET=gerar_uma_string_aleatoria_segura
JWT_EXPIRATION=1h
```

### Preparar para Deploy

```bash
npm run deploy
```

Este comando organizará os arquivos para o deploy, copiando o frontend para a pasta `public`.

## Hospedagem

Este projeto está configurado para ser hospedado como uma aplicação única em plataformas como:

### Deploy no Render

1. Crie uma conta no [Render](https://render.com/)
2. Conecte seu repositório do GitHub
3. Crie um novo Web Service com as seguintes configurações:
   - **Build Command**: `npm install && npm run deploy`
   - **Start Command**: `npm start`
   - **Environment Variables**: Configure as variáveis de ambiente necessárias

### Deploy no Railway

1. Crie uma conta no [Railway](https://railway.app/)
2. Conecte seu repositório do GitHub
3. Configure o comando de início: `npm start`
4. Adicione as variáveis de ambiente necessárias

### Deploy no Heroku

1. Crie uma conta no [Heroku](https://www.heroku.com/)
2. Instale o Heroku CLI e faça login
3. Execute os seguintes comandos:

```bash
heroku create barberagem-app
git push heroku main
```

## Credenciais de Administrador Padrão

- **Email**: aires@barberagemclub.com
- **Senha**: admin123

**Importante**: Altere essas credenciais após o primeiro login por motivos de segurança.

## Estrutura de Arquivos

```
/
├── backend/           # Código do servidor
│   ├── routes/        # Rotas da API
│   ├── database.js    # Configuração do banco de dados
│   ├── server.js      # Servidor Express
│   └── setup-admin.js # Script para criar admin inicial
├── frontend/          # Arquivos HTML, CSS e JS
├── public/            # Diretório gerado para deploy
├── .env.example       # Exemplo de configuração
├── deploy.js          # Script de preparação para deploy
└── package.json       # Dependências e scripts
```

## Licença

Todos os direitos reservados © 2025 Barberagem Club