const app = require("../index.js");
const mongoose = require("mongoose");
const request = require("supertest");

afterAll((done) => {
  app.close();
  mongoose.connection.close();
  done();
});

describe("GET /api/tasks", () => {
  it("should show all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/tasks/:id", () => {
  it("should show a task", async () => {
    const res = await request(app).get("/api/tasks/63fbac802130eb6bd53fc874");
    expect(res.statusCode).toEqual(200);
    expect(res.body.content).toEqual("Set up afternoon meeting");
  });
});

describe("POST /api/tasks", () => {
  it("should create a task", async () => {
    const res = await request(app).post("/api/tasks").send({
      content: "New Task",
      completed: false,
      deadline: new Date(),
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.content).toBe("New Task");
  });
});

describe("PUT /api/tasks/:id", () => {
  it("should update a task", async () => {
    const res = await request(app)
      .put("/api/tasks/640fe4deddecd12eaca39c43")
      .send({
        content: "Updated Task",
        completed: true,
        deadline: new Date(),
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe("Updated Task");
    expect(res.body.completed).toBe(true);
  });
});

describe("DELETE /api/tasks/:id", () => {
  it("should delete a task", async () => {
    const res = await request(app).delete(
      "/api/tasks/63fbacc62130eb6bd53fc876"
    );
    expect(res.statusCode).toBe(200);
  });
});