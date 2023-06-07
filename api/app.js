const express = require('express');

const hostname = "localhost";
const port = 3004;
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const userRoute = require('./src/Routes/userRoute')
userRoute(server);

server.listen(port, hostname, () => {
    console.log(`Serveur qui retourne le port ${port}`)
})