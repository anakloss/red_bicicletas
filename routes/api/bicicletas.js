const express = require('express');

var router = express.Router();
const biciletaController = require('../../controllers/api/bicicletaControllerAPI');

router.get('/', biciletaController.bicicleta_list);
router.post('/create', biciletaController.bicicleta_create);
router.delete('/delete', biciletaController.bicicleta_delete);
router.post('/update', biciletaController.bicicleta_update);

module.exports = router;