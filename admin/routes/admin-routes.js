// // const { Router } = require('express');
// const express = require('express');
// const app = express();
var adminController = require('../controllers/insert-admin-controller');
var userController = require('../../users/controllers/insert-user-controller');
// // var router = express.Router();
var userModel = require('../../users/models/user-models');
var adminModel = require('../models/admin-models')
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true})); 
  
// // Parses the text as json
// app.use(bodyParser.json());
// const PORT = 3002;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const axios = require('axios');
const usersservice = 'http://localhost:3000/userrights'; 
const merchantsservice = 'http://localhost:3008/merchantrights'; 
const dncservice = 'http://localhost:3004/dealsorcouponsrights'; 
const express = require('express')
const router = express.Router();
const verify = require('../middleware/verify');
const maxAge = 3 * 24 * 60 * 60;

/**
 * @openapi
 * tags: 
 *      name: Admins
 *      description: The admins managing API.
 */

/**
 * @openapi
 * components:
 *      schemas:
 *          Admin:
 *              type: object
 *              required:
 *                  - full_name
 *                  - email_address
 *                  - password
 *                  - mobile_number
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto_generated id of the admin.
 *                  full_name:
 *                      type: string
 *                      description: Name of the admin.
 *                  email_address:
 *                      type: string
 *                      description: The Email-ID of the admin.
 *                  password:
 *                      type: string
 *                      description: Password of the respective admin.
 *                  mobile_number:
 *                      type: number
 *                      description: The 10 digit mobile number of the admin.
 *              example:
 *                  id: d5fE_asz
 *                  full_name: Amit Mahadik
 *                  email_address: abc@gmail.com
 *                  password: abc123$
 *                  mobile_number: 7890656783
 */







   

/**
 * @openapi
 * /adminrights/admins:
 *      get:
 *          summary: Returns all the admins stored in the admins collections of the DealsandCouponsAdmins Database.
 *          tags: [Admins]  
 *          responses:
 *              200:
 *                  description: The list of the admins.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Admin'
 */
router.get('/admins', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Admin!!");
    adminModel.find({}).then(function (admins) {
        res.send(admins);
        });
    
});

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
    router.post('/adminsignup', function(req, res) {
       //  bcrypt.hash(req.body.password, 10, function(err, hash){
       //     if(err) {
       //        return res.status(500).json({
       //           error: err
       //        });
       //     }
       //     else {
              var mailer = require('../../Mail/server');
              
              mailer(req.body.email_address);
              const admin = new adminModel({
                 full_name: req.body.full_name,
                 email_address: req.body.email_address,
                 password: req.body.password,
                 mobile_number: req.body.mobile_number      
              });
             
            //  console.log(admin)
              admin.save(function(err, created){
                if(err){
                    console.log("Hi");
                    return res.status(500).json({success: false, error: err});
                }
                else{
                    res.status(201).json({success:"Registration Successful..Please login to continue..", data: created})
                }
            });
     });
    
    
     router.post('/adminsignin', function(req, res){
    
        adminModel.findOne({email_address: req.body.email_address})
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
                 success: 'Admin login successful..',
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
    
    
router.get('/adminlogout', function(req, res) {
      // res.cookie('jwt', '', { maxAge: 1 }).send("Logged out successfully..")
      res.send("Logged out successfully..")
});
router.get('/adminusers', verify, function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            console.log(req.token);
          res.sendStatus(403);
        } else {
            axios.get(usersservice+'/users').then((response) => {
                res.send(response.data);
            });
        }
      });
   
});

router.get('/user/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    axios.get(usersservice+'/user/'+req.params.id).then((response) => {
        res.send(response.data);
    });
});




/**
 * @openapi
 * /adminrights/admin/{id}:
 *      get:
 *          summary: Returns a particular admin stored in the admins collections of the DealsandCouponsAdmins Database.
 *          tags: [Admins]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The admin id.
 *          responses:
 *              200:
 *                  description: A particular admin.
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
 *              404:
 *                  description: The admin cannot be found.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: false
 *                                  error: {}
 */
router.get('/admin/:id', function (req, res) {
    adminModel.findById(req.params.id, (err,data) => {
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
 * /adminrights/addadmin:
 *      post:
 *          summary: Create a new admin in the admins collections of the DealsandCouponsAdmins Database.
 *          tags: [Admins] 
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
 *              '500':
 *                  description: There was some server error.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  success: false
 *                                  error: {}                              
 */


router.post('/addadmin', adminController);


router.post('/adduser', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to update an admin!!");
    axios.post(usersservice+'/adduser', req.body).then((response) => {
        res.send(response.data);
    
});
});



/**
 * @openapi
 * /adminrights/updateadmin/{id}:
 *      put:
 *          summary: Update an admin by its id in the admins collections of the DealsandCouponsAdmins Database.
 *          tags: [Admins] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The admin id.
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
 *                  description: The admin was not found.
 */
router.put('/updateadmin/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to update an admin!!");
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
             adminModel.findByIdAndUpdate({_id: req.params.id}, doc , {new: true}, function(err, result){
 
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
    adminModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){
 
       if(err){
           return res.status(404).json({success: false, error: err});
       }
       else{
           res.status(200).json(result);
       }
 
 })
 
 }
    
});


router.put('/updateuser/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to update an admin!!");
    axios.put(usersservice+'/updateuser/'+req.params.id, req.body).then((response) => {
        res.send(response.data);
    
});
});





// router.put('/user/:id', function (req, res) {
//     // console.log(req.get('Content-Type')); 
//     // res.send("Hello World!! Welcome to update an admin!!");


//     userModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

//         if(err){
//             return res.status(404).json({success: false, error: err});
//         }
//         else{
//             res.status(200).json(result);
//         }

//     })

// });


router.delete('/user/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to delete an admin!!");
    axios.delete(usersservice+'/deleteuser/'+req.params.id).then((response) => {
        res.send(response.data);
    });
});  



/**
 * @openapi
 * /adminrights/deleteadmin/{id}:
 *      delete:
 *          summary: Remove the admin by its id.
 *          tags: [Admins] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The admin id.
 *          responses:
 *              '200':
 *                  description: The admin was deleted.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              Admin's Account deleted with _id: 123edfz
 *              '404':
 *                  description: The admin was not found.
 */

router.delete('/deleteadmin/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to delete an admin!!");
    // console.log(res);
    adminModel.findByIdAndDelete(req.params.id, function (err) {
        if(err){
            res.status(404).json({success: false, error: err});
        }
        else{
            res.status(200).send(`Admin's account deleted with _id: ${req.params.id}`);
        }
      });
});  


//Connecting to merchants
router.get('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    axios.get(merchantsservice+'/merchants').then((response) => {
        res.send(response.data);
    });
});


router.post('/addmerchant', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to update an admin!!");
    axios.post(merchantsservice+'/addmerchant', req.body).then((response) => {
        res.send(response.data);
    
});
});





router.get('/dealsorcoupons', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    axios.get(dncservice+'/dealsorcoupons').then((response) => {
        res.send(response.data);
    });
});


router.get('/deal', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    axios.get(dncservice+'/deal').then((response) => {
        res.send(response.data);
    });
});


router.get('/code', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    axios.get(dncservice+'/code').then((response) => {
        res.send(response.data);
    });
});

// app.listen(PORT, function(err){
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });


module.exports = router;