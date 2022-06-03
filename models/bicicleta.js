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
Bicicleta.add = function(aBici) {
    Bicicleta.allBicis.push(aBici);
}

var a = new Bicicleta(1, "blanco", "urbana", [-32.0708476,-60.6360913]);
var b = new Bicicleta(2, "rojo", "urbana", [-32.067417, -60.642377]);

Bicicleta.add(a);
Bicicleta.add(b);


module.exports = Bicicleta;