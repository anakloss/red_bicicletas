const request = require("request");
const Bicicleta = require("../../models/bicicleta");
const server = require('../../bin/www');

describe('Bicicleta API', () => {
    describe('GET Bicicletas /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            let bici = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
            Bicicleta.add(bici);

            request.get('http://localhost:3000/api/bikes', (err, res, body) => {
                expect(res.statusCode).toBe(200);
            });
        });
    });
});

describe('Bicicleta API', () => {
    describe('POST Bicicletas /create', () => {
        it('Status 200', (done) => {
            let headers = {'content-type': 'application/json'};
            let bici = '{"id": 10, "color": "verde", "modelo": "urbana", "lat": -32.063642, "lng": -60.637726}';

            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bikes/create',
                body: bici
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(Bicicleta.findById(10).color).toBe("verde");
                    done();
                }
            );
        });
    });
});

describe('Bicicleta API', () => {
    describe('DELETE Bicicletas /delete', () => {
        it('Status 204', (done) => {
            let bici1 = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
            let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.063012, -60.634990]);
            Bicicleta.add(bici1);
            Bicicleta.add(bici2);

            request.delete({
                headers: {'content-type': 'application/json'},
                url: 'http://localhost:3000/api/bikes/delete', 
                body: '{"id": 1}' 
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(204);
                    done();
                }
            );
        });
    });
});

describe('Bicicleta API', () => {
    describe('POST Bicicletas /update', () => {
        it('Status 200', (done) => {
            let headers = {'content-type': 'application/json'};
            let bici1 = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
            let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.063012, -60.634990]);
            Bicicleta.add(bici1);
            Bicicleta.add(bici2);

            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bikes/update',
                body: '{"id": 1, "color": "verde", "modelo": "montaña"}'
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(Bicicleta.findById(1).color).toBe("verde");
                    expect(Bicicleta.findById(1).modelo).toBe("montaña");
                    done();
                }
            );
        });
    });
});