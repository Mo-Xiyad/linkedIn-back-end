import express from "express";
import handler from "./handlers.js";
import UserModel from "./schema.js";
const router = express.Router();
router.route(`/`).get(handler.getUsers).post(handler.createUsers);

router.route(`/:userId/pdf`).get(handler.getUserPdf);

router
  .route(`/:userId`)
  .get(handler.getUsersById)
  .put(handler.updateUsersById)
  .delete(handler.deleteUsersById)
  .post(handler.getExperience)
  .post(handler.createExperience)
  .post(handler.getEducation)
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
