export class AppError extends Error {
  constructor(message, status = 500, code = "INTERNAL_ERROR", details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.isOperational = true;
  }
}

export class NotFoundError extends AppError {
  constructor(what = "Resource") {
    super(`${what} NOT FOUND!`, 404, "NOT_FOUND");
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super("YOU DO NOT HAVE PERMISSIONS FOR THAT!", 403, "FORBIDDEN");
  }
}

export class ValidationError extends AppError {
  constructor(details) {
    super("VALIDATION FAILED!", 400, "VALIDATION_ERROR", details);
  }
}
