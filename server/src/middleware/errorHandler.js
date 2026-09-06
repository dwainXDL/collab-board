import { AppError } from "../utils/AppError.js";

export function notFoundHandler(req, res, next) {
  next(new AppError("ROUTE NOT FOUND!", 404, "NOT_FOUND"));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err?.code === 11000) {
  err.status = 409;
  err.code = "EMAIL_IN_USE";
  err.message = "Email already exists";
}
  const status = err.status ?? 500;
  const body = {
    message: status === 500 ? "SOMETHING WENT WRONG..." : err.message,
    code: err.code ?? "INTERNAL_ERROR",
    requestId: req.id,
  };
  if (err.details) body.details = err.details;
  if (status >= 500) console.error(req.id, err);
  res.status(status).json(body);
}
