import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import request from "supertest";
import { createTestServer } from "../__tests__/helpers/testServer.js";
import type { Server } from "http";
import { TodoRoutes } from "./todo.js";
import * as todoDI from "../infrastructure/di.js";

describe("Todo Routes Integration Tests", () => {
  let server: Server;

  beforeAll(() => {
    server = createTestServer(TodoRoutes);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /todos", () => {
    it("should return all todos", async () => {
      const response = await request(server).get("/todos");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("title");
      expect(response.body[0]).toHaveProperty("completed");
    });
  });

  describe("GET /todos/:id", () => {
    it("should return todo by id", async () => {
      const response = await request(server).get("/todos/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        title: "Learn React",
        completed: false,
      });
    });

    it("should return 404 for non-existent todo", async () => {
      const response = await request(server).get("/todos/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Todo not found");
    });

    it("should return correct todo for id 2", async () => {
      const response = await request(server).get("/todos/2");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 2,
        title: "Try react-serve",
        completed: false,
      });
    });
  });

  describe("POST /todos", () => {
    it("should create a new todo", async () => {
      const response = await request(server)
        .post("/todos")
        .send({ title: "Test todo" });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.title).toBe("Test todo");
      expect(response.body.completed).toBe(false);
    });

    it("should create todo with empty title", async () => {
      const response = await request(server).post("/todos").send({ title: "" });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe("");
      expect(response.body.completed).toBe(false);
    });
  });

  describe("PUT /todos/:id", () => {
    it("should update todo title", async () => {
      const response = await request(server)
        .put("/todos/1")
        .send({ title: "Updated title" });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Updated title");
      expect(response.body.id).toBe(1);
    });

    it("should update todo completed status", async () => {
      const response = await request(server)
        .put("/todos/1")
        .send({ completed: true });

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(true);
    });

    it("should update multiple properties", async () => {
      const response = await request(server)
        .put("/todos/1")
        .send({ title: "New title", completed: false });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("New title");
      expect(response.body.completed).toBe(false);
    });

    it("should return 404 for non-existent todo", async () => {
      const response = await request(server)
        .put("/todos/999")
        .send({ title: "Updated" });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Todo not found");
    });
  });

  describe("DELETE /todos/:id", () => {
    it("should delete todo and return 204", async () => {
      const response = await request(server).delete("/todos/1");

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it("should return 404 for non-existent todo", async () => {
      const response = await request(server).delete("/todos/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Todo not found");
    });

    it("should verify todo is deleted", async () => {
      // First delete the todo
      await request(server).delete("/todos/2");

      // Then try to get it
      const response = await request(server).get("/todos/2");

      expect(response.status).toBe(404);
    });

    it("should return an error when failing to delete a todo", async () => {
      // First create a new todo to delete
      const createResponse = await request(server)
        .post("/todos")
        .send({ title: "Todo to fail deletion" });
      const todoId = createResponse.body.id;

      const deleteSpy = vi
        .spyOn(todoDI, "deleteTodo")
        .mockImplementationOnce(() => {
          throw new Error("Database error");
        });

      const response = await request(server).delete(`/todos/${todoId}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toContain("Failed to delete todo");
      expect(response.body.errorMessage).toBe("Database error");

      deleteSpy.mockRestore();
    });
  });
});
