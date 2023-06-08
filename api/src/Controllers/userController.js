const User = require('../Models/user');
const CsvToDb = require('../Services/csv-to-db')

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

exports.addUsers = (req, res) => {
    CsvToDb.UploadCsvDataToMySQL('./uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database ');
}