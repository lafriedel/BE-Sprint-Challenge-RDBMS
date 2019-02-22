const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require('./knexfile')

const server = express();
const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.listen(8000, (req, res) => {
    console.log("Server listening on port 8000");
})
