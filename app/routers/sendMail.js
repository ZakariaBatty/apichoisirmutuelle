module.exports = function (app) {
  const mail = require('../controllers');
  app.post('/send-mail', mail.sendMail);
};
