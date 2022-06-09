const request = require("request");
const mongoose = require('mongoose');
const Bicicleta = require("../../models/bicicleta");
const server = require('../../bin/www');

const base_url = 'http://localhost:5000/api/bikes';

describe('Bicicleta API', () => {
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
                expect(res.bikes.length).toBe(0);
                done();
            });
        });
    });

    describe('POST Bicicletas /create', () => {
        it('Status 200', (done) => {
            let headers = {'content-type': 'application/json'};
            let aBici = '{"id": 10, "color": "verde", "modelo": "urbana", "lat": -32.06, "lng": -60.63}';

            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    let bici = JSON.parse(body).bicicleta;
                    console.log(bici);
                    expect(bici.color).toBe("rojo");
                    expect(bici.ubicacion[0]).toBe(-32.06);
                    expect(bici.ubicacion[1]).toBe(-60.63);
                    done();
                }
            );
        });
    });

    // describe('DELETE Bicicletas /delete', () => {
    //     it('Status 204', (done) => {
    //         let bici1 = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
    //         let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.063012, -60.634990]);
    //         Bicicleta.add(bici1);
    //         Bicicleta.add(bici2);

    //         request.delete({
    //             headers: {'content-type': 'application/json'},
    //             url: 'http://localhost:3000/api/bikes/delete', 
    //             body: '{"id": 1}' 
    //             }, (err, res, body) => {
    //                 expect(res.statusCode).toBe(204);
    //                 done();
    //             }
    //         );
    //     });
    // });

    // describe('POST Bicicletas /update', () => {
    //     it('Status 200', (done) => {
    //         let headers = {'content-type': 'application/json'};
    //         let bici1 = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
    //         let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.063012, -60.634990]);
    //         Bicicleta.add(bici1);
    //         Bicicleta.add(bici2);

    //         request.post({
    //             headers: headers,
    //             url: 'http://localhost:3000/api/bikes/update',
    //             body: '{"id": 1, "color": "verde", "modelo": "montaña"}'
    //             }, (err, res, body) => {
    //                 expect(res.statusCode).toBe(200);
    //                 expect(Bicicleta.findById(1).color).toBe("verde");
    //                 expect(Bicicleta.findById(1).modelo).toBe("montaña");
    //                 done();
    //             }
    //         );
    //     });
    // });


});
