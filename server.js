const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.status(200).send("Welcome!")
});


module.exports = server;