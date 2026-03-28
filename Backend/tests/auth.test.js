const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

jest.mock("../models/User");

describe("Auth routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/auth/register returns 400 when fields missing", async () => {
    const response = await request(app).post("/api/auth/register").send({});
    expect(response.status).toBe(400);
  });

  test("POST /api/auth/register returns 409 when email exists", async () => {
    User.findOne.mockResolvedValue({ _id: "existing" });
    const response = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(409);
  });

  test("POST /api/auth/login returns 401 when user missing", async () => {
    User.findOne.mockResolvedValue(null);
    const response = await request(app).post("/api/auth/login").send({
      email: "missing@example.com",
      password: "password123",
    });
    expect(response.status).toBe(401);
  });

  test("POST /api/auth/login returns 200 with valid credentials", async () => {
    User.findOne.mockResolvedValue({
      _id: "user-id",
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "user",
    });
    const response = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user.email", "test@example.com");
  });
});
