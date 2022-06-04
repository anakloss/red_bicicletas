var Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toSring = function () {
    return `id: ${this.id} | color: ${this.color}`;
}

Bicicleta.allBicis = [];
Bicicleta.add = (aBici) => Bicicleta.allBicis.push(aBici);

Bicicleta.findById = (aBiciId) => {
    let aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if (aBici)
        return aBici;
    else
        throw new Error(`No existe una bicicleta con el ID: ${aBiciId}`);
}

Bicicleta.removeById = (aBiciId) => {
    for (let i = 0; i < Bicicleta.allBicis.length; i++) {
        if (Bicicleta.allBicis[1].id == aBiciId) {
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
        
    }
}

var a = new Bicicleta(1, "blanco", "urbana", [-32.0708476,-60.6360913]);
var b = new Bicicleta(2, "rojo", "urbana", [-32.067417, -60.642377]);

Bicicleta.add(a);
Bicicleta.add(b);


module.exports = Bicicleta;