var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3002/adminrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/admins', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


router.get('/admin/:id', (req, res) => {
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
router.post('/addadmin', (req, res) => {
    console.log(req.path);
    api.post(req.path,req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
router.put('/updateadmin/:id', (req, res) => {
    console.log(req.path);
    api.put(req.path,req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.delete('/deleteadmin/:id', (req, res) => {
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