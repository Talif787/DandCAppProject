var adminModel = require('../models/admin-models');
module.exports = function (req, res){
    var newAdmin = new adminModel();
    newAdmin.full_name = req.body.full_name;
    newAdmin.email_address = req.body.email_address;
    newAdmin.password = req.body.password;
    newAdmin.mobile_number = req.body.mobile_number;
    
    newAdmin.save(function(err, data){
        if(err){
            console.log(error);
        }
        else{
            res.send("Data inserted");
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
     