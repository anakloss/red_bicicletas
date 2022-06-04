// Agrega mapa
var map = L.map('main_map').setView([-32.0649707,-60.6406084], 15.4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // maxZoom: 19,
    zoomSnap: 0.25,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Crear pin
L.marker([-32.0708476,-60.6360913]).addTo(map).bindPopup("<b>Plaza 9 de Julio</b>");
L.marker([-32.067417, -60.642377]).addTo(map).bindPopup("<b>Plaza San Martín</b>");
L.marker([-32.061018,-60.6444077]).addTo(map).bindPopup("<b>Mirador \"Hernán Pujato\"</b>").openPopup();

$.ajax({
    dataType: "json",
    url: "API/bikes",
    success: (result) => {
        console.log(result);
        result.bicicletas.forEach(function (bici) {
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
        });
    }
})