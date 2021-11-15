import express from "express";
import handler from "./handlers.js";
const router = express.Router();
router.route(`/`).get(handler.getUsers).post(handler.createUsers);
router
  .route(`:userId`)
  .get(handler.getUsersById)
  .put(handler.updateUsersById)
  .delete(handler.deleteUsersById);
export default router;
