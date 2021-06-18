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
const server = require("../index");
var app = request.agent(server);

describe("Post Request.", function(){
    describe("Adding a new user into the users collection of the DealsandCouponsUsers Database.",function(){
        it("Successful insertion must return the success message", async function(){
            let res = await chai
        	.request(server)
        	.post('/adminrights/user').send({
                full_name: "Swaroop Lute Testing...",
                email_address: "swrp123@gmail.com",
                password: "swp123$%",
                mobile_number: 9876756765
    })

    expect(res.status).to.equal(200);
        });
    });
});