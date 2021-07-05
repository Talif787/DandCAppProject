module.exports = function(email){
var nodemailer = require('nodemailer');
console.log(email);


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'talifpathan13@gmail.com',
    pass: 'talifrgit1'
  }
});

var mailOptions = {
  from: 'talifpathan13@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js',
  text: 'Welcome to the Deals and Coupons Finder App.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}