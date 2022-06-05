const Bicicleta = require("../../models/bicicleta");

beforeEach(() => Bicicleta.allBicis = []);

describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let bici = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
        Bicicleta.add(bici);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(bici);
    });
});

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con ID 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let bici1 = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
        let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.063012, -60.634990]);
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);

        let targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(bici1.color);
        expect(targetBici.modelo).toBe(bici1.modelo);
    });
});

describe('Bicicleta.removeById', () => {
    it('se elimina la bici con ID 2', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let bici1 = new Bicicleta(1, "blanco", "urbana", [-32.063642, -60.637726]);
        let bici2 = new Bicicleta(2, "rojo", "montaña", [-32.063012, -60.634990]);
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);

        let targetBici = Bicicleta.removeById(2);
        expect(Bicicleta.allBicis.length).toBe(1);
    });
});