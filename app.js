import express, { urlencoded } from "express";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
ConnectDB();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views"); // optional if you keep views folder in root

app.get("/",(req,res)=>{
    res.render("index");
});
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/products",productRoutes);
const PORT =process.env.PORT
app.listen(PORT,()=>{
    console.log(`Your server is running on http://localhost:${PORT}/`)
});