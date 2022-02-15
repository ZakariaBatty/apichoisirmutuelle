module.exports = function (app) {
  const mail = require('../controllers/sendMail');
  app.post('/send-mail', mail.sendMail);
};
