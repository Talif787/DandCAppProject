const express = require('express');
var dealsOrCouponsController = require('../controllers/insert-dealsorcoupons-controller');
const router = express.Router();
const dealsOrCouponsModel = require('../models/dealsorcoupons-models');
// var connectToDb = require('../database');




// router.get('/hashtags', (req, res) => {
//     api.get(req.path).then(resp => {
//       res.send(resp.data)
//     })
//   })


/**
 * @openapi
 * tags: 
 *      name: DealsorCoupons
 *      description: The deals or coupons managing API.
 */

/**
 * @openapi
 * components:
 *      schemas:
 *          DealsorCoupons:
 *              type: object
 *              required:
 *                  - lmd_id
 *                  - store
 *                  - offer_text
 *                  - offer_value
 *                  - title
 *                  - description
 *                  - code
 *                  - terms_and_conditions
 *                  - categories
 *                  - category_array
 *                  - featured
 *                  - url
 *                  - smartLink
 *                  - image_url
 *                  - type
 *                  - offer
 *                  - status
 *                  - start_date
 *                  - end_date
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto_generated ObjectId of the deal or coupon.
 *                  lmd_id:
 *                      type: string
 *                      description: The id of the deal or coupon.
 *                  store:
 *                      type: string
 *                      description: The name of the store.
 *                  offer_text:
 *                      type: string
 *                      description: The text on the offer.
 *                  offer_value:
 *                      type: string
 *                      description: The discount available.
 *                  title:
 *                      type: string
 *                      description: The title of the deal or coupon.
 *                  description:
 *                      type: string
 *                      description: Short description about the deal or the coupon.
 *                  code:
 *                      type: string
 *                      description: The code for the deal or the coupon.
 *                  terms_and_conditions:
 *                      type: string
 *                      description: The terms and conditions for the deal or the coupon.
 *                  categories:
 *                      type: string
 *                      description: The categories for the deal or the coupon.
 *                  category_array: 
 *                      type: object
 *                      description: The category of the deal or coupon.
 *                      properties: 
 *                          Fashion:
 *                              type: array
 *                              description: It belongs to the fashion category.
 *                          Travel:
 *                              type: array
 *                              description: It belongs to the travel category.
 *                  featured:
 *                      type: string
 *                      description: Whether the deal or the coupon is featured or not.
 *                  url:
 *                      type: string
 *                      description: The link of the deal or the coupon.
 *                  smartLink:
 *                      type: string
 *                      description: The smartlink of the deal or the coupon.
 *                  image_url:
 *                      type: string
 *                      description: The link for the image of the company offering the deal or the coupon.
 *                  type:
 *                      type: string
 *                      description: Whether it's a deal or a coupon.
 *                  offer:
 *                      type: string
 *                      description: What is the offer by deal or the coupon.
 *                  status:
 *                      type: string
 *                      description: Is the deal or coupon active or has been expired.
 *                  start_date:
 *                      type: string
 *                      description: The start date from which the coupon or the deal activates.
 *                  end_date:
 *                      type: string
 *                      description: The end date till which the coupon or the deal will be alive.
 *              example:
 *                  id: 60d25cb6ef01a9e6b4635d77
 *                  lmd_id: "693233"
 *                  store: au.zaful.com
 *                  offer_text: Avail Extra 15% Discount on all products
 *                  offer_value: Sign-Up Offer
 *                  title: Extra 15% off
 *                  description: This coupon is applicable on all products (For New users only)
 *                  code: I8FALL
 *                  terms_and_conditions: ""
 *                  categories: Fashion,Mens Apparels,Womens Apparels,Footwear,Handbags and Wallets,Jewellery,Travel,Travel Accessories
 *                  category_array: {Fashion: ["Mens Apparel", "Footwear"], Travel: ["Travel accessories"]}
 *                  featured: No
 *                  url: https://au.zaful.com/
 *                  smartLink: http://linkmydeals.com/smartlink/?account_id=4514&network=&url=https%3A%2F%2Fau.zaful.com%2F
 *                  image_url: ""
 *                  type: Deal
 *                  offer: Sign-Up
 *                  status: active
 *                  start_date: 2020-12-31T00:00:00.000Z
 *                  end_date: 2021-07-04T00:00:00.000Z
 */




/**
 * @openapi
 * /dealsorcouponsrights/dealsorcoupons:
 *      get:
 *          summary: Returns all the deals and coupons stored in the dealsorcoupons collection of the DealsandCouponsOffers Database.
 *          tags: [DealsorCoupons]  
 *          responses:
 *              200:
 *                  description: The list of the dealsandcoupons.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/DealsorCoupons'
 */

router.get('/dealsorcoupons', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Deals and Coupons!!");
    dealsOrCouponsModel.find({}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            // console.log("Document length",docs.length);
            res.status(200).json(docs);
        }
    });
});

/**
 * @openapi
 * /dealsorcouponsrights/dealorcoupon/{id}:
 *      get:
 *          summary: Returns a particular deal/coupon stored in the offers collections of the DealsandCouponsOffers Database.
 *          tags: [DealsorCoupons]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The offer id.
 *          responses:
 *              200:
 *                  description: A particular deal/coupon.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  _id: d5fE_asz
 *                                  store_name: Amazon
 *                                  business_email_address: abc@amazon.com
 *                                  password: abc123$                             
 */

router.get('/dealorcoupon/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    dealsOrCouponsModel.findById(req.params.id, (err,data) => {
        if(err){
            res.status(404).json({success: false, error: err});
        }
        else{
            res.status(200).json(data);
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
    dealsOrCouponsModel.find({
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


router.get('/lastdealorcoupon', function (req,res){

    dealsOrCouponsModel.find({}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            console.log("Document length",docs.length);
            const last = docs.length;
            res.status(200).json(docs[last-1]);
        }
    });

});


/**
 * @openapi
 * /dealsorcouponsrights/adddealorcoupon/:
 *      post:
 *          summary: Create a new deal/coupon in the offers collections of the DealsandCouponsOffers Database.
 *          tags: [DealsorCoupons] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         example:
 *                              { "store_name": "Amazon",  "business_email_address": "abc@amazon.com", "password": "abc123$" }
 *          responses:
 *              '201':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  success: true
 *                                  data: { "_id": "60d368a899be30066e2a8db3",  "store_name": "Amazon",  "business_email_address": "abc@amazon.com", "password": "abc123$", "__v": 0 }                              
 */

router.post('/adddealorcoupon',dealsOrCouponsController);




/**
 * @openapi
 * /dealsorcouponsrights/updatedorc/{id}:
 *      put:
 *          summary: Update an deal/coupon by its id in the offers collections of the DealsandCouponsOffers Database.
 *          tags: [DealsorCoupons] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The deal/couponid.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"business_email_address": "abx@amazon.com", "password": "abc123$%"}
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: d5fE_asz
 *                                  store_name: Amazon
 *                                  business_email_address: abx@amazon.com
 *                                  password: abc123$%
 *              '404':
 *                  description: The deal/coupon was not found.
 *              '500':
 *                  description: There was some server error.
 */

router.put('/updatedorc/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
   //  res.send("Hello World!! Welcome to update a user!!");
   dealsOrCouponsModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

      if(err){
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).json(result);
      }

  })
});




/**
 * @openapi
 * /dealsorcouponsrights/deletedorc/{id}:
 *      delete:
 *          summary: Remove the deal/coupon by its id.
 *          tags: [DealsorCoupons] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The deal/coupon id.
 *          responses:
 *              '200':
 *                  description: The deal/coupon will be deleted.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              Deal/Coupon deleted with _id: 123edfz
 *              '404':
 *                  description: The merchant was not found.
 */

router.delete('/deletedorc/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
   //  res.send("Hello World!! Welcome to delete a user!!");
   dealsOrCouponsModel.deleteMany({_id: req.params.id}, function (err, _) {
      if (err) {
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).send(`Deal/Coupon deleted with _id: ${req.params.id}`);
      }
  });
});  







module.exports = router;
