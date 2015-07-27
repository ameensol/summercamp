var nodemailer = require("nodemailer");
var nconf = require('nconf');
var fs = require('fs');
var path = require('path');

nconf.use('file', { file: './config.json' });
nconf.load();

var gmailAuth = nconf.get('gmailAuth');

var SESSIONS = {
  'cluuc1': {
    name: 'first Cedar Lane Church',
    date: 'August 3rd'
  },
  'cluuc2': {
    name: 'second Cedar Lane Church',
    date: 'August 17th'
  },
  'rruuc': {
    name: 'River Road Congregation',
    date: 'August 17th'
  }
}

// GET home page
exports.index = function(req, res){
  //res.render('story');
  fs.createReadStream(path.join(__dirname, '..', 'views', 'story.html')).pipe(res);
};

// POST home page
exports.apply = function(req, res){
  console.log('Application Received');

  var camperFirstName = req.body.camperFirstName,
      camperLastName = req.body.camperLastName,
      camperAge = req.body.camperAge,
      camperGender = req.body.camperGender,
      camperGrade = req.body.camperGrade,
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
      session = req.body.session,
      referral = req.body.referral;

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
  console.log("session: " + session);
  console.log("referral: " + referral);
  console.log("promo: " + promo);
  */

  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: gmailAuth.user,
      pass: gmailAuth.pass
    }
  });

  var mailOptionsConfirm = {
    from: "potomaccodecamp@gmail.com",
    to: parentEmail,
    subject: "Thank you for applying to Potomac Code Camp!",
    text: "Dear " + parentFirstName + " " + parentLastName + ":\nThank you for submiting an application to Potomac Code Camp on behalf of " + camperFirstName + " " + camperLastName +
          ". "+camperFirstName + " has been confirmed for our "+SESSIONS[session].name+" session starting on "+SESSIONS[session].date+" and we look forward to coding together!\nPlease feel free to email us if you have any questions at all.\n\nSincerely,\nPotomac Code Camp"
  };

  var mailOptionsApplication = {
    from: "potomaccodecamp@gmail.com",
    to: "apply@potomaccodecamp.com",
    subject: "Application for " + camperFirstName + " " + camperLastName + ".",
    text: "Application Data:\n" +
      "camperFirstName: " + camperFirstName + "\n" +
      "camperLastName: " + camperLastName + "\n" +
      "camperAge: " + camperAge + "\n" +
      "camperGender: " + camperGender + "\n" +
      "camperGrade: " + camperGrade + "\n" +
      "camperAllergies: " + camperAllergies + "\n" +
      "parentFirstName: " + parentFirstName + "\n" +
      "parentLastName: " + parentLastName + "\n" +
      "parentRelation: " + parentRelation + "\n" +
      "parentPhone: " + parentPhone + "\n" +
      "parentEmail: " + parentEmail + "\n" +
      "address: " + address + "\n" +
      "city: " + city + "\n" +
      "state: " + state + "\n" +
      "emergencyFirstName: " + emergencyFirstName + "\n" +
      "emergencyLastName: " + emergencyLastName + "\n" +
      "emergencyRelation: " + emergencyRelation + "\n" +
      "emergencyPhone: " + emergencyPhone + "\n" +
      "session: " + session + "\n" +
      "referral: " + referral + "\n"
  }

  smtpTransport.sendMail(mailOptionsConfirm, function(error, response){
    if(error){
      console.log(error);
    } else {
      console.log("Confirmation Sent: " + response.message);
    }
  });

  smtpTransport.sendMail(mailOptionsApplication, function(error, response){
    if(error){
      console.log(error);
    } else {
      console.log("Application Received: " + response.message);
    }
  });

  res.redirect('/app-received');
};

// GET app-received page
exports.appReceived = function(req, res){
  fs.createReadStream(path.join(__dirname, '..', 'views', 'appReceived.html')).pipe(res);
};

// POST email capture page
exports.email = function(req, res) {

  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: gmailAuth.user,
      pass: gmailAuth.pass
    }
  });

  var email = req.body.email;

  var mailOptionsCapture = {
    from: "potomaccodecamp@gmail.com",
    to: "potomaccodecamp@gmail.com",
    subject: "Email Capture",
    text: email
  };

  smtpTransport.sendMail(mailOptionsCapture, function(error, response){
    if(error){
      console.log(error);
    } else {
      console.log("Email Captured: " + response.message);
    }
  });
};

exports.teach = function(req, res) {
  fs.createReadStream(path.join(__dirname, '..', 'views', 'teach.html')).pipe(res);
}
