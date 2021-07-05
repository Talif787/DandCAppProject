var express = require('express');
var app = express();
var router = require('./routers/router')
var bodyParser = require('body-parser');
var cors = require('cors');
var  corsOptions  = {
  origin: 'http://localhost:8000', //frontend url
  credentials: true,
  exposedHeaders: ["set-cookie"]}
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send("Simple API Gateway!!")
})

app.use(router);

console.log("Simple API Gateway running on localhost:8000!!")

app.listen(8000);