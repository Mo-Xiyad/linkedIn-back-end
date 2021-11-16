import express from "express";
import handler from "./handlers.js";
const router = express.Router();
router.route(`/`).get(handler.getPosts).post(handler.createPosts);

// LIKES
router.route("/:postId/likes").put(handler.likePost);

router
  .route(`/:postId`)
  .get(handler.getPostsById)
  .put(handler.updatePostsById)
  .delete(handler.deletePostsById);
export default router;
