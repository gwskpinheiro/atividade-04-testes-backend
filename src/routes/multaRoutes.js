const { Router } = require('express');
const { criar, listar, buscarPorId, buscarPorEmprestimo, pagar, deletar } = require('../controllers/multaController');

const router = Router();

router.post('/', criar);
router.get('/', listar);
router.get('/emprestimo/:emprestimo_id', buscarPorEmprestimo);
router.get('/:id', buscarPorId);
router.patch('/:id/pagar', pagar);
router.delete('/:id', deletar);

module.exports = router;
