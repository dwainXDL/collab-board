import { ValidationError } from "../utils/AppError.js";

export const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const details = result.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));
      return next(new ValidationError(details));
    }
    req[source] = result.data; // parsed + coerced
    next();
  };
