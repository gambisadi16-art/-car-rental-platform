import { Router } from "express";
import {
    listVehicles,
    getVehicle,
    getRelated,
} from "../controllers/vehicleController";

const router = Router();

router.get("/", listVehicles);
router.get("/:id", getVehicle);
router.get("/:id/related", getRelated);

export default router;