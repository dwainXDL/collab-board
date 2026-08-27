import { Router } from "express";
import * as tasks from "../controllers/task.controller.js";

const router = Router();
router.post("/", tasks.create);
router.patch("/:id", tasks.update);
router.delete("/:id", tasks.remove);
export default router;
