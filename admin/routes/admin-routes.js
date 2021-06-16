// const { Router } = require('express');
const express = require('express');
var adminContoller = require('../controllers/insert-admin-controller');
const app = express();
// var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); 
  
// Parses the text as json
app.use(bodyParser.json());
const PORT = 3002;
    
app.get('/admin', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome Admin!!");
});
app.post('/admin', adminContoller);
app.put('/admin', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to update an admin!!");
});
app.delete('/admin', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to delete an admin!!");
});  
  
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});