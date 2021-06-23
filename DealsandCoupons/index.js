const express = require('express');
const app = express();
const dealsorCouponsRouter = require('./routes/dealsorcoupons-routes');
// var userModel = require('../users/models/user-models');

var bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: "1.0.0",
        title: "Deals and Coupons Finder App -- DealsandCoupons Microservice.",
        description: "This application is built using Node.js.",
        contact: {
          name: "Amazing Web Developer"
        }
    },
        servers: [
            {
                url: "http://localhost:3004"
            }
            ]
    },

    // ['.routes/*.js']
    apis: ["./routes/*.js"]
  };
  
  
  


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use(express.urlencoded({extended: true})); 
// app.use(express.json()); 


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




