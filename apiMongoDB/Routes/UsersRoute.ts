import { userLogin, userRegistration } from "../Controllers/UsersControllers";
import express from "express";
import { body } from "express-validator";

const router = express.Router();

// 📌 Middleware kiểm tra dữ liệu đầu vào
const validateRegistration = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("mobileNo").notEmpty().withMessage("Mobile number is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

const validateLogin = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
];

// 📌 Routes
router.post("/registerUser", validateRegistration, userRegistration);
router.post("/loginUser", validateLogin, userLogin);

export { router as UserRoute };
