import jwt from "jsonwebtoken";
import { userModel, productmodel } from "../models/userModel.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    // check if token exists
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send("Not logged in");
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // find user
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).send("User not found");
    }

    // attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.redirect("/")
  }
};

export const cleanupProducts = async () => {
  try {
    const users = await userModel.find();

    for (let user of users) {
      const validProductIds = [];

      // Check each product ID
      for (let productId of user.products) {
        const exists = await productmodel.exists({ _id: productId });
        if (exists) validProductIds.push(productId);
      }

      // Update only if the array has changed
      if (validProductIds.length !== user.products.length) {
        user.products = validProductIds;
        await user.save();
      }
    }
  } catch (err) {
    console.error("Error during product cleanup:", err);
  }
};
