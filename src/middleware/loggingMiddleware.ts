import { MiddlewareFunction } from "react-serve-js";

export const loggingMiddleware: MiddlewareFunction = (req, next) => {
  console.log(
    `${req.method} - ${req.path} - params:${JSON.stringify(
      req.params
    )} - query: ${JSON.stringify(
      req.query
    )} - date: ${new Date().toISOString()}`
  );
  return next();
};
