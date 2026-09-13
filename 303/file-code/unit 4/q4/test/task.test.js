const { expect } = require("chai");
const { addTask,getTasks,clearTasks} = require("../task");

describe("Task Application - Setup and Teardown", function () {
    // Runs once before all tests
    before(function () {
        clearTasks();
        console.log("Initial setup completed");
    });
    // Runs before every test
    beforeEach(function () {
        addTask({
            id: 1,
            title: "Learn Mocha",
            completed: false
        });
    });
    // Runs after every test
    afterEach(function () {
        clearTasks();
    });
    // Runs once after all tests
    after(function () {
        clearTasks();
        console.log("Final cleanup completed");
    });
    it("should add test data before each test", function () {
        const tasks = getTasks();
        expect(tasks).to.have.lengthOf(1);
        expect(tasks[0].title).to.equal("Learn Mocha");
    });
    it("should contain incomplete task", function () {
        const tasks = getTasks();
        expect(tasks[0].completed).to.equal(false);
    });

});