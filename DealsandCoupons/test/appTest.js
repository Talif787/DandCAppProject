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
const server = require("../index");
var app = request.agent(server.app);
var userModel = require("../../users/models/user-models");
var dealsandcouponsModel = require("../models/dealsorcoupons-models");


describe("GET Request", function () {
    describe("Getting all the deals and coupons from the offers collection of the DealsandCouponsOffers Database.",function(){
    it("A successful get request should return status code equal to 200 and all the deals and coupons.", (done) => {
      chai.request(server.app).get("/dealsorcouponsrights/dealsorcoupons").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return any deal or coupon.", (done) => {
            chai.request(server.app).get("/dealsorcouponsrights/dealsorcoupon").end((err, res)=> {
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
        	.request(server.app)
        	.post('/dealsorcouponsrights/adddealorcoupon').send({
                full_name: "Admin Testing...",
                email_address: "admin123@gmail.com",
                password: "admin",
                mobile_number: 9876755555
    })

    expect(res.status).to.equal(201);
    res.body.should.be.a('object');
    res.body.data.should.have.property('_id');
    res.body.data.should.have.property('full_name').eq("Admin Testing...");
    res.body.data.should.have.property('email_address').eq("admin123@gmail.com");
    res.body.data.should.have.property('password').eq("admin");
    res.body.data.should.have.property('mobile_number').eq(9876755555);
     });
     afterEach(async () => {
    	await dealsandcouponsModel.deleteOne({mobile_number: 9876755555}, function(err){
            if (err) return handleError(err);
        })
	    });
    });
});

describe("PUT Request.", function(){
    describe("Updating a deal or coupon in the offers collection of the DealsandCouponsOffers Database.",function(){
        it("Successful updation should return status code equal to 200 and the updated deal or coupon.", async function(){
            const id = "60d25cb6ef01a9e6b4635d77";
            let res = await chai
        	.request(server.app)
        	.put('/dealsorcouponsrights/updatedorc/' + id).send({
                full_name: "Talif Pathan Update1..",
                password: "tp786"
    })

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
    res.body.should.have.property('_id');
    res.body.should.have.property('full_name').eq("Talif Pathan Update1..");
    res.body.should.have.property('email_address').eq("talifpathan13@gmail.com");
    res.body.should.have.property('password').eq("tp786");
    res.body.should.have.property('mobile_number').eq(7678089559);
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .put('/dealsorcouponsrights/updatedorc/' + id).send({
            full_name: "Swaroop Lute Update1...",
            password: "swp123$%2333"
});

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting a deal or coupon from the offers collection of the DealsandCouponsOffers Database.",function(){
        it("Successful deletion should delete a user and return status code equal to 200.", async function(){
            const id = "60d25cb6ef01a9e6b4635d77";
            let res = await chai
        	.request(server.app)
        	.delete('/dealsorcouponsrights/deletedorc/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .delete('/dealsorcouponsrights/deletedorc/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});