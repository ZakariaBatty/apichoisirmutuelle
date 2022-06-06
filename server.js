//@ DOT ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './app/config/.env' });
}

//@ REQUIRE PACHAGE
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const pdf = require('html-pdf');
const pdfTemplate = require('./app/documents/');
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

app.get('/', (req, res) => {
  res.status(200).json({ message: 'api working good' });
  console.log('api working good');
});

const sendMail = (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      user: 'choisirmutuel@gmail.com',
      pass: 'choisirmutuel123',
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
      return res
        .status(500)
        .json({ error: 'Tentative infructueuse, réessayez email' });
    } else {
      return res
        .status(200)
        .json({ message: 'E-mail envoyé avec succès from email' });
    }
  });
};

const createPdf = async (req, res) => {
  try {
    await pdf.create(pdfTemplate(req.body), {}).toFile('mutuelle.pdf', err => {
      return new Promise(resolve => {
        if (err) resolve(err);
        if (!err) sendMail(req, res);
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Tentative infructueuse, réessayez pdf' });
  }
};

//@ USE ROUTER
app.post('/create-pdf', jsonParser, async (req, res, callback) => {
  // await createPdf(req, res, callback);
  await sendMail(req, res, callback);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running at on port ${PORT}`);
});
