const User = require('../Models/user');
const CsvToDb = require('../Services/csv-to-db')
const nodemailer = require('nodemailer');

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

exports.sendEmail = (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        auth: {
          user: '972457af591921',
          pass: '4f28b98ae8e89e',
        },
      });
    User.allWhereBirthdayAtToday((results) => {
        results.forEach((user) => {
            const message = {
                from: 'mbscbl91@gmail.com', 
                to: user.email,
                subject: 'Joyeux anniversaire !',
                text: `Bonjour ${user.firstName} ${user.lastName},\n\nJoyeux anniversaire !`, 
                html: `<p>Bonjour ${user.firstName} ${user.lastName},</p><p>Joyeux anniversaire !</p>`, 
              };
      
          transporter.sendMail(message, (error, info) => {
              if (error) {
                  console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
              } else {
                  console.log('E-mail envoyé :', info.response);
              }
              });
          });
      
          res.send('E-mails d\'anniversaire envoyés');
    })
}