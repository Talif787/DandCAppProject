var mongoose=require('mongoose');
var db = require('../database');
var bcrypt = require('bcrypt');
mongoose.set('useCreateIndex', true);
// create an schema

var userSchema = new mongoose.Schema({

            full_name: {
                type: String,
                required: true,
                minlength: 10,
                maxlength: 255
            },
            email_address: {
                type: String,
                required: [true, 'Please enter an email'],
                unique: true,
                lowercase: true,
            },
            password: {
                type: String,
                required: [true, 'Please enter a password'],
                minlength: [6, 'Minimum password length is 6 characters'],
            },
            mobile_number: {
                type: Number,
                required: true,
                minlength: 10,
                maxlength: 10
            }
            
        });

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
// fire a function to hash the password if password was modified
// userSchema.pre('findByIdAndUpdate', async function (this) {
//   let update = {...this.getUpdate()};

//   // Only run this function if password was modified
//   if (update.password){

//   // Hash the password
//   const salt = genSaltSync();
//   update.password = await hash(this.getUpdate().password, salt);
//   this.setUpdate(update);
//   }
// })
  // static method to login user
  userSchema.statics.login = async function(email_address, password) {
    const user = await this.findOne({ email_address });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  
module.exports=mongoose.model('User',userSchema,'users');
        
// module.exports={
//      createData:function(inputData, callback){
                  
//         userData= new userTable(inputData);
//         userData.save(function(err, data){
//           if (err) throw err;
//            return callback(data);
//         });
//      }
// }