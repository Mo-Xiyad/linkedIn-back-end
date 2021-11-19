import express from "express";
import handler from "./handlers.js";
import UserModel from "./schema.js";
import { userValidator } from "./validator.js";
import mongoose from "mongoose";
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

// Initialize cloudinary for user background upload images
const cloudinaryStorageUsersBackground = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "users_background_picture",
  },
});

// Initialize cloudinary for Experience upload images
const cloudinaryStorageExperience = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "experience_picture",
  },
});

// Initialize cloudinary for Education upload images
const cloudinaryStorageEducation = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "education_picture",
  },
});

const router = express.Router();

router.route(`/`).get(handler.getUsers).post(handler.createUsers);
//ENDPOINT FOR PDF FILE
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


  //gets all the posts from a single user 

router.route(`/:userId/posts`).get(handler.getUsersPosts);

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

//ENDPOINT FOR Background Picture Upload
router.put(
  `/:userId/backgroundUpload`,
  multer({ storage: cloudinaryStorageUsersBackground }).single("image"),
  async (req, res, next) => {
    try {
      const newUserBackgroundImage = await UserModel.findByIdAndUpdate(
        req.params.userId,
        { ...req.body, backgroundImage: req.file.path },
        { new: true }
      );

      res.status(201).send({ newUserBackgroundImage });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

//ENDPOINT FOR Experience Picture Upload
router.put(
  `/:userId/experience/:experienceId/imageUpload`,
  multer({ storage: cloudinaryStorageExperience }).single("image"),
  async (req, res, next) => {
    try {
      await UserModel.updateOne(
        {
          _id: req.params.userId,
          "experience._id": mongoose.Types.ObjectId(req.params.experienceId),
        },
        { "experience.$.image": req.file.path },
        { new: true }
      );
      const user = await UserModel.findById(req.params.userId);
      res.status(201).send({ user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

//ENDPOINT FOR Education Picture Upload
router.put(
  `/:userId/education/:educationId/imageUpload`,
  multer({ storage: cloudinaryStorageEducation }).single("image"),
  async (req, res, next) => {
    try {
      await UserModel.updateOne(
        {
          _id: req.params.userId,
          "education._id": mongoose.Types.ObjectId(req.params.educationId),
        },
        { "education.$.image": req.file.path },
        { new: true }
      );
      const user = await UserModel.findById(req.params.userId);
      res.status(201).send({ user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default router;
