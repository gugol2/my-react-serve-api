import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createTestServer } from "../__tests__/helpers/testServer.js";
import type { Server } from "http";
import { PostRoutes } from "./posts.js";

describe("Post Routes Integration Tests", () => {
  let server: Server;

  beforeAll(() => {
    server = createTestServer(PostRoutes);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /posts", () => {
    it("should return all posts", async () => {
      const response = await request(server).get("/posts");

      expect(response.status).toBe(200);
      expect(response.body.posts).toHaveLength(2);
      expect(response.body.posts[0]).toHaveProperty("id");
      expect(response.body.posts[0]).toHaveProperty("title");
      expect(response.body.posts[0]).toHaveProperty("content");
      expect(response.body.posts[0]).toHaveProperty("userId");
    });

    it("should filter posts by search query in title", async () => {
      const response = await request(server).get("/posts?q=first");

      expect(response.status).toBe(200);
      expect(response.body.posts).toHaveLength(1);
      expect(response.body.posts[0].title).toBe("First Post");
    });

    it("should filter posts by search query in content", async () => {
      const response = await request(server).get("/posts?q=second post");

      expect(response.status).toBe(200);
      expect(response.body.posts).toHaveLength(1);
      expect(response.body.posts[0].id).toBe(2);
    });

    it("should return empty array when no posts match query", async () => {
      const response = await request(server).get("/posts?q=nonexistent");

      expect(response.status).toBe(200);
      expect(response.body.posts).toHaveLength(0);
    });
  });

  describe("GET /posts/:id", () => {
    it("should return post by id", async () => {
      const response = await request(server).get("/posts/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        title: "First Post",
        content: "This is the first post.",
        userId: 1,
      });
    });

    it("should return 404 for non-existent post", async () => {
      const response = await request(server).get("/posts/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Post with id 999 not found");
    });

    it("should return correct post for id 2", async () => {
      const response = await request(server).get("/posts/2");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 2,
        title: "Second Post",
        content: "This is the second post.",
        userId: 1,
      });
    });
  });
});
