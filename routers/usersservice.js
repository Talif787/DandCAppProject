var express = require('express');
var app = express()
var router = express.Router()
const apiAdapter = require('./apiAdapter')
// var bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
const axios = require('axios')
const bearerToken = require('express-bearer-token');
// app.use(bearerToken());
// var cors = require('cors');
// app.use(
//   cors({
//     origin: [`http://localhost:000`],
//     credentials: 'true',
//   }))
// const { config } = require('chai');
var i;
var j = '';




const BASE_URL = 'http://localhost:3000/userrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/users', (req, res) => {
    console.log(req.path);
    api.get(req.path,{
      headers: { Authorization: `Bearer ${j}`}
  }).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


router.get('/user/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
// router.get('/code', (req, res) => {
//     console.log(req.path);
//     api.get(req.path).then(resp => {
//         res.send(resp.data)
//       })
// })
router.post('/adduser', (req, res) => {
    console.log(req.path);
    api.post(req.path,req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})



// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if(typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }

// }

// .catch((err) => {
//   res.send("Something went wrong. Please try again!!!")
// })

router.put('/updateuser/:id', (req, res) => {
    console.log(req.path);
    api.put(req.path,req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.delete('/deleteuser/:id', (req, res) => {
    console.log(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})




// router.get('/hashtags/:n', (req, res) => {
//     res.send(req.path + " called")  
// })

module.exports = router