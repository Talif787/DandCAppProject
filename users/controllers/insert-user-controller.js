var userModel = require('../models/user-models');
module.exports = function (req, res){
    var newUser = new userModel();
    newUser.full_name = req.body.full_name;
    newUser.email_address = req.body.email_address;
    newUser.password = req.body.password;
    newUser.mobile_number = req.body.mobile_number;
    
    newUser.save(function(err, data){
        if(err){
            console.log(error);
        }
        else{
            res.send("User Data inserted successfully..");
        }
    });
}


// var admin1 = new Admin({ full_name: "Talif Pathan",
//     email_address: "talifpathan13@gmail.com",
//     password: "Talifrgit",
//     mobile_number: 7678089559 });
 
//     // save model to database
// admin1.save(function (err, admin) {
//     if (err) return console.error(err);
//     console.log(admin.name + " saved to admins collection.");
// });
     