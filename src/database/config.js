require('dotenv').config();

module.exports = {
  development: {
    username: 'root',     
    password: '',          
    database: 'atividade04', 
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  test: {
    
    username: 'root',
    password: '',
    database: 'atividade04_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};