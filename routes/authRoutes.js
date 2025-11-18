import express from "express";
import { register, login,logout} from "../controllers/authController.js";
import {registerValidator,loginValidator} from "../middleware/validator.js"
// import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login)
// router.get("/logout", isLoggedIn,logout);
// router.get("/profile",isLoggedIn,profile);
router.post("/logout", logout);


export default router;
