import { Router, type RequestHandler } from "express";
import {
    create,
    getMyBookings,
    cancel,
    getAvailability,
} from "../controllers/bookingController";
import { createBookingValidators } from "../validators/bookingValidators";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/", createBookingValidators as RequestHandler[], create);
router.get("/my", getMyBookings);
router.patch("/:id/cancel", cancel);
router.get("/availability/:vehicleId", getAvailability);

export default router;