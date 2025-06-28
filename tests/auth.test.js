const request = require("supertest");
const app = require("../app"); // atau server.js tergantung struktur kamu

describe("Auth Endpoints", () => {
  it("should register user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should login user", async () => {
    await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
