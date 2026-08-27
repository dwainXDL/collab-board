import { randomUUID } from "node:crypto";

export function requestId(req, res, next) {
  req.id = req.headers["x-request-id"] ?? randomUUID();
  res.set("X-Request-Id", req.id);
  next();
}

export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`,
    );
  });
  next();
}
