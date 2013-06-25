var nodemailer = require("nodemailer");
var gmailAuth = require('../config.js').gmailAuth;

// GET home page
exports.index = function(req, res){
  res.render('story');
};

// POST home page
exports.apply = function(req, res){
  console.log('Application Received');

  var camperFirstName = req.body.camperFirstName,
      camperLastName = req.body.camperLastName,
      camperAge = req.body.camperAge,
      camperGender = req.body.camperGender,
      camperGrade = camperGrade,
      camperAllergies = req.body.camperAllergies,
      parentFirstName = req.body.parentFirstName,
      parentLastName = req.body.parentLastName,
      parentRelation = req.body.parentRelation,
      parentPhone = req.body.parentPhone,
      parentEmail = req.body.parentEmail,
      address = req.body.address,
      city = req.body.city,
      state = req.body.state,
      emergencyFirstName = req.body.emergencyFirstName,
      emergencyLastName = req.body.emergencyLastName,
      emergencyRelation = req.body.emergencyRelation,
      emergencyPhone = req.body.emergencyPhone,
      session1 = req.body.session1,
      session2 = req.body.session2,
      referral = req.body.referral,
      promo = req.body.promo;

  // Test Form
  /*
  console.log(req.body);
  console.log("camperFirstName: " + camperFirstName);
  console.log("camperLastName: " + camperLastName);
  console.log("camperAge: " + camperAge);
  console.log("camperGender: " + camperGender);
  console.log("camperGrade: " + camperGrade);
  console.log("camperAllergies: " + camperAllergies);
  console.log("parentFirstName: " + parentFirstName);
  console.log("parentLastName: " + parentLastName);
  console.log("parentRelation: " + parentRelation);
  console.log("parentPhone: " + parentPhone);
  console.log("parentEmail: " + parentEmail);
  console.log("address: " + address);
  console.log("city: " + city);
  console.log("state: " + state);
  console.log("emergencyFirstName: " + emergencyFirstName);
  console.log("emergencyLastName: " + emergencyLastName);
  console.log("emergencyRelation: " + emergencyRelation);
  console.log("emergencyPhone: " + emergencyPhone);
  console.log("session1: " + session1);
  console.log("session2: " + session2);
  console.log("referral: " + referral);
  console.log("promo: " + promo);
  */



  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: gmailAuth
  });

  var mailOptions = {
    from: "potomaccodecamp@gmail.com",
    to: parentEmail,
    subject: "Thank you for applying to Potomac Code Camp!",
    text: "Dear " + parentFirstName + " " + parentLastName + ":\nWe have received your application on behalf of " + camperFirstName + " " + camperLastName + 
          ". We will process your application as fast as possible and let you know in the next few days if " + camperFirstName + " has been accepted.\n\nThank you,\nPotomac Code Camp"
  };

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