var express = require('express');
var router = express.Router()
var dealsandCouponsService = require('./dealsorcouponsservice');
// var hashtagService = require('./hashtagService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(dealsandCouponsService);
// router.use(hashtagService)

module.exports = router