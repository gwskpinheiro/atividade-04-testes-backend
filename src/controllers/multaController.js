const {
    criarMulta,
    listarMultas,
    pegarPorId,
    pegarPorEmprestimo,
    pagarMulta,
    deletarMulta,
} = require('../services/multaService');

const criar = async (req, res) => {
    try {
        const { emprestimo_id, valor } = req.body;

        if (!emprestimo_id || valor === undefined || valor === null) {
            return res.status(400).json({ message: 'emprestimo_id e valor são obrigatórios' });
        }

        if (valor <= 0) {
            return res.status(400).json({ message: 'O valor da multa deve ser maior que zero' });
        }

        const multa = await criarMulta(emprestimo_id, valor);
        res.status(201).json(multa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listar = async (req, res) => {
    const multas = await listarMultas();
    res.status(200).json(multas);
};

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    const multa = await pegarPorId(id);
    if (!multa) return res.status(404).json({ message: 'Multa não encontrada' });
    res.status(200).json(multa);
};

const buscarPorEmprestimo = async (req, res) => {
    const { emprestimo_id } = req.params;
    const multas = await pegarPorEmprestimo(emprestimo_id);
    res.status(200).json(multas);
};

const pagar = async (req, res) => {
    try {
        const { id } = req.params;
        const multa = await pagarMulta(id);
        res.status(200).json(multa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletar = async (req, res) => {
    const { id } = req.params;
    const apagado = await deletarMulta(id);
    if (!apagado) return res.status(404).json({ message: 'Multa não encontrada' });
    res.status(204).send();
};

module.exports = { criar, listar, buscarPorId, buscarPorEmprestimo, pagar, deletar };
