const Usuario = require('../../models/usuario');

exports.usuario_list = (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        res.status(200).json({
            usuarios: usuarios
        });
    });
};

exports.usuario_create = (req, res) => {
    let usuario = new Usuario({nombre: req.body.nombre, email: req.body.email, password: req.body.password});
    usuario.save((err) => {
        res.status(200).json(usuario);
    });
};

exports.usuario_reservar = (req, res) => {
    Usuario.findById(req.body.id, (err, usuario) => {
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, (err) => {
            console.log('reserva !!!!');
            res.status(200).send();
        });
    });
};