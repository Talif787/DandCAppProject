var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3000/userrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/users', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
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