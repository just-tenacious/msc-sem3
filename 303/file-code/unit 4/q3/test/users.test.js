const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
describe("GET /users", function () {
    it("should return all users", async function () {
        const response = await request(app).get("/users");
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal([
            { id: 1, name: "Shraddha"},
            { id: 2, name: "Shrusti"}
        ]);
    });
});