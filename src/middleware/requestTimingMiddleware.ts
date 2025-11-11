import { MiddlewareFunction, useSetContext } from "react-serve-js";

export const requestTimingMiddleware: MiddlewareFunction = (req, next) => {
  const startTime = Date.now();
  useSetContext("startTime", startTime);

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

  return next();
};
