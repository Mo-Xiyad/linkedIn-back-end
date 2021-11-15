import express from "express";
import handler from "./handlers.js";
const router = express.Router();
router.route(`/`).get(handler.getComments).post(handler.createComments);
router
  .route(`:commentID`)
  .get(handler.getCommentsById)
  .put(handler.updateCommentsById)
  .delete(handler.deleteCommentsById);
export default router;
