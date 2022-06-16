const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios');

router.get('/', usuariosController.list);
router.get('/create', usuariosController.create_get);
router.post('/create', usuariosController.create);
router.post('/:id/delete', usuariosController.delete);
router.get('/:id/update', usuariosController.update_get);
router.post('/:id/update', usuariosController.update);

module.exports = router;