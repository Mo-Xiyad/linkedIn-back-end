import { body } from "express-validator";

export const commentsValidator = [
  body("comment").exists().withMessage("text is a mandatory field!"),
  body("comment").isLength({ min: 2 }).withMessage("Comment is too sort "),
  body("comment").isLength({ max: 300 }).withMessage("Comment is too long "),
  body("user").exists().withMessage("User Id is required "),
  // body("post").exists().withMessage("Post Id is required "),
];

/* 
For more methods see the documentation
https://github.com/express-validator/express-validator/blob/master/src/chain/validators.ts 
*/
