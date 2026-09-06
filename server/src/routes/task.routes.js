import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { validateObjectId } from "../middleware/validateObjectId.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import * as tasks from "../controllers/task.controller.js";

const router = Router();

router.post("/", validate(createTaskSchema), tasks.create);
router.patch(
  "/:id",
  validateObjectId,
  validate(updateTaskSchema),
  tasks.update,
);
router.delete("/:id", validateObjectId, tasks.remove);

export default router;
