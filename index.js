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
const sendMail = require('./app/controllers');

//@ setting cors
const corsOptions = {
  origin: process.env.ORIGIN_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  changeOrigin: true,
};

//@ MIDDLEWERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

//@ USE ROUTER
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('mutuelle.pdf', err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error:
          "Répétez encore et encore, une erreur s'est produite dans le fonctionnement",
      });
    }
    if (sendMail(req.body)) {
      console.log('good');
      res.status(200).json({ message: 'E-mail envoyé avec succès' });
    }
  });
});

app.get('/', (req, res) => {
  return res.status(200).json({ message: ' a read working' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running at on port ${PORT}`);
});
