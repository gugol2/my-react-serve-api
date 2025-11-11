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
