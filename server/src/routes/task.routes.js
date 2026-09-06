import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import * as tasks from "../controllers/task.controller.js";

const router = Router();
router.post("/", validate(createTaskSchema), tasks.create);
router.patch("/:id", validate(updateTaskSchema), tasks.update);
router.delete("/:id", tasks.remove);
export default router;
