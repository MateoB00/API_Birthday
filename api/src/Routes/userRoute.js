module.exports = (server) => {
    const userController = require('../Controllers/userController')
    const upload = require('../Config/multer.config')

    server.route('/add-users')
        .post(
            upload.single('file'),
            userController.addUsers
            )
    server.route('/email')
        .get(userController.sendEmail)
    server.route('/')
        .get(userController.listAllWhereBirthdayAtToday)

}
