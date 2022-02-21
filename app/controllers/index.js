const nodemailer = require('nodemailer');
const path = require('path');

//@ function for send mail
module.exports = ({ nom, prenom, email }) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password_mail,
    },
  });
  //   Hoodzpronos1@gmail.com
  let mailOptions = {
    from: 'CHOISIR MUTUELLE',
    to: 'zbatty1297@gmail.com',
    subject: 'CHOISIR MUTUELLE',
    email: email,
    name: nom,
    prenom,
    attachments: [
      {
        filename: `${nom}${prenom}.pdf`,
        path: path.join(__dirname, '../../mutuelle.pdf'), // <= Here
        contentType: 'application/pdf',
      },
    ],
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      res.status(200).json({ message: 'E-mail envoyé avec succès from email' });
      console.log('E-mail envoyé avec succès');
    }
  });
};
