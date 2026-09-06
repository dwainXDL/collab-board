import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { createBoardSchema } from "../schemas/board.schema.js";
import * as boards from "../controllers/board.controller.js";
import * as tasks from "../controllers/task.controller.js";

const router = Router();

router.get("/", boards.list);

router.post("/", validate(createBoardSchema), boards.create);

router.get("/:id/tasks", tasks.listByBoard);

export default router;
