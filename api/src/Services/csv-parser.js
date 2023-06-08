const fs = require('fs');
const multer = require('multer');
const path = require('path')
const csv = require('fast-csv')

let storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
        callBack(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname),
        )
    },
})

let upload = multer({
    storage: storage,
})

exports.readCsvFileToAddUsers = (csvUrl) => {
    console.log(csvUrl)
    let stream = fs.createReadStream(csvUrl)
    let collectionCsv = []
    let csvFileStream = csv
        .parse()
        .on('data', function (data) {
            collectionCsv.push(data)
        })
        .on('end', function () {
            collectionCsv.shift()
            db.connect((error) => {
                if (error) {
                    console.error(error)
                } else {
                    let query = 'INSERT INTO user (firstName, lastName, email, birthdayDate) VALUES ?, ?, ?, ?'
                    db.query(query, [collectionCsv], (error, res) => {
                        console.log(error || res)
                    })
                }
            })
            fs.unlinkSync(csvUrl)
        })
    stream.pipe(csvFileStream)
}
