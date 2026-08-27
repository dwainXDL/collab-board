import { Router } from "express";
import * as controller from "../controllers/board.controller.js";

const router = Router();

router.post("/", controller.createBoard);
router.get("/", controller.getBoards);

export default router;