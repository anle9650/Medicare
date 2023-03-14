const app = require("../index.js");
const mongoose = require("mongoose");
const request = require("supertest");

beforeAll((done) => {
  done();
});

afterAll((done) => {
  app.close();
  mongoose.connection.close();
  done();
});

describe("Task Endpoints", () => {
  it("GET /api/tasks should show all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /api/tasks/:id should show a task", async () => {
    const res = await request(app).get("/api/tasks/63fbac802130eb6bd53fc874");
    expect(res.statusCode).toEqual(200);
    expect(res.body.content).toEqual("Set up afternoon meeting");
  });
});
