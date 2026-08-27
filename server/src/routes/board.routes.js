import { Router } from "express";
import * as boards from "../controllers/board.controller.js";
import * as tasks from "../controllers/task.controller.js";

const router = Router();
router.get("/", boards.list);
router.post("/", boards.create);
router.get("/:id/tasks", tasks.listByBoard);
export default router;
