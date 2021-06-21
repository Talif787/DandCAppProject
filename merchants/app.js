var express = require('express');
var app = express();
var PORT = 3000;
const CouponsAPI = require('./couponsexternalapi')
const asyncApiCall = async () => {
    const response = await CouponsAPI.getCompatibility();
    console.log(response.data);
}
asyncApiCall()
  
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})