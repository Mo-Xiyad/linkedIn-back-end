import express from "express";
import handler from "./handlers.js";
import comHandlers from "../comments/handlers.js";

const router = express.Router();

router.route(`/`).get(handler.getPosts).post(handler.createPosts);

// LIKES
router.route("/:postId/likes").put(handler.likePost);

router
  .route(`/:postId`)
  .get(handler.getPostsById)
  .put(handler.updatePostsById)
  .delete(handler.deletePostsById);

// ******************************* COMMENT ROUTES *******************************
router
  .route(`/:postId/comment`)
  .get(comHandlers.getComments)
  .post(comHandlers.createComments);

router
  .route(`/:postId/comment/:commentId`)
  .get(comHandlers.getCommentsById)
  .put(comHandlers.updateCommentsById)
  .delete(comHandlers.deleteCommentsById);

export default router;
