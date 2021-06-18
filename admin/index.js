const express = require('express');
const app = express();
const adminsRightsRouter = require('./routes/admin-routes');
// var adminController = require('../controllers/insert-admin-controller');
// var userController = require('../../users/controllers/insert-user-controller');
// // var router = express.Router();
// var userModel = require('../../users/models/user-models');
var bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: "1.0.0",
        title: "Deals and Coupons Finder App.",
        description: "This application is built using Node.js.",
        contact: {
          name: "Amazing Web Developer"
        }
    },
        servers: [
            {
                url: "http://localhost:3002"
            }
            ]
    },

    // ['.routes/*.js']
    apis: ["./routes/*.js"]
  };
  
  
  


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.urlencoded({extended: true})); 
  
// Parses the text as json
app.use(bodyParser.json());
const PORT = 3002;

app.use('/adminrights',adminsRightsRouter);

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


module.exports = app;

