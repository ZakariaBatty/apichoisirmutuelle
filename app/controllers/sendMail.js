const nodemailer = require('nodemailer');

//@ function for send mail
exports.sendMail = (req, res) => {
  const { name, email, subject } = req.body;
  console.log({ name, email, subject });
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
    subject: 'test',
    email: email,
    name: name,
    html: `<p>email : ${email}</p> <br/> <p>name : ${name}</p> <br/> <p>subject : ${subject}</p>`,
     attachments: [
        {
           filename: 'text1.pdf',
            content: 'hello world!'
        }]
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
    }
  });
};
