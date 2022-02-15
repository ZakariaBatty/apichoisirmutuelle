//@ DOT ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './app/config/.env' });
}
//@ REQUIRE PACHAGE
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();

const corsOptions = {
    origin: process.env.ORIGIN_URL,
    optionsSuccessStatus: 200 
  };

//@ MIDDLEWERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//@ USE ROUTER
require('./app/routers/sendMail')(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running at on port ${PORT}`);
});
