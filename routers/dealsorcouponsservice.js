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
      })
})


router.get('/dealorcoupon/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path+req.params.id).then(resp => {
        res.send(resp.data)
      })
})
router.get('/code', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      })
})
router.get('/deal', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      })
})
router.get('/deal/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      })
})

router.get('/lastdealorcoupon', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      })
})




// router.get('/hashtags/:n', (req, res) => {
//     res.send(req.path + " called")  
// })

module.exports = router