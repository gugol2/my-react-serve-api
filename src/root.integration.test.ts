import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createTestServer } from "./__tests__/helpers/testServer.js";
import type { Server } from "http";
import { RootRoutes } from "./root.js";

describe("Root Route Integration Tests", () => {
  let server: Server;

  beforeAll(() => {
    server = createTestServer(RootRoutes);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return welcome message", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Welcome to the API Root!",
      });
    });
  });
});
