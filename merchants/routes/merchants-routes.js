const express = require('express');
const app = express();
const PORT = 3001;
    
app.get('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome Merchants!!");
});
app.post('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to add a merchant!!");
});
app.put('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to update a merchant!!");
});
app.delete('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to delete a merchant!!");
});  
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});