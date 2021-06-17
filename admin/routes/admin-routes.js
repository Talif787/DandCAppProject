// const { Router } = require('express');
const express = require('express');
const app = express();
var adminController = require('../controllers/insert-admin-controller');
var userController = require('../../users/controllers/insert-user-controller');
// var router = express.Router();
var userModel = require('../../users/models/user-models');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); 
  
// Parses the text as json
app.use(bodyParser.json());
const PORT = 3002;
    
app.get('/admin', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome Admin!!");
    
});
app.get('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    userModel.find({}).then(function (users) {
        res.send(users);
        });
});
app.post('/admin', adminController);
app.post('/users', userController);
app.put('/admin', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to update an admin!!");
});
app.put('/users/name/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to update an admin!!");


    userModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }

    })

});

app.delete('/user/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome to delete an admin!!");
    userModel.deleteMany({_id: req.params.id}, function (err, _) {
        if (err) {
            return console.log(err);
        }
        else{
            res.send(`User's Account deleted with _id: ${req.params.id}`)
        }
    });
});  


app.delete('/admin', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to delete an admin!!");
});  
  
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});