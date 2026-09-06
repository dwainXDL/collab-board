import mongoose from "mongoose";
import {AppError}from "../utils/AppError.js";

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid task ID format", 404));
  }
  
  next();
};