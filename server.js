const express = require('express');

const server = express();
const Projects = require('./data/helpers/projectModel');
const Actions = require('./data/helpers/actionModel');
const projectRouter = require('./projectRouter')

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).send("Welcome!")
});

server.use('/projects', projectRouter)

//path === projects/:id/actions/


module.exports = server;