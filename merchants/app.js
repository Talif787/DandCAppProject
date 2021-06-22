var express = require('express');
var app = express();
var PORT = 8000;
var router = require('./couponsexternalapi');
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
// const CouponsAPI = require('./couponsexternalapi')
// const asyncApiCall = async () => {
//     const response = await CouponsAPI.getCompatibility();
//     console.log(response.data);
// }
// asyncApiCall()

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use(router);

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})