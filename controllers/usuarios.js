const Usuario = require('../models/usuario');

module.exports = {
    list: function(req, res, next) {
        Usuario.find({}, (err, usuarios) => {
            res.render('usuarios/index', {usuarios: usuarios});
        });
    },
    // update_get: function()
};