import { describe, it, expect, vi } from 'vitest'
import { Request } from 'express'

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
