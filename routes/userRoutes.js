import express from "express";
import { register, login,logout,profile} from "../controllers/authController.js";
import { cleanupProducts, isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/logout", isLoggedIn,logout);
router.get("/profile", isLoggedIn, async (req, res, next) => {
  cleanupProducts().catch(err => console.error(err)); // run in background
  next();
}, profile);

// router.post("/logout", logout);


export default router;
