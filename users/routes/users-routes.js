// const { Router } = require('express');
const express = require('express');
var userContoller = require('../controllers/insert-user-controller');
const app = express();
const router = express.Router();
// var router = express.Router();
const userModel = require('../models/user-models');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const maxAge = 3 * 24 * 60 * 60;
var cors = require('cors');
var  corsOptions  = {
  origin: 'http://localhost:8000', //frontend url
  credentials: true,
  exposedHeaders: ["set-cookie"]}
app.use(cors(corsOptions));
var verify = require('../middleware/verify');


// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true})); 
  
// // Parses the text as json
// app.use(bodyParser.json());
// const PORT = 3000;

/**
 * @openapi
 * tags: 
 *      name: Users
 *      description: The users managing API.
 */

/**
 * @openapi
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - full_name
 *                  - email_address
 *                  - password
 *                  - mobile_number
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The auto_generated id of the user.
 *                  full_name:
 *                      type: string
 *                      description: Name of the user.
 *                  email_address:
 *                      type: string
 *                      description: The Email-ID of the user.
 *                  password:
 *                      type: string
 *                      description: Password of the respective user.
 *                  mobile_number:
 *                      type: number
 *                      description: The 10 digit mobile number of the user.
 *              example:
 *                  id: d5fE_asz
 *                  full_name: Talif Pathan
 *                  email_address: abc@gmail.com
 *                  password: abc123$
 *                  mobile_number: 7890656783
 */
    


/**
 * @openapi
 * /userrights/users:
 *      get:
 *          summary: Returns all the users stored in the users collections of the DealsandCouponsUsers Database.
 *          tags: [Users]  
 *          responses:
 *              200:
 *                  description: The list of the users.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 */
router.get('/users', function (req, res) {
    // console.log(req.get('Content-Type'));        //http://localhost:3000/userrights/users
    // res.send("Hello World!! Welcome Users!!");
    // jwt.verify(req.token, 'secretkey', (err, authData) => {
    //   if(err) {
    //     res.sendStatus(403);
    //   } else {
        userModel.find({}).then(function (users) {
          res.send(users);
          });;
    //   }
    // });
    
});




/**
 * @openapi
 * /userrights/user/{id}:
 *      get:
 *          summary: Returns a particular user stored in the users collections of the DealsandCouponsUsers Database.
 *          tags: [Users]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          responses:
 *              200:
 *                  description: A particular user.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  _id: d5fE_asz
 *                                  full_name: Talif Pathan
 *                                  email_address: abc@gmail.com
 *                                  password: abc123$
 *                                  mobile_number: 7890656783
 */



router.get('/user/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    userModel.findById(req.params.id, (err,data) => {
        if(err){
            res.status(404).json({success: false, error: err});
        }
        else{
            res.status(200).json(data);
        }
    });
});



/**
 * @openapi
 * /userrights/adduser:
 *      post:
 *          summary: Create a new user in the users collections of the DealsandCouponsUsers Database.
 *          tags: [Users] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         example:
 *                              {"full_name": "Talif Pathan",  "email_address": "abc@gmail.com", "password": "abc123$", "mobile_number": 7890656783}
 *          responses:
 *              '201':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  success: true
 *                                  data: { "_id": "60d368a899be30066e2a8db3",  "full_name": "Talif Pathan",  "email_address": "abc@gmail.com", "password": "abc123$", "mobile_number": 7890656783, "__v": 0 }                              
 */



router.post('/adduser', userContoller);


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, 'secretkey', (err, authData) => {
          if (err) {
              return res.sendStatus(403);
          }

          res.json({
                  message: 'Post created...',
                  authData
                });
                next();
      });
  } else {
      res.sendStatus(401);
  }
};

router.post('/api/posts', verify, (req, res) => { 
//   console.log("Hello");
// verifyToken;
//   // Verify Token
// function verifyToken(req, res, next) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined') {
//       // Split at the space
//       const bearer = bearerHeader.split(' ');
//       // Get token from array
//       const bearerToken = bearer[1];
//       // Set the token
//       req.token = bearerToken;
//       // Next middleware
//       next();
//     } else {
//       // Forbidden
//       res.send("Killed");
//     }
//   }
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
  // res.send("hello world");
});



 
   
// //   // Verify Token
// function verifyToken(req, res, next) {
//   console.log("Hello");
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined') {
//       // Split at the space
//       const bearer = bearerHeader.split(' ');
//       // Get token from array
//       const bearerToken = bearer[1];
//       // Set the token
//       req.token = bearerToken;
//       // Next middleware
//       next();
//     } else {
//       // Forbidden
//       res.sendStatus(403);
//     }
//   }
router.post('/signup', function(req, res) {
   //  bcrypt.hash(req.body.password, 10, function(err, hash){
   //     if(err) {
   //        return res.status(500).json({
   //           error: err
   //        });
   //     }
   //     else {
          var mailer = require('../../Mail/server');
          mailer(req.body.email_address);
          const user = new userModel({
             full_name: req.body.full_name,
             email_address: req.body.email_address,
             password: req.body.password,
             mobile_number: req.body.mobile_number      
          });
          user.save(function(err, created){
            if(err){
                return res.status(500).json({success: false, error: err});
            }
            else{
                res.status(201).json({success:"Registration Successful..Please login to continue..", data: created})
            }
        });
 });


 router.post('/signin', function(req, res){

    userModel.findOne({email_address: req.body.email_address})
    .exec()
    .then(function(user) {
       bcrypt.compare(req.body.password, user.password, function(err, result){
          if(err) {
             return res.status(401).json({
                failed: 'Unauthorized Access'
             });
          }
          if(result) {
            const JWTToken = jwt.sign({
            email_address: user.email_address,
          },
          'secretkey',
           {
             expiresIn: maxAge
           });
          //  app.use(function(req, res, next) {
            // res.setheader('Access-Control-Allow-Credentials', true);
            // res.setheader('Access-Control-Allow-Origin', req.headers.origin);
            // res.setheader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
            // res.setheader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            // next();
          // });
           res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000/signin');
           res.setHeader('Access-Control-Allow-Credentials',true);
           res.cookie('jwt', JWTToken, {httpOnly: true, maxAge: maxAge * 1000})
           return res.status(200).json({
             success: 'Login Successful..',
             token: JWTToken
           });
          }
          return res.status(401).json({
          failed: 'The Password is incorrect.'
         });
       });
    })
    .catch(error => {
       res.status(500).json({
          failed: "This Email does not exist."
       });
    });
 });


 router.get('/logout', function(req, res) {
  // res.cookie('jwt', '', { maxAge: 1 }).send("Logged out successfully..")
  res.send("Logged out successfully..")
});


  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     next();
  //   } else {
  //     res.send("You're not logged in..");
  //   }
  // };
  
  // function isNotLoggedIn(req, res, next)  {
  //   console.log("isnot");
  //   if (!req.isAuthenticated()) {
  //     next();
  //   } else {
  //     res.send("You are already logged in..");
  //   }
  // };
/**
 * @openapi
 * /userrights/updateuser/{id}:
 *      put:
 *          summary: Update a user by its id in the users collections of the DealsandCouponsUsers Database.
 *          tags: [Users] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"email_address": "abx@gmail.com", "password": "abc123$%"}
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: d5fE_asz
 *                                  full_name: Amit Mahadik
 *                                  email_address: abx@gmail.com
 *                                  password: abc123$%
 *                                  mobile_number: 7890656783
 *              '404':
 *                  description: The user was not found.
 *              '500':
 *                  description: There was some server error.
 */

router.put('/updateuser/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
   //  res.send("Hello World!! Welcome to update a user!!");
   // userModel.findById(req.params.id, function(err, doc) {
   //    if (err) return false;
   //    doc = req.body;
   //    console.log(doc);
   //    doc.save(function(err, created){
   //       if(err){
   //           return res.status(500).json({success: false, error: err});
   //       }
   //       else{
   //           res.status(201).json({success:true, data: created})
   //       }
   //   });
   //  });
   var doc = req.body
   if(req.body.password){
      bcrypt.hash(req.body.password, 10, function(err, hash){
         if(err) {
            return res.status(500).json({
               error: err
            });
         }
         else{
            doc.password = hash;
            userModel.findByIdAndUpdate({_id: req.params.id}, doc , {new: true}, function(err, result){

               if(err){
                   return res.status(404).json({success: false, error: err});
               }
               else{
                   res.status(200).json(result);
               }

         })
   }
})
}
else{
   userModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

      if(err){
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).json(result);
      }

})

}
  
});



/**
 * @openapi
 * /userrights/deleteuser/{id}:
 *      delete:
 *          summary: Remove the user by its id.
 *          tags: [Users] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          responses:
 *              '200':
 *                  description: The user was deleted.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              User's Account deleted with _id: 123edfz
 *              '404':
 *                  description: The user was not found.
 */
router.delete('/deleteuser/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
   //  res.send("Hello World!! Welcome to delete a user!!");
   userModel.deleteMany({_id: req.params.id}, function (err, _) {
      if (err) {
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).send(`User's account deleted with _id: ${req.params.id}`);
      }
  });
});  



module.exports = router;