const express = require('express');

var router = express.Router();
const biciletaController = require('../controllers/bicicleta');

router.get('/', biciletaController.bicicleta_list);
router.get('/create', biciletaController.bicicleta_create_get);
router.post('/create', biciletaController.bicicleta_create_post);
router.post('/:id/delete', biciletaController.bicicleta_delete_post);
router.get('/:id/update', biciletaController.bicicleta_update_get);
router.post('/:id/update', biciletaController.bicicleta_update_post);

module.exports = router;