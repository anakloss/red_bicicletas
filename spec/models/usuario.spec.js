const mongoose = require('mongoose');
const Bicicleta = require("../../models/bicicleta");
const Usuario = require("../../models/usuario");
const Reserva = require("../../models/reserva");


describe('Testing Usuarios', () => {
    beforeEach(function(done) {
        const mongoDB = 'mongodb://localhost/red_bicicletas_test';
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('We are connected to test DB');
            done();
        });
    });

    afterEach(function(done) {
        Reserva.deleteMany({}, (err, success) => {
            if (err) console.log(err);
            Usuario.deleteMany({}, (err, success) => {
                if (err) console.log(err);
                Bicicleta.deleteMany({}, (err, success) => {
                    if (err) console.log(err);
                    // mongoose.disconnect(err);
                    done();
                });
            });
        });
    });


    describe('Cuando un usuario reserva una bici', () => {
        it('debe existir la reserva', (done) => {
            const usuario = new Usuario({nombre: 'Ezequiel'});
            usuario.save();
            const bicicleta = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
            bicicleta.save();

            let hoy = new Date();
            let mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);
            usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva) {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas) {
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        });
    });

});
