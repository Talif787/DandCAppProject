const express = require('express');
const app = express();
const PORT = 3000;
    
app.get('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome Users!!");
});
app.post('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to add a user!!");
});
app.put('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to update a user!!");
});
app.delete('/users', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to delete a user!!");
});  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});