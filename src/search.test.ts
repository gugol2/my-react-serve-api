import { describe, it, expect } from "vitest";

const posts = [
  { id: 1, title: "First Post", content: "This is the first post.", userId: 1 },
  {
    id: 2,
    title: "Second Post",
    content: "This is the second post.",
    userId: 1,
  },
];

const searchPosts = (query: string) => {
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );
};

describe("searchPosts", () => {
  it("should return posts matching title", () => {
    const result = searchPosts("first");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("First Post");
  });

  it("should return posts matching content", () => {
    const result = searchPosts("second post");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("should be case insensitive", () => {
    const result = searchPosts("FIRST");
    expect(result).toHaveLength(1);
  });

  it("should return empty array when no match", () => {
    const result = searchPosts("nonexistent");
    expect(result).toHaveLength(0);
  });

  it("should search in both title and content", () => {
    const result = searchPosts("post");
    expect(result).toHaveLength(2);
  });
});
