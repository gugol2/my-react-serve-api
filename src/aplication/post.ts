const dbPosts = [
  { id: 1, title: "First Post", content: "This is the first post.", userId: 1 },
  {
    id: 2,
    title: "Second Post",
    content: "This is the second post.",
    userId: 1,
  },
];

const searchPosts = (query: string) => {
  return query
    ? dbPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      )
    : dbPosts;
};

const findPostById = (id: number) => {
  return dbPosts.find((post) => post.id === id);
};

export { searchPosts, findPostById };
