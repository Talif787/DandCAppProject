var express = require('express');
var router = express.Router()
var dealsandCouponsService = require('./dealsorcouponsservice');
var merchantsService = require('./merchantsservice');
var adminsService = require('./adminsservice');
var usersService = require('./usersservice');

// var hashtagService = require('./hashtagService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(usersService);
router.use(adminsService);
router.use(dealsandCouponsService);
router.use(merchantsService);



// router.use(hashtagService)

module.exports = router