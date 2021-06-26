// const { Router } = require('express');
const express = require('express');
var merchantController = require('../controllers/insert-merchant-controller');
const app = express();
const router = express.Router();
// var router = express.Router();
const merchantModel = require('../models/merchant-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true})); 
  
// // Parses the text as json
// app.use(bodyParser.json());
// const PORT = 3000;

/**
 * @openapi
 * tags: 
 *      name: Merchants
 *      description: The merchants managing API.
 */

/**
 * @openapi
 * components:
 *      schemas:
 *          Merchant:
 *              type: object
 *              required:
 *                  - store_name
 *                  - business_email_address
 *                  - password
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The auto_generated id of the merchant.
 *                  store_name:
 *                      type: string
 *                      description: Name of the store.
 *                  business_email_address:
 *                      type: string
 *                      description: The Email-ID of the merchant.
 *                  password:
 *                      type: string
 *                      description: Password of the respective merchant.
 *              example:
 *                  id: d5fE_asz
 *                  store_name: Amazon
 *                  business_email_address: abc@amazon.com
 *                  password: abc123$
 */
    


/**
 * @openapi
 * /merchantrights/merchants:
 *      get:
 *          summary: Returns all the merchants stored in the merchants collections of the DealsandCouponsMerchants Database.
 *          tags: [Merchants]  
 *          responses:
 *              200:
 *                  description: The list of the merchants.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Merchant'
 */
router.get('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    merchantModel.find({}).then(function (merchants) {
        res.send(merchants);
        });
});




/**
 * @openapi
 * /merchantrights/merchant/{id}:
 *      get:
 *          summary: Returns a particular merchant stored in the merchants collections of the DealsandCouponsMerchants Database.
 *          tags: [Merchants]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          responses:
 *              200:
 *                  description: A particular merchant.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  _id: d5fE_asz
 *                                  store_name: Amazon
 *                                  business_email_address: abc@amazon.com
 *                                  password: abc123$                             
 */



router.get('/merchant/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    merchantModel.findById(req.params.id, (err,data) => {
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
 * /merchantrights/addmerchant:
 *      post:
 *          summary: Create a new merchant in the merchants collections of the DealsandCouponsMerchants Database.
 *          tags: [Merchants] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         example:
 *                              { "store_name": "Amazon",  "business_email_address": "abc@amazon.com", "password": "abc123$" }
 *          responses:
 *              '201':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  success: true
 *                                  data: { "_id": "60d368a899be30066e2a8db3",  "store_name": "Amazon",  "business_email_address": "abc@amazon.com", "password": "abc123$", "__v": 0 }                              
 */



router.post('/addmerchant', merchantController);


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


/**
 * @openapi
 * /merchantrights/updatemerchant/{id}:
 *      put:
 *          summary: Update a merchant by its id in the merchants collections of the DealsandCouponsMerchants Database.
 *          tags: [Merchants] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"business_email_address": "abx@amazon.com", "password": "abc123$%"}
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: d5fE_asz
 *                                  store_name: Amazon
 *                                  business_email_address: abx@amazon.com
 *                                  password: abc123$%
 *              '404':
 *                  description: The merchant was not found.
 *              '500':
 *                  description: There was some server error.
 */

router.put('/updatemerchant/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
   //  res.send("Hello World!! Welcome to update a user!!");
   merchantModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

      if(err){
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).json(result);
      }

  })
});



/**
 * @openapi
 * /merchantrights/deletemerchant/{id}:
 *      delete:
 *          summary: Remove the merchant by its id.
 *          tags: [Merchants] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          responses:
 *              '200':
 *                  description: The merchant will be deleted.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              Merchant's Account deleted with _id: 123edfz
 *              '404':
 *                  description: The merchant was not found.
 */
router.delete('/deletemerchant/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
   //  res.send("Hello World!! Welcome to delete a user!!");
   merchantModel.deleteMany({_id: req.params.id}, function (err, _) {
      if (err) {
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).send(`Merchant's account deleted with _id: ${req.params.id}`);
      }
  });
});  



module.exports = router;