import express from "express";
import checkId from "../../middlewares/checkId.js";
import handler from "./handlers.js";
import UserModel from "./schema.js";
import { userValidator } from "./validator.js";
const router = express.Router();
router
  .route(`/`)
  .get(handler.getUsers)
  .post(userValidator, handler.createUsers);

router
  .route(`/:userId`)
  .get(handler.getUsersById)
  .put(handler.updateUsersById)
  .delete(handler.deleteUsersById);

// this endpoint is checking if the google user exists
router.route(`/:googleId/authorization`).get(handler.checkFotAuthorizedUser);

router
  .route(`/:userId/experience`)
  .get(checkId, handler.getExperience)
  .post(handler.createExperience);

router
  .route(`/:userId/education`)
  .get(handler.getEducation)
  .post(handler.createEducation);

//EXPERIENCE endpoints
router
  .route(`/:userId/experience/:experienceId`)
  .get(handler.getExperienceById)
  .put(handler.updateExperienceById)
  .delete(handler.deleteExperienceById);
//EDUCATION ENDPOINTS
router
  .route(`/:userId/education/:educationId`)
  .get(handler.getEducationById)
  .put(handler.updateEducationById)
  .delete(handler.deleteEducationById);

export default router;
