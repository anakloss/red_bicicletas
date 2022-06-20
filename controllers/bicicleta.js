const Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = (req, res) => {
    Bicicleta.allBicis().exec((err, bicis) => {
        res.render('bicicletas/index', {bicis});
    });
}

exports.bicicleta_create_get = (req, res) => 
    res.render('bicicletas/create');

exports.bicicleta_create_post = (req, res) => {
    let bici = new Bicicleta({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo
    });
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    res.redirect('/bikes');
}

exports.bicicleta_delete_post = (req, res) => {
    Bicicleta.removeById(req.body.id);

    res.redirect('/bikes');
}

exports.bicicleta_update_get = (req, res) => {
    Bicicleta.findById(req.params.id).exec((err, bici) => {
         res.render('bicicletas/update', {bici});
    });
}

exports.bicicleta_update_post = (req, res) => {
    let update_values = {
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    };

    Bicicleta.findByIdAndUpdate(req.params.id, update_values, (err, bicicleta) => {
        if (err)
            res.render('bikes/update', {errors: err.errors, bicicleta});
        else {
            res.redirect('/bikes');
            return;
        }
    });
    
}
