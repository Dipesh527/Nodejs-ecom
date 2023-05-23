// "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
    function sendEmail(mailOptions) {


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
   transporter.sendMail({
    from: mailOptions.from, // sender address
    to: mailOptions.to, // list of receivers
    subject: mailOptions.subject, // Subject line
    text: mailOptions.text, // plain text body
    html: mailOptions.html, // html body
  });

  console.log("Message sent");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

module.exports = sendEmail
