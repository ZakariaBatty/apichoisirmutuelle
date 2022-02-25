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
app.post('/create-pdf', cors(), (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('mutuelle.pdf', err => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: 'E-mail envoyé avec succès' });
      console.log('E-mail envoyé avec succès');
    }
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running at on port ${PORT}`);
});
