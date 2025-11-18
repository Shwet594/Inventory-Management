import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("username").notEmpty().isLength({ min: 6 }).withMessage("Username is required 6+ chars "),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),

  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      req.errors = result.array();
      return next();
    }
    req.errors = null;
    next();
  }
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password missing"),

  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      req.errors = result.array();
      return next();
    }
    req.errors = null;
    next();
  }
];
