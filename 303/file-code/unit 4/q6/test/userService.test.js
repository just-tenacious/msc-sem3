const { expect } = require("chai");
const sinon = require("sinon");

const emailService = require("../emailService");
const { registerUser } = require("../userService");

describe("UserService - Email Mocking", function () {

    it("should call email service when user registers", function () {

        const emailStub = sinon.stub(emailService, "sendEmail");

        const user = registerUser(
            "Shraddha",
            "shraddha@example.com"
        );

        expect(user.name).to.equal("Shraddha");
        expect(user.email).to.equal("shraddha@example.com");

        expect(emailStub.calledOnce).to.equal(true);

        expect(emailStub.calledWith(
            "shraddha@example.com",
            "Welcome to our application!"
        )).to.equal(true);

        emailStub.restore();
    });

});