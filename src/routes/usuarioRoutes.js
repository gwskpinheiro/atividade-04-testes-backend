const { Router } = require('express');
const { criar, buscarPorId, atualizar, listarTodos, deletar } = require('../controllers/usuarioController');

const router = Router();

router.get("/", listarTodos);
router.post("/", criar);
router.get("/:id", buscarPorId);
router.put("/:id", atualizar);
router.delete("/:id", deletar);

module.exports = router;