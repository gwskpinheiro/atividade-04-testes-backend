# 📚 ATIVIDADE — Testes de Software (Backend)

API REST com Node.js, Express, Sequelize e MySQL. Módulos: Livros, Usuários, Empréstimos e Multas.

---

## ✅ Pré-requisitos

Antes de começar, verifique se tem instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [XAMPP](https://www.apachefriends.org/) (para rodar o MySQL)
- [Git](https://git-scm.com/) (opcional)

---

## 🚀 Passo a Passo para Rodar

### 1. Abra o XAMPP e inicie o MySQL

Abra o **XAMPP Control Panel** e clique em **Start** no MySQL.

---

### 2. Crie o banco de dados

Acesse o phpMyAdmin em `http://localhost/phpmyadmin` e crie um banco chamado:

```
atividade04
```

---

### 3. Configure o arquivo `.env`

Na pasta do projeto, abra o arquivo `.env` e preencha assim:

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=atividade04
```

> ⚠️ Se o seu MySQL tiver senha, coloque em `DB_PASSWORD`.

---

### 4. Instale as dependências

Abra o terminal na pasta do projeto e rode:

```bash
npm install
```

---

### 5. Rode as migrations (cria as tabelas no banco)

```bash
npx sequelize-cli db:migrate
```

Isso vai criar automaticamente as tabelas:
- `livros`
- `usuarios`
- `emprestimos`
- `multas`

---

### 6. Suba o servidor

**Abra um terminal** e rode:

```bash
npm start
```

Deve aparecer:
```
Rodando na porta 3000 e Banco Sincronizado com sucesso!
```

> ⚠️ Deixe esse terminal aberto!

---

### 7. Rode os testes

**Abra um segundo terminal** (sem fechar o primeiro) e rode:

```bash
npm test
```

---

## ❗ Problemas comuns

**Erro: `Cannot find module 'dotenv'`**
```bash
npm install
```

**Erro: `Access denied for user`**
- Verifique se o MySQL está rodando no XAMPP
- Verifique as credenciais no `.env`

**Erro: `ECONNREFUSED`**
- O servidor não está rodando → rode `npm start` em outro terminal

**Testes com `AggregateError`**
- Servidor não está rodando → rode `npm start` primeiro
