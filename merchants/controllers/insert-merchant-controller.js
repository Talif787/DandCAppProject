var merchantModel = require('../models/merchant-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = function (req, res){

    if(Object.keys(req.body).length === 0 ){
        res.send("There's no data to insert..")
    }
    else{
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if(err) {
               return res.status(500).json({
                  error: err
               });
            }
            else {
                var newMerchant = new merchantModel();
                newMerchant.store_name = req.body.store_name;
                newMerchant.business_email_address = req.body.business_email_address;
                newMerchant.password = hash;
                newMerchant.save(function(err, created){
                    if(err){
                        return res.status(400).json({success: false, error: err});
                    }
                    else{
                        res.status(201).json({success:true, data: created})
                    }
                }); 
                
            }}) 
    }
}
