import { body } from "express-validator";

export const postCheck = [
  body("text").exists().withMessage("text is a mandatory field!"),
  body("text").isLength({ min: 20 }).withMessage("Post is too sort "),
  body("user").exists().withMessage("User Id is required "),
];
