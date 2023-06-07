const User = require('../Models/user');

exports.listAllUsers = (req, res) => {
    User.all((result) => {
        res.json(result);
    })
}

exports.listAllWhereBirthdayAtToday = (req, res) => {
    User.allWhereBirthdayAtToday((result) => {
        res.json(result);
    })
}