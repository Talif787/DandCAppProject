var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3004/dealsorcouponsrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/dealsorcoupons', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


router.get('/dealorcoupon/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
router.get('/code', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
router.get('/deal', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
router.get('/deal/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.get('/lastdealorcoupon', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


router.post('/adddealorcoupon', (req, res) => {
  console.log(req.path);
  api.post(req.path,req.body).then(resp => {
      res.send(resp.data)
    }).catch((err) => {
      res.send("Something went wrong. Please try again!!!")
    })
})
router.put('/updatedorc/:id', (req, res) => {
  console.log(req.path);
  api.put(req.path,req.body).then(resp => {
      res.send(resp.data)
    }).catch((err) => {
      res.send("Something went wrong. Please try again!!!")
    })
})

router.delete('/deletedorc/:id', (req, res) => {
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