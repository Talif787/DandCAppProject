var mongoose=require('mongoose');
var db = require('../database');
// create an schema
var adminSchema = new mongoose.Schema({
            full_name: String,
            email_address:String,
            password:String,
            mobile_number:Number
        });
module.exports=mongoose.model('Admin',adminSchema,'admins');

        
// module.exports={
//      createData:function(inputData, callback){
                  
//         userData= new userTable(inputData);
//         userData.save(function(err, data){
//           if (err) throw err;
//            return callback(data);
//         });
//      }
// }