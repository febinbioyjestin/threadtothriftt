const request = require("supertest");
const app = require("../app");

describe("Product routes", () => {
  test("GET /api/products returns 404 until routes are implemented", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(404);
  });
});
