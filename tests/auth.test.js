require("dotenv").config();
const request = require("supertest");
const app = require("../app");

const { User, sequelize } = require("../models");
describe("Auth Routes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "testuser",
        password: "Testpass123",
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("token");
    });

    it("should return validation errors", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "a",
        password: "short",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toContain(
        "Username must be at least 3 characters"
      );
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      await User.create({
        username: "Admin",
        password: "ValidPass123",
      });

      const res = await request(app).post("/api/auth/login").send({
        username: "Admin",
        password: "ValidPass123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    });
  });
});
