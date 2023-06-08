const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        mkdirp(uploadDir, (err) => cb(err, uploadDir));
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.fieldname + "-" + Date.now() + "-" + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

module.exports = upload;