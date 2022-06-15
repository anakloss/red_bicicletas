const mongoose = require('mongoose');
const Bicicleta = require("../../models/bicicleta");
const server = require('../../bin/www');
const request = require('request');


const base_url = 'http://localhost:3000/api/bikes';

describe('Bicicleta API', () => {
    beforeAll(function(done) {
        mongoose.disconnect();
        done();
    });

    beforeEach(function(done) {
        const mongoDB = 'mongodb://localhost/red_bicicletas_test';
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test DB');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, (err, success) => {
            if (err) console.log(err);
            mongoose.disconnect(err);
            done();
        });
    });

    describe('GET Bicicletas /', () => {
        it('Status 200', (done) => {
            request.get(base_url, function(err, res, body) {
                let result = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe('POST Bicicletas /create', () => {
        it('Status 200', (done) => {
            let headers = {'content-type': 'application/json'};
            let aBici = '{"code": 10, "color": "verde", "modelo": "montaña", "lat": -32.06, "lng": -60.63}';

            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
                }, function(err, res, body) {
                    expect(res.statusCode).toBe(200);
                    let bici = JSON.parse(body).bicicletas;
                    console.log(bici);
                    expect(bici.color).toBe("verde");
                    expect(bici.ubicacion[0]).toBe(-32.06);
                    expect(bici.ubicacion[1]).toBe(-60.63);
                    done();
                }
            );
        });
    });

    describe('DELETE Bicicletas /delete', () => {
        it('Status 204', (done) => {
            let a = Bicicleta.createInstance(1, "blanco", "urbana", [-32.06, -60.63]);
            // let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.06, -60.63]);

            Bicicleta.add(a, function(err, newBici) {
                request.delete({
                    headers: {'content-type': 'application/json'},
                    url: base_url + '/delete', 
                    body: '{"code": 1}'
                    }, (err, res, body) => {
                        expect(res.statusCode).toBe(204);
                        done();
                    }
                );
            });
        });
    });

    describe('POST Bicicletas /update', () => {
        it('Status 200', (done) => {
            let a = Bicicleta.createInstance(1, "blanco", "urbana", [-32.06, -60.63]);

            Bicicleta.add(a, function(err, newBici) {
                request.post({
                    headers: {'content-type': 'application/json'},
                    url: base_url + '/update',
                    body: '{"code": 1, "color": "rojo", "modelo": "montaña"}'
                    }, (err, res, body) => {
                        expect(res.statusCode).toBe(200);
                        let bici = JSON.parse(body).bicicletas;
                        console.log(bici);
                        expect(bici.color).toBe("rojo");
                        expect(bici.modelo).toBe("montaña");
                        done();
                    }
                );
            });
        });
    });


});
