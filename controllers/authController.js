import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/userModel.js";
export const register=async(req,res)=>{
    let {username,password,email}=req.body;
    let hash = await bcrypt.hash(password,10);
    let user = await  userModel.create({
        username,
        password:hash,
        email
    });
    res.send(user);
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No registered user" });
    }

    // 2. Compare password
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    // 4. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // 5. Redirect to profile
    return res.redirect("/users/profile");

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const profile = async (req, res) => {
  try {
    if (!req.cookies.token) return res.redirect("/auth/login");

    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    // Fetch user with populated products
    const userprod = await userModel
      .findById(decoded.id)
      .populate("products")
      .lean();

    req.user = await userModel.findById(decoded.id);

    res.render("profile", { user: userprod });
  } catch (error) {
    console.error("Profile error:", error.message);
    res.redirect("/");
  }
};


export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");W
};
