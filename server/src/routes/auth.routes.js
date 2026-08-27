import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import * as controller from "../controllers/auth.controller.js";

const router = Router();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", authenticate, controller.me); // protected at route level
export default router;
