module.exports = (server) => {
    const userController = require('../Controllers/userController')

    server.route('/users')
        .get(userController.listAllUsers)
    server.route('/email')
        .get(userController.sendEmail)
    server.route('/')
        .get(userController.listAllWhereBirthdayAtToday)
}
