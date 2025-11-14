import { describe, it, expect } from 'vitest'
import { searchPosts, findPostById } from './post.js'

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

  it('should return all posts when query is empty', () => {
    const result = searchPosts('')
    expect(result).toHaveLength(2)
  })
})

describe('findPostById', () => {
  it('should return post when id exists', () => {
    const result = findPostById(1)
    expect(result).toBeDefined()
    expect(result?.title).toBe('First Post')
    expect(result?.content).toBe('This is the first post.')
    expect(result?.userId).toBe(1)
  })

  it('should return post for second id', () => {
    const result = findPostById(2)
    expect(result).toBeDefined()
    expect(result?.title).toBe('Second Post')
    expect(result?.content).toBe('This is the second post.')
    expect(result?.userId).toBe(1)
  })

  it('should return undefined when id does not exist', () => {
    const result = findPostById(999)
    expect(result).toBeUndefined()
  })

  it('should return undefined for negative id', () => {
    const result = findPostById(-1)
    expect(result).toBeUndefined()
  })

  it('should return undefined for zero id', () => {
    const result = findPostById(0)
    expect(result).toBeUndefined()
  })
})
