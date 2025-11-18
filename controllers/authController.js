import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/userModel.js";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Get validation errors from express-validator
    const { errors } = req;

    if (errors) {
      return res.render("index", {
        registerErrors: errors,
        oldRegister: { username, email }
      });
    }

    let hash = await bcrypt.hash(password, 10);
    await userModel.create({ username, password: hash, email });

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { errors } = req;
    // Show validation errors
    if (errors) {
      return res.render("login", {
        loginErrors: errors,
        oldLogin: { email }
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.render("login", {
        loginErrors: [{ msg: "No registered user" }],
        registerErrors: null,
        oldLogin: { email }
      });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.render("login", {
        loginErrors: [{ msg: "Invalid password" }],
        registerErrors: null,
        oldLogin: { email }
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/users/profile");

  } catch (err) {
    console.error(err);
    res.redirect("/");
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
