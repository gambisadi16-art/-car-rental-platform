import { Router, type RequestHandler } from "express";
import { register, login, getMe } from "../controllers/authController";
import { registerValidators, loginValidators } from "../validators/authValidators";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerValidators as RequestHandler[], register);
router.post("/login", loginValidators as RequestHandler[], login);
router.get("/me", protect, getMe);

export default router;