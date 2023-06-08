module.exports = (server) => {
    const userController = require('../Controllers/userController')
    const upload = require('../Config/multer.config')

    server.route('/')
        .get(userController.listAllWhereBirthdayAtToday)
    server.route('/add-users')
        .post(
            upload.single('file'),
            userController.addUsers
            )
}