const express = require('express');
const cron = require("node-cron");
const security = require('./src/Middlewares/security');

const hostname = "localhost";
const port = 3004;
const server = express();
const userController = require('./src/Controllers/userController')
 
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(security.allowOnlyLocalhostAndDomains)

const userRoute = require('./src/Routes/userRoute')
userRoute(server);

server.listen(port, hostname, () => {
    console.log(`Serveur qui retourne le port ${port}`)
})


cron.schedule('0 0 8 * * *', () => {
    userController.sendEmail()
});