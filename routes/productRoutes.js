import express from "express";
import { addproduct,allProducts,updateStock,updateproduct,deleteproduct,editproduct} from "../controllers/productController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all",isLoggedIn,allProducts)
router.post("/add",isLoggedIn,addproduct)
router.get("/edit/:id",isLoggedIn,editproduct)
router.post("/update/:id",isLoggedIn,updateproduct)
router.post("/delete/:id",isLoggedIn,deleteproduct)
router.post("/update-stock/:id", isLoggedIn,updateStock);

export default router;
