import createHttpError from "http-errors";
import UserModel from "../services/users/schema.js";

export default async (req, res, next) => {
  if (req.cookies && req.cookies["userId"]) {
    const id = req.cookies["userId"];
    const user = await UserModel.findById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      next(createHttpError(401, "Unauthorized"));
    }
  } else {
    res.status(401).send("unauthorized");
  }
};
