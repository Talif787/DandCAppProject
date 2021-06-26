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
var adminModel = require("../models/admin-models");


describe("GET Request", function () {
    describe("Getting all the admins from the admins collection of the DealsandCouponsAdmins Database.",function(){
    it("A successful get request should return status code equal to 200 and all the admins.", (done) => {
      chai.request(server.app).get("/adminrights/admins").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return any user.", (done) => {
            chai.request(server.app).get("/adminrights/admin").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

describe("POST Request.", function(){
    describe("Adding a new admin into the admins collection of the DealsandCouponsAdmins Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
            let res = await chai
        	.request(server.app)
        	.post('/adminrights/addadmin').send({
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
    	await adminModel.deleteOne({mobile_number: 9876755555}, function(err){
            if (err) return handleError(err);
        })
	    });
    });
});

describe("PUT Request.", function(){
    describe("Updating an admin in the admins collection of the DealsandCouponsAdmins Database.",function(){
        it("Successful updation should return status code equal to 200 and the updated admin.", async function(){
            const id = "60ca38df658488fcd2f0be25";
            let res = await chai
        	.request(server.app)
        	.put('/adminrights/updateadmin/' + id).send({
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
        .put('/adminrights/updateadmin/' + id).send({
            full_name: "Swaroop Lute Update1...",
            password: "swp123$%2333"
});

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting an admin from the admins collection of the DealsandCouponsAdmins Database.",function(){
        it("Successful deletion should delete a user and return status code equal to 200.", async function(){
            const id = "60d4a652dc078a127db792b7";
            let res = await chai
        	.request(server.app)
        	.delete('/adminrights/deleteadmin/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .delete('/adminrights/deleteadmin/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});