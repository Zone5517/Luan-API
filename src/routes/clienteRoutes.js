const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/clientes', clienteController.create);
router.get('/clientes', clienteController.getAll);
router.get('/clientes/:codigo', clienteController.getById);
router.put('/clientes/:codigo', clienteController.update);
router.delete('/clientes/:codigo', clienteController.delete);

module.exports = router;