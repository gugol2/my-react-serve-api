import { MiddlewareFunction } from 'react-serve-js'

export const loggingMiddleware: MiddlewareFunction = (req, next) => {
  console.log(
    `${req.method} ${req.path} ${JSON.stringify(
      req.query
    )}- ${new Date().toISOString()}`
  )
  return next()
}
