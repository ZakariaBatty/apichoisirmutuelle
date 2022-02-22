//@ DOT ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './app/config/.env' });
}

//@ REQUIRE PACHAGE
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const pdf = require('html-pdf');
const pdfTemplate = require('./app/documents');
// const sendMail = require('./app/controllers');
const nodemailer = require('nodemailer');
const path = require('path');

//@ setting cors
const corsOptions = {
  origin: process.env.ORIGIN_URL,
  // credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

app.use(cors(corsOptions));

//@ MIDDLEWERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//@ USE ROUTER
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('mutuelle.pdf', err => {
    if (err) {
      console.log(err);
    } else {
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
        from: process.env.email,
        to: 'zbatty45@gmail.com',
        subject: 'CHOISIR MUTUELLE',
        email: req.body.email,
        name: req.body.nom,
        attachments: [
          {
            filename: `${req.body.nom}${req.body.prenom}.pdf`,
            path: path.join(__dirname, './mutuelle.pdf'), // <= Here
            contentType: 'application/pdf',
          },
        ],
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error.message);
          return res.status(500).json({
            error:
              "Répétez encore et encore, une erreur s'est produite dans le fonctionnement",
          });
        } else {
          res.status(200).json({ message: 'E-mail envoyé avec succès' });
          console.log('E-mail envoyé avec succès');
        }
      });
    }
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running at on port ${PORT}`);
});
