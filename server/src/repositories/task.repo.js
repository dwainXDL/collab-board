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
    return Task.findByIdAndUpdate(id, patch, { new: true, runValidators: true });
  },

  async remove(id) {
    const result = await Task.findByIdAndDelete(id);
    return !!result;
  },
};
