import { body } from "express-validator";

export const postCheck = [
  body("text").exists().withMessage("text is a mandatory field!"),
  body("text").isLength({ min: 20 }).withMessage("Post is too sort "),
  body("user").exists().withMessage("User Id is required "),
];

/* 
For more methods see the documentation
https://github.com/express-validator/express-validator/blob/master/src/chain/validators.ts 
*/
