import mongoose from "mongoose";
import { Task } from "../models/task.model.js";

export const taskRepository = {
  findByBoard(boardId) {
    return Task.find({ boardId });
  },

  findById(id) {
    return Task.findById(id);
  },

  create(data) {
    return Task.create(data);
  },

  update(id, patch) {
    return Task.findByIdAndUpdate(id, patch, {
      new: true,
      runValidators: true,
    });
  },

  updateOptimistic(id, baseVersion, patch) {
    return Task.findOneAndUpdate(
      { _id: id, version: baseVersion },
      { $set: patch, $inc: { version: 1 } },
      { new: true, runValidators: true },
    );
  },

  async remove(id) {
    const result = await Task.findByIdAndDelete(id);
    return !!result;
  },
  overdueStatsByBoard(boardId, now = new Date()) {
    return Task.aggregate([
      {
        $match: {
          boardId: new mongoose.Types.ObjectId(boardId),
          dueDate: { $lt: now },
          status: { $ne: "done" },
        },
      },
      {
        $group: {
          _id: "$assignee",
          overdueCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          assignee: "$_id",
          overdueCount: 1,
        },
      },
    ]);
  },
};
