const { Usuario } = require('../models');

const listarTodos = async () => {
  return await Usuario.findAll();
};

const buscarPorId = async (id) => {
  return await Usuario.findByPk(id);
};

// Precisamos dessa função para verificar e-mails duplicados
const buscarPorEmail = async (email) => {
  return await Usuario.findOne({ where: { email } });
};

const criarUsuario = async (dados) => {
  return await Usuario.create(dados);
};

const atualizarUsuario = async (id, dados) => {
  const usuario = await Usuario.findByPk(id);
  
  if (!usuario) return null;

  await usuario.update(dados);
  return usuario;
};

const deletarUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  
  if (!usuario) return false;
  
  await usuario.destroy();
  return true;
};

module.exports = { 
  listarTodos, 
  buscarPorId, 
  buscarPorEmail, 
  criarUsuario, 
  atualizarUsuario, 
  deletarUsuario 
};