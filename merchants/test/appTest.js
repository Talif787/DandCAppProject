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
var merchantModel = require("../models/merchant-models");


describe("GET Request", function () {
    describe("Getting all the merchants from the merchants collection of the DealsandCouponsMerchants Database.",function(){
    it("A successful get request should return status code equal to 200 and all the merchants.", (done) => {
      chai.request(server.app).get("/merchantrights/merchants").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return any merchant.", (done) => {
            chai.request(server.app).get("/merchantrights/merchant").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});


describe("GET Request By _id", function () {
    describe("Getting a particular merchant from the merchants collection of the DealsandCouponsMerchants Database.",function(){
    it("A successful get request should return status code equal to 200 and all the particular merchant.", (done) => {
        const id = "60d9021b9238b980d58f8956";
        chai.request(server.app).get("/merchantrights/merchant/"+id).end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('object');
          done();   
            });
        });
        it("Should not return any merchant.", (done) => {
            const id = "123";
            chai.request(server.app).get("/merchantrights/merchant/"+id).end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

describe("POST Request.", function(){
    describe("Adding a new merchant into the merchants collection of the DealsandCouponsMerchants Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
            let res = await chai
        	.request(server.app)
        	.post('/merchantrights/addmerchant').send({
                store_name: "Merchant Testing...",
                business_email_address: "abc@merchant.com",
                password: "abc#$%"
    })

    expect(res.status).to.equal(201);
    res.body.should.be.a('object');
    res.body.data.should.have.property('_id');
    res.body.data.should.have.property('store_name').eq("Merchant Testing...");
    res.body.data.should.have.property('business_email_address').eq("abc@merchant.com");
    res.body.data.should.have.property('password');
     });
     afterEach(async () => {
    	await merchantModel.deleteOne({store_name: "Merchant Testing..."})
	    });
    });
});

describe("PUT Request.", function(){
    describe("Updating a merchant in the merchants collection of the DealsandCouponsMerchants Database.",function(){
        it("Successful updation should return status code equal to 200 and the updated merchant.", async function(){
            const id = "60d9021b9238b980d58f8956";
            let res = await chai
        	.request(server.app)
        	.put('/merchantrights/updatemerchant/' + id).send({
                password: "abx123#"
    })

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
    res.body.should.have.property('_id');
    res.body.should.have.property('store_name').eq("Amazon");
    res.body.should.have.property('business_email_address').eq("jp@amazon.com");
    res.body.should.have.property('password');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .put('/merchantrights/updatemerchant/' + id).send({
            password: "abx123#"
});

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting a merchant in the merchants collection of the DealsandCouponsMerchants Database.",function(){
        it("Successful deletion should delete a merchant and return status code equal to 200.", async function(){
            const id = "60d4d7a5";
            let res = await chai
        	.request(server.app)
        	.delete('/merchantrights/deletemerchant/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .delete('/merchantrights/deletemerchant/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});


// 60e113635ba36d7e3ef5181b