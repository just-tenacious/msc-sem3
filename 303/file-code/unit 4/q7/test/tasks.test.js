const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
describe("Task Application", function () {
  beforeEach(function () {
    app.clearTasks();
  });
  it("should create a new task", async function () {
    const response = await request(app).post("/tasks").send({
      title: "Learn Node.js",
      completed: false,
    });
    expect(response.status).to.equal(201);
    expect(response.body.title).to.equal("Learn Node.js");
    expect(response.body.completed).to.equal(false);
  });
  it("should retrieve all tasks", async function () {
    await request(app).post("/tasks").send({
      title: "Learn Mocha",
      completed: false,
    });
    const response = await request(app).get("/tasks");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(1);
  });
  it("should reject a task without a title", async function () {
    const response = await request(app).post("/tasks").send({
      completed: false,
    });
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Title is required");
  });
});
