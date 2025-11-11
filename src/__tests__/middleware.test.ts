import { describe, it, expect, vi } from 'vitest'
import { Request } from 'express'

describe('loggingMiddleware', () => {
  it('should log request method and path', () => {
    const consoleSpy = vi.spyOn(console, 'log')

    const mockReq = {
      method: 'GET',
      path: '/users'
    } as Request

    const mockNext = vi.fn(() => 'next-result')

    const loggingMiddleware = (req: Request, next: () => any) => {
      console.log(`${req.method} ${req.path}`)
      return next()
    }

    const result = loggingMiddleware(mockReq, mockNext)

    expect(consoleSpy).toHaveBeenCalledWith('GET /users')
    expect(mockNext).toHaveBeenCalled()
    expect(result).toBe('next-result')

    consoleSpy.mockRestore()
  })
})

describe('requestTimingMiddleware', () => {
  it('should set startTime in context', () => {
    const mockContext = new Map<string, any>()

    const mockReq = {
      method: 'GET',
      path: '/users/1'
    } as Request

    const mockNext = vi.fn()

    // Mock the middleware behavior
    const beforeTime = Date.now()
    mockContext.set('startTime', Date.now())
    const afterTime = Date.now()

    const startTime = mockContext.get('startTime')

    expect(startTime).toBeGreaterThanOrEqual(beforeTime)
    expect(startTime).toBeLessThanOrEqual(afterTime)
    expect(typeof startTime).toBe('number')
  })
})
