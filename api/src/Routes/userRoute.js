module.exports = (server) => {
    const userController = require('../Controllers/userController')

    server.route('/users')
        .get(userController.listAllUsers)
    server.route('/')
        .get(userController.listAllWhereBirthdayAtToday)
}