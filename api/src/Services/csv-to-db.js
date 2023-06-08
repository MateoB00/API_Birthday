const fs = require('fs');
const csv = require('fast-csv');
const User = require('../Models/user');

exports.UploadCsvDataToMySQL = (filePath) => {
    let stream = fs.createReadStream(filePath);

    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            csvData.shift();

            for (let i = 0; i < csvData.length; i++) {
                const user = csvData[i][0]
                const champsUser = user.split(';');
                // console.log(champsUser)
                // if (date = '10/02/2022'){
                //     faire ça sinon nn
                // }
                console.log(champsUser[0])
                const rawDate = champsUser[3];
                const day = rawDate.substring(0, 2);
                const month = rawDate.substring(3, 5);
                const year = rawDate.substring(6, 10);
                const formattedDate = `${year}-${month}-${day}`;

                User.create(champsUser[0], champsUser[1], champsUser[2], formattedDate, (result) => {
                    res.json(result);
                })
            }

            // delete file after saving to MySQL database
            fs.unlinkSync(filePath)
        });

    stream.pipe(csvStream);
}