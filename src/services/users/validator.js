import { checkSchema, body, validationResult } from "express-validator";

export const userValidator = [
  body("name").exists().withMessage("Name is required!"),
  body("surname").exists().withMessage("Surname is required!"),
  body("email").isEmail().withMessage("Not a Valid Email!"),
];
