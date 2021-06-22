const express = require('express');
var dealsOrCouponsController = require('../controllers/insert-dealsorcoupons-controller');
const router = express.Router();
const dealsOrCouponsModel = require('../models/dealsorcoupons-models');


router.get('/dealsorcoupons', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Deals and Coupons!!");
    dealsOrCouponsModel.find({}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            res.status(200).json(docs);
        }
    });
});

router.get('/code', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Deals and Coupons!!");
    dealsOrCouponsModel.find({type: "Code"}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            res.status(200).json(docs);
        }
    });
});


router.get('/deal', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Deals and Coupons!!");
    dealsOrCouponsModel.find({type: "Deal"}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            res.status(200).json(docs);
        }
    });
});


router.get('/deal/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    dealsOrCouponsModel.findById({
        $and: [{_id: req.params.id, type: "Deal"}]
      }, null, (err,data) => {
        if(err){
            res.status(404).json({success: false, error: "The requested data cannot be found.."});
        }
        else{
            res.status(200).json(data);
        }
    });
    
});







module.exports = router;
