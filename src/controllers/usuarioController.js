const usuarioService = require('../services/usuarioService');

const listarTodos = async (req, res) => {
    try {
        const usuarios = await usuarioService.listarTodos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const criar = async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        // Regras do professor: Nome e email são obrigatórios (Erro 400)
        if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });
        if (!email) return res.status(400).json({ erro: 'Email é obrigatório' });

        // Regra do professor: Não pode ter e-mail duplicado (Erro 400)
        const emailJaExiste = await usuarioService.buscarPorEmail(email);
        if (emailJaExiste) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        const novoUsuario = await usuarioService.criarUsuario({ nome, email, senha, tipo });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body; // Pega tudo que vier no body para atualizar

        const usuarioAtualizado = await usuarioService.atualizarUsuario(id, dados);

        if (!usuarioAtualizado) {
            return res.status(404).json({ erro: 'Usuário não encontrado para atualizar' });
        }

        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletado = await usuarioService.deletarUsuario(id);

        if (!deletado) {
            return res.status(404).json({ erro: 'Usuário não encontrado para deletar' });
        }

        res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };