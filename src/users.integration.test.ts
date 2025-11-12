import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createTestServer } from "./__tests__/helpers/testServer.js";
import type { Server } from "http";

describe("User Routes Integration Tests", () => {
  let server: Server;

  beforeAll(() => {
    server = createTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const response = await request(server).get("/users");

      expect(response.status).toBe(200);
      expect(response.body.users).toHaveLength(2);
      expect(response.body.users[0]).toHaveProperty("id");
      expect(response.body.users[0]).toHaveProperty("name");
      expect(response.body.users[0]).toHaveProperty("email");
    });

    it("should filter users by search query", async () => {
      const response = await request(server).get("/users?q=john");

      expect(response.status).toBe(200);
      expect(response.body.users).toHaveLength(1);
      expect(response.body.users[0].name).toBe("John Doe");
    });

    it("should return empty array when no users match query", async () => {
      const response = await request(server).get("/users?q=nonexistent");

      expect(response.status).toBe(200);
      expect(response.body.users).toHaveLength(0);
    });
  });

  describe("GET /users/:id", () => {
    it("should return user by id with timing metadata", async () => {
      const response = await request(server).get("/users/1");

      expect(response.status).toBe(200);
      expect(response.body.user).toEqual({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });
      expect(response.body.meta).toHaveProperty("duration");
      expect(response.body.meta.duration).toMatch(/\d+ ms/);
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(server).get("/users/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User with id 999 not found");
    });

    it("should return correct user for id 2", async () => {
      const response = await request(server).get("/users/2");

      expect(response.status).toBe(200);
      expect(response.body.user).toEqual({
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
      });
    });
  });
});
