// const { Router } = require('express');
const express = require('express');
var userContoller = require('../controllers/insert-user-controller');
const app = express();
const router = express.Router();
// var router = express.Router();
const userModel = require('../models/user-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true})); 
  
// // Parses the text as json
// app.use(bodyParser.json());
// const PORT = 3000;
    
router.get('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    userModel.find({}).then(function (users) {
        res.send(users);
        });
});

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

router.post('/users', userContoller);


router.post('/api/posts', verifyToken, (req, res) => {  
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
  });

  // Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }
router.post('/signup', function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash){
       if(err) {
          return res.status(500).json({
             error: err
          });
       }
       else {
          const user = new userModel({
             full_name: req.body.full_name,
             email_address: req.body.email_address,
             password: hash,
             mobile_number: req.body.mobile_number      
          });
          user.save().then(function(result) {
             console.log(result);
             res.status(200).json({
                success: 'New user has been created..'
             });
          }).catch(error => {
             res.status(500).json({
                error: err
             });
          });
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
             expiresIn: '2h'
           });
           return res.status(200).json({
             success: 'Welcome to the JWT Auth',
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
          failed: "This Email-ID does not exist."
       });
    });
 });
router.put('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to update a user!!");
});
router.delete('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to delete a user!!");
});  



module.exports = router;