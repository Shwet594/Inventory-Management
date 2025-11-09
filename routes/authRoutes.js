import express from "express";
import { register, login,logout} from "../controllers/authController.js";
// import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
// router.get("/logout", isLoggedIn,logout);
// router.get("/profile",isLoggedIn,profile);
router.post("/logout", logout);


export default router;
