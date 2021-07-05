// const expect = require("chai").expect;
const request = require("supertest");
// const prompt = require("prompt-sync")();
// const { helloWorld } = require("../testFunctions");
// const testFunctions = require("../testFunctions");

// helloWorld = testFunctions.helloWorld();
// var a = prompt("Enter number 1: ");
// var b = prompt("Enter number 2: ");
// multiply = testFunctions.multiply(Number(a),Number(b));
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect

chai.use(chaiHttp)
chai.should();
const local = require("../local")
const {app} = require("../index");
var app1 = request.agent(app);
// var userModel = require("../../users/models/user-models");
var dealsandcouponsModel = require("../models/dealsorcoupons-models");


describe("GET Request", function () {
    describe("Getting all the deals and coupons from the offers collection of the DealsandCouponsOffers Database.",function(){
    it("A successful get request should return status code equal to 200 and all the deals and coupons.", (done) => {
      chai.request(app).get("/dealsorcouponsrights/dealsorcoupons").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return any deal or coupon.", (done) => {
            chai.request(app).get("/dealsorcouponsrights/dealsorcoupon").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

describe("POST Request.", function(){
    describe("Adding a new deal or coupon into the offers collection of the DealsandCouponsOffers Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
            let res = await chai
        	.request(app)
        	.post('/dealsorcouponsrights/adddealorcoupon').send({lmd_id:"633$55",store:"au.zaful.com",offer_text:"Avail 18% Discount on all products",offer_value:"18%",title:"Get Flat 18% OFF",description:"This promotional offer is valid on all products (Products include Clothing, Footwear, Accessories and more)",code:"18FALL",terms_and_conditions:"Testing..",categories:"Fashion,Mens Apparels,Womens Apparels,Footwear,Fashion Accessories",category_array:{Fashion:["Mens Apparels","Womens Apparels","Footwear","Fashion Accessories"]},featured:"No",url:"https://au.zaful.com/",smartLink:"http://linkmydeals.com/smartlink/?account_id=4514&network=&url=https%3A%2F%2Fau.zaful.com%2F",image_url:"https://c.cfjump.com/Avatars/ECED3475-931C-41F1-B3CD-513CD7FDFDCA.png",type:"Code",offer:"Percentage-Off",status:"active",start_date:"2021-01-28",end_date:"2022-01-01"})

    expect(res.status).to.equal(201);
    res.body.data.should.be.a('object');
    res.body.data.should.have.property('_id');
    res.body.data.should.have.property('lmd_id').eq("633$55");
    res.body.data.should.have.property('store').eq("au.zaful.com");
    res.body.data.should.have.property('type').eq("Code");
     });
     afterEach(async () => {
    	await dealsandcouponsModel.deleteOne({lmd_id: "633$55"}, function(err){
            if (err) return handleError(err);
        })
	    });
    });
});

describe("PUT Request.", function(){
    describe("Updating a deal or coupon in the offers collection of the DealsandCouponsOffers Database.",function(){
        it("Successful updation should return status code equal to 200 and the updated deal or coupon.", async function(){
            const id = "60d25cb6ef01a9e6b4635d83";
            let res = await chai
        	.request(app)
        	.put('/dealsorcouponsrights/updatedorc/' + id).send({
               offer_text: "Avail 28% Discount on all products"
    })

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
    res.body.should.have.property('_id');
    res.body.should.have.property('lmd_id')
    res.body.should.have.property('store')
    res.body.should.have.property('type')
    res.body.should.have.property('offer_text').eq("Avail 28% Discount on all products")
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await
        request(app)
        .put('/dealsorcouponsrights/updatedorc/' + id).send({
            offer_text: "Avail 28% Discount on all products"
});

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting a deal or coupon from the offers collection of the DealsandCouponsOffers Database.",function(){
        it("Successful deletion should delete a user and return status code equal to 200.", async function(){
            const id = "60d25cb6ef01a";
            let res = await chai
        	.request(app)
        	.delete('/dealsorcouponsrights/deletedorc/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(app)
        .delete('/dealsorcouponsrights/deletedorc/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});

// 60d25cb6ef01a9e6b4635d7d