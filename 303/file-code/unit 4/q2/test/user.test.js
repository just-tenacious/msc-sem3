const { expect } = require("chai");
const getUser = require("../user");
describe("getUser Async Function", function () {
    it("should return the expected user", async function () {
        const user = await getUser();
        expect(user.id).to.equal(1);
        expect(user.name).to.equal("Shraddha");
    });
});