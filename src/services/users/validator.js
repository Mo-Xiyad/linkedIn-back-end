import { body } from "express-validator";

export const userValidator = [
  body("name").exists().withMessage("Name is required!"),
  body("name").isLength({ min: 2 }).withMessage("must more than 2 characters!"),
  body("surname").exists().withMessage("Surname is required!"),
  body("email").isEmail().withMessage("Not a Valid Email!"),
];

/* 
For more methods see the documentation
https://github.com/express-validator/express-validator/blob/master/src/chain/validators.ts 
*/
