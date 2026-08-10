import { body, type ValidationChain } from "express-validator";

export const createBookingValidators: ValidationChain[] = [
    body("vehicleId")
        .notEmpty()
        .withMessage("Vehicle ID is required")
        .isMongoId()
        .withMessage("Invalid vehicle ID"),
    body("pickupLocation")
        .trim()
        .notEmpty()
        .withMessage("Pickup location is required"),
    body("returnLocation")
        .trim()
        .notEmpty()
        .withMessage("Return location is required"),
    body("pickupDate")
        .notEmpty()
        .withMessage("Pickup date is required")
        .isISO8601()
        .withMessage("Invalid pickup date format"),
    body("returnDate")
        .notEmpty()
        .withMessage("Return date is required")
        .isISO8601()
        .withMessage("Invalid return date format"),
];