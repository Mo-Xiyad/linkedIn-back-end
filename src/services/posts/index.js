import express from "express";
import handler from "./handlers.js";
import { postCheck } from "./validator.js";
import { commentsValidator } from "../comments/validator.js";
import comHandlers from "../comments/handlers.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import PostModel from "./schema.js";

// Initialize cloudinary for post upload images
const cloudinaryStoragePosts = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts_pictures",
  },
});

const router = express.Router();

// router.post("/", postCheck, handler.createPosts);
router.route(`/`).get(handler.getPosts).post(postCheck, handler.createPosts);

// LIKES
router.route("/:postId/likes/:userId").put(handler.likePost);

router
  .route(`/:postId`)
  .get(handler.getPostsById)
  .put(handler.updatePostsById)
  .delete(handler.deletePostsById)
  .post(
    multer({ storage: cloudinaryStoragePosts }).single("image"),
    async (req, res, next) => {
      try {
        const newPostImage = await PostModel.findByIdAndUpdate(
          req.params.postId,
          { ...req.body, image: req.file.path },
          { new: true }
        );

        res.status(201).send({ newPostImage });
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );

// ******************************* COMMENT ROUTES *******************************
router
  .route(`/:postId/comment`)
  .get(comHandlers.getComments)
  .post(commentsValidator, comHandlers.createComments);

router
  .route(`/:postId/comment/:commentId`)
  .get(comHandlers.getCommentsById)
  .put(comHandlers.updateCommentsById)
  .delete(comHandlers.deleteCommentsById);

export default router;
