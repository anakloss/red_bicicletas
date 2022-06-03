const express = require('express');

var router = express.Router();
const biciletaController = require('../controllers/bicicleta');

router.get('/', biciletaController.bicicleta_list);
router.get('/create', biciletaController.bicicleta_create_get);
router.post('/create', biciletaController.bicicleta_create_post);

module.exports = router;