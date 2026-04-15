require('dotenv').config();

module.exports = {
  development: {
    username: 'root',      // Forçamos o usuário do XAMPP
    password: '',          // Senha vazia do XAMPP
    database: 'atividade04', // Nome do banco que você criou
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  test: {
    // Pode repetir ou deixar como está
    username: 'root',
    password: '',
    database: 'atividade04_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};