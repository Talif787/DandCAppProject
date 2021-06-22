var dealsandModel = require('../models/dealsorcoupons-models');

module.exports = function (req, res){
    var newDealorCoupon = new dealsandModel();
    newDealorCoupon.lmd_id = req.body.lmd_id;
    newDealorCoupon.store = req.body.store;
    newDealorCoupon.offer_text = req.body.offer_text;
    newDealorCoupon.offer_value = req.body.offer_value;
    newDealorCoupon.title = req.body.title;
    newDealorCoupon.description = req.body.description;
    newDealorCoupon.code = req.body.code;
    newDealorCoupon.terms_and_conditions = req.body.terms_and_conditions;
    newDealorCoupon.categories = req.body.categories;
    newDealorCoupon.category_array = req.body.category_array;
    newDealorCoupon.featured = req.body.featured;
    newDealorCoupon.url = req.body.url;
    newDealorCoupon.smartLink = req.body.smartLink;
    newDealorCoupon.image_url = req.body.image_url;
    newDealorCoupon.type = req.body.type;
    newDealorCoupon.offer = req.body.offer;
    newDealorCoupon.status = req.body.status;
    newDealorCoupon.start_date = req.body.start_date;
    newDealorCoupon.end_date = req.body.end_date;
    

    if(Object.keys(req.body).length === 0 ){
        res.send("There's no data to insert..")
    }
    else{
        newDealorCoupon.save(function(err, created){
            if(err){
                return res.status(400).json({success: false, error: err});
            }
            else{
                res.status(200).json({success:true, data: created})
            }
        });   
    }
   
}






// var admin1 = new Admin({ full_name: "Talif Pathan",
//     email_address: "talifpathan13@gmail.com",
//     password: "Talifrgit",
//     mobile_number: 7678089559 });
 
//     // save model to database
// admin1.save(function (err, admin) {
//     if (err) return console.error(err);
//     console.log(admin.name + " saved to admins collection.");
// });
     