const { Multa, Emprestimo } = require('../models');

const criarMulta = async (emprestimo_id, valor) => {
    const emprestimo = await Emprestimo.findByPk(emprestimo_id);
    if (!emprestimo) throw new Error('Empréstimo não encontrado');

    const multaExistente = await Multa.findOne({ where: { emprestimo_id } });
    if (multaExistente) throw new Error('Já existe uma multa para este empréstimo');

    const multa = await Multa.create({ emprestimo_id, valor, pago: false });
    return multa.toJSON();
};

const listarMultas = async () => {
    return await Multa.findAll();
};

const pegarPorId = async (id) => {
    return await Multa.findByPk(id);
};

const pegarPorEmprestimo = async (emprestimo_id) => {
    return await Multa.findAll({ where: { emprestimo_id } });
};

const pagarMulta = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) throw new Error('Multa não encontrada');
    if (multa.pago) throw new Error('Multa já foi paga');

    multa.pago = true;
    await multa.save();
    return multa;
};

const deletarMulta = async (id) => {
    return await Multa.destroy({ where: { id } });
};

module.exports = {
    criarMulta,
    listarMultas,
    pegarPorId,
    pegarPorEmprestimo,
    pagarMulta,
    deletarMulta,
};
