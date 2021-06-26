var express = require('express');
var app = express();
var router = require('./routers/router')
var bodyParser = require('body-parser');

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send("Simple API Gateway!!")
})

app.use(router);

console.log("Simple API Gateway running on localhost:8000!!")

app.listen(8000);