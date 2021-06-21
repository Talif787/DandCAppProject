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
const axios = require('axios');
const usersservice = 'http://localhost:3000/userrights';
const express = require('express')
const router = express.Router();

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
 *                  id:
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
 *                  full_name: Amit Mahadik
 *                  email_address: abc@gmail.com
 *                  password: abc123$
 *                  mobile_number: 7890656783
 */







    
router.get('/', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome Admin!!");
    
});

/**
 * @openapi
 * /adminrights/users:
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
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    axios.get(usersservice+'/users').then((response) => {
        res.send(response.data);
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





router.post('/admin', adminController);

/**
 * @openapi
 * /adminrights/user:
 *      post:
 *          summary: Create a new user in the users collections of the DealsandCouponsUsers Database.
 *          tags: [Users] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              type: string
 *                              example: User Data inserted successfully.
 */
router.post('/user', userController);
router.put('/admin', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to update an admin!!");
    
});

/**
 * @openapi
 * /adminrights/user/{id}:
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
router.put('/user/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to update an admin!!");


    userModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

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
 * /adminrights/user/{id}:
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

router.delete('/user/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to delete an admin!!");
    userModel.deleteMany({_id: req.params.id}, function (err, _) {
        if (err) {
            return res.status(404).json({success: false, error: err});
        }
        else{
            res.status(200).send(`User's account deleted with _id: ${req.params.id}`);
        }
    });
});  


router.delete('/admin/:id', function (req, res) {
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
  
  
// app.listen(PORT, function(err){
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });


module.exports = router;