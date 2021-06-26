var mongoose=require('mongoose');
var db = require('../database');
// create an schema
var merchantSchema = new mongoose.Schema({
            store_name: String,
            business_email_address:String,
            password:String
        });
module.exports=mongoose.model('Merchant',merchantSchema,'merchants');

        
// module.exports={
//      createData:function(inputData, callback){
                  
//         userData= new userTable(inputData);
//         userData.save(function(err, data){
//           if (err) throw err;
//            return callback(data);
//         });
//      }
// }