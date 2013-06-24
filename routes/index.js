var nodemailer = require("nodemailer");
var gmailAuth = require('../config.js').gmailAuth

// GET home page
exports.index = function(req, res){
  res.render('story');
};

// POST home page
exports.apply = function(req, res){
  console.log('Application Received');

  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: gmailAuth
  });

  var mailOptions = {
    from: "potomaccodecamp@gmail.com",
    to: "amukunda15@amherst.edu",
    subject: "Test Email",
    text: "Did it work?",
    html: "<b>Hello World</b>"
  }

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){ 
      console.log(error); 
    } else {
      console.log("Message Sent: " + response.message);
    }

    smtpTransport.close();
  });

  res.render('story');
};