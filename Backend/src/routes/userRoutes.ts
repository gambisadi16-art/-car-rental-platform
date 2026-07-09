import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.get("/me", getProfile);
router.patch("/me", updateProfile);

export default router;