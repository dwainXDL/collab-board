import mongoose from "mongoose";
import { NotFoundError } from "../utils/AppError.js";

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return next(new NotFoundError("Resource"));
  }
  next();
};
