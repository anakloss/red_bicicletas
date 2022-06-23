const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/usuario');

module.exports = {
    authenticate: (req, res, next) => {
        Usuario.findOne({ email: req.body.email}, (err, userInfo) => {
            if (err ){
                next(err);
            } else {
                if (userInfo === null) { return res.status(401).json({status:"error", message: "invalido email/password", data: null}) };
                if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '7d' });
                    res.status(200).json({message: "Usuario encontrado", data: {usuario: userInfo, token: token}});
                } else {
                    res.status(401).json({status: "error", message: "Invalido email/password", data: null});
                }
            }
        })
    },
    forgotPassword: (req, res, next) => {
        Usuario.findOne({email: req.body.email}, (err, usuario) => {
            if (!usuario) return res.status(401).json({ message: "No existe el usuario", data: null });
            usuario.resetPassword((err) => {
                if (err) return next(err);
                res.status(200).json({message: "Se envio un email para reestablecer el password", data: null});
            });
        });
    }
}