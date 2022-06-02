// Crear servidor con Express
const express = require('express');


// Crear servidor sin Express
/*
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo!\n');
});

server.listen(port, hostname, () => {
    console.log(`Servidor está corriendo sobre http://${hostname}:${port}`);
});
*/