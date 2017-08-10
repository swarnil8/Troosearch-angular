
var mailUtil = module.exports;

var nodemailer = require("nodemailer");

mailUtil.NoReply = function(to, subject, html) {

  var smtpTransport = nodemailer.createTransport({
    service: "Godaddy",
    auth: {
      user: "contact@aimcomely.com",
      pass: "thisissparta"
    }
  });

  var mailOptions = {
    to: to,
    from: 'MyHealthBuddy <no-reply@myhealthbuddy.in>',
    subject: subject,
    html: html
  };


  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('SENT');
    }
  });

};

mailUtil.Gmail = function(to, subject, html) {

  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "myhealthbuddy993@gmail.com",
      pass: "healthbuddy993",
    }
  });

  var mailOptions = {
    to: to,
    subject: subject,
    html: html
  };


  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else {

      console.log('SENT');

    }
  });

};
