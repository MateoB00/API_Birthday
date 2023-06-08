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

    const users = [
        {
          prenom: 'Ariel',
          nom: 'Ngoualem',
          email: 'Arielngoualem@gmail.com',
        },
      ];

      users.forEach((user) => {
        const message = {
          from: 'mbdcbl91@gmail.com', // Adresse e-mail de l'expéditeur
          to: user.email, // Adresse e-mail du destinataire
          subject: 'Joyeux anniversaire !', // Sujet de l'e-mail
          text: `Bonjour ${user.prenom} ${user.nom},\n\nJoyeux anniversaire !`, // Corps de l'e-mail au format texte
          html: `<p>Bonjour ${user.prenom} ${user.nom},</p><p>Joyeux anniversaire !</p>`, // Corps de l'e-mail au format HTML
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
}