const nodemailer = require('nodemailer');
const path = require('path');

//@ function for send mail
module.exports = async ({ nom, prenom, email }) => {
  const transporter = await nodemailer.createTransport({
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
  const mailOptions = {
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
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Not workin' });
    } else {
      return res
        .status(200)
        .json({ message: 'E-mail envoyé avec succès from email' });
    }
  });
};
