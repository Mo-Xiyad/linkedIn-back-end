import express from "express";
import handler from "./handlers.js";
import UserModel from "./schema.js";
import { userValidator } from "./validator.js";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";


// Initialize cloudinary for user upload images
const cloudinaryStorageUsers = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "users_profile_picture",
  },
});



const router = express.Router();

router.route(`/`).get(handler.getUsers).post(handler.createUsers);

router.route(`/:userId/pdf`).get(handler.getUserPdf);

router
  .route(`/`)
  .get(handler.getUsers)
  .post(userValidator, handler.createUsers);


router
  .route(`/:userId`)
  .get(handler.getUsersById)
  .put(handler.updateUsersById)

  .delete(handler.deleteUsersById)
  .post(handler.getExperience)
  .post(handler.createExperience)
  .post(handler.getEducation)
  .post(handler.createEducation);

  .delete(handler.deleteUsersById);

router
  .route(`/:userId/experience`)
  .get(handler.getExperience)
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

//ENDPOINT FOR CSV FILE
router.route(`/:userId/csv`).get(handler.getExperienceAsCsvFile);

//ENDPOINT FOR Profile Picture Upload
router.put(
  `/:userId/upload`,
  multer({ storage: cloudinaryStorageUsers }).single("image"),
  async (req, res, next) => {
    try {
      const newUserImage = await UserModel.findByIdAndUpdate(
        req.params.userId,
        { ...req.body, image: req.file.path },
        { new: true }
      );

      res.status(201).send({ newUserImage });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);


export default router;
