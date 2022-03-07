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
const path = require('path');
const nodemailer = require('nodemailer');
// choisirmutuelle.fr@gmail.com
//@ setting cors
const corsOptions = {
  origin: process.env.ORIGIN_URL,
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

app.post('/', (req, res) => {
  res.status(200).json({ message: 'E-mail envoyé avec succès from email' });
  console.log('E-mail envoyé avec succès');
});

const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('mutuelle.pdf', err => {
    if (err) {
      console.log('not working');
      return console.log(err);
    } else {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.password_mail,
        },
      });
      const mailOptions = {
        from: 'CHOISIR MUTUELLE',
        to: 'zbatty1297@gmail.com',
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
          return res.status(500).json({ message: 'Not workin' });
        } else {
          console.log('E-mail envoyé avec succès');
          return res
            .status(200)
            .json({ message: 'E-mail envoyé avec succès from email' });
        }
      });
    }
  });
};

//@ USE ROUTER
app.post('/create-pdf', async (req, res) => {
  await createPdf(req, res);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running at on port ${PORT}`);
});
