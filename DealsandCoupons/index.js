const express = require('express');
const app = express();
const dealsorCouponsRouter = require('./routes/dealsorcoupons-routes');
// var userModel = require('../users/models/user-models');


app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
const PORT = 3004;

app.get('/checking', function(req, res){
  res.json({
     "Tutorial": "Welcome to the Node express JWT Tutorial"
  });
});

app.use('/dealsorcouponsrights',dealsorCouponsRouter);

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});




