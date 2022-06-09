const mongoose = require('mongoose');
const Bicicleta = require("../../models/bicicleta");


describe('Testing Bicicletas', () => {
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


    describe('Bicicleta.createInstance', () => {
        it('Crea una instancia de Bicicleta', () => {
            let bici = Bicicleta.createInstance(1, "verde", "urbano", [-32.063642, -60.637726]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbano");
            expect(bici.ubicacion[0]).toBe(-32.063642);
            expect(bici.ubicacion[1]).toBe(-60.637726);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            let aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
            Bicicleta.add(aBici, function(err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                let aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
                Bicicleta.add(aBici, function(err, newBici) {
                    if (err) console.log(err);

                    let aBici2 = new Bicicleta({code: 2, color: "rojo", modelo: "urbano"});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function(error, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe eliminar la bici con code 2', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                
                let aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
                Bicicleta.add(aBici, function(err, newBici) {
                    if (err) console.log(err);

                    let aBici2 = new Bicicleta({code: 2, color: "rojo", modelo: "urbano"});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.removeByCode(2, function(error, targetBici) {
                            expect(Bicicleta.allBicis.length).toBe(1);
                            done();
                        });

                    });
                });
            });
        });
    });

});




// beforeEach(() => Bicicleta.allBicis = []);

// describe('Bicicleta.allBicis', () => {
//     it('comienza vacia', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     });
// });

// describe('Bicicleta.add', () => {
//     it('agregamos una', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         let bici = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
//         Bicicleta.add(bici);
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(bici);
//     });
// });

// describe('Bicicleta.findById', () => {
//     it('debe devolver la bici con ID 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         let bici1 = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
//         let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.063012, -60.634990]);
//         Bicicleta.add(bici1);
//         Bicicleta.add(bici2);

//         let targetBici = Bicicleta.findById(1);
//         expect(targetBici.id).toBe(1);
//         expect(targetBici.color).toBe(bici1.color);
//         expect(targetBici.modelo).toBe(bici1.modelo);
//     });
// });

// describe('Bicicleta.removeById', () => {
//     it('se elimina la bici con ID 2', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         let bici1 = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
//         let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.063012, -60.634990]);
//         Bicicleta.add(bici1);
//         Bicicleta.add(bici2);

//         let targetBici = Bicicleta.removeById(2);
//         expect(Bicicleta.allBicis.length).toBe(1);
//     });
// });