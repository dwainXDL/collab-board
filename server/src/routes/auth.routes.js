import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { validate } from "../middleware/validate.js";
import { loginLimiter } from "../middleware/loginLimiter.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import * as controller from "../controllers/auth.controller.js";

const router = Router();
router.post("/register", validate(registerSchema), controller.register);
router.post("/login", loginLimiter, validate(loginSchema), controller.login);
router.get("/me", authenticate, controller.me); // protected at route level
export default router;
