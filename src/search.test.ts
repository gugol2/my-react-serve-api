import { describe, it, expect } from 'vitest'

// Mock data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.', userId: 1 },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the second post.',
    userId: 1
  }
]

// Search functions (extracted from components)
const searchUsers = (query: string) => {
  return users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  )
}

const searchPosts = (query: string) => {
  return posts.filter(
    post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  )
}

describe('searchUsers', () => {
  it('should return users matching the query', () => {
    const result = searchUsers('john')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('John Doe')
  })

  it('should be case insensitive', () => {
    const result = searchUsers('JANE')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Jane Smith')
  })

  it('should return empty array when no match', () => {
    const result = searchUsers('nonexistent')
    expect(result).toHaveLength(0)
  })

  it('should return all users matching partial name', () => {
    const result = searchUsers('e')
    expect(result).toHaveLength(2)
  })
})

describe('searchPosts', () => {
  it('should return posts matching title', () => {
    const result = searchPosts('first')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('First Post')
  })

  it('should return posts matching content', () => {
    const result = searchPosts('second post')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('should be case insensitive', () => {
    const result = searchPosts('FIRST')
    expect(result).toHaveLength(1)
  })

  it('should return empty array when no match', () => {
    const result = searchPosts('nonexistent')
    expect(result).toHaveLength(0)
  })

  it('should search in both title and content', () => {
    const result = searchPosts('post')
    expect(result).toHaveLength(2)
  })
})
