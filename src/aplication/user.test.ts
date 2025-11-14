import { describe, it, expect } from 'vitest'
import { searchUsers, findUserById } from './user.js'

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

  it('should return all users when query is empty', () => {
    const result = searchUsers('')
    expect(result).toHaveLength(2)
  })
})

describe('findUserById', () => {
  it('should return user when id exists', () => {
    const result = findUserById(1)
    expect(result).toBeDefined()
    expect(result?.name).toBe('John Doe')
    expect(result?.email).toBe('john@example.com')
  })

  it('should return user for second id', () => {
    const result = findUserById(2)
    expect(result).toBeDefined()
    expect(result?.name).toBe('Jane Smith')
    expect(result?.email).toBe('jane@example.com')
  })

  it('should return undefined when id does not exist', () => {
    const result = findUserById(999)
    expect(result).toBeUndefined()
  })

  it('should return undefined for negative id', () => {
    const result = findUserById(-1)
    expect(result).toBeUndefined()
  })

  it('should return undefined for zero id', () => {
    const result = findUserById(0)
    expect(result).toBeUndefined()
  })
})
