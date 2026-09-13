const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
describe("GET /profile Authentication", function () {
    it("should return profile for a valid token", async function () {
        const response = await request(app)
            .get("/profile")
            .set("Authorization", "Bearer secret123");
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
            id: 1,
            name: "Shraddha",
            role: "Student"
        });
    });
    it("should return 401 for an invalid token", async function () {
        const response = await request(app)
            .get("/profile")
            .set("Authorization", "Bearer wrongtoken");
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal("Unauthorized");
    });
});