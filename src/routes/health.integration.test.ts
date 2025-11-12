import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createTestServer } from "../__tests__/helpers/testServer.js";
import type { Server } from "http";
import { HealthRoutes } from "./health.js";

describe("Health Route Integration Tests", () => {
  let server: Server;

  beforeAll(() => {
    server = createTestServer(HealthRoutes);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /health", () => {
    it("should return welcome message", async () => {
      const response = await request(server).get("/health");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "ok",
        timestamp: expect.any(String),
      });
    });
  });
});
