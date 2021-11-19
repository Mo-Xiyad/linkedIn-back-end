import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import passport from "passport";
import p from "./passport/index.js";
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";

import UsersRouter from "./services/users/index.js";
import PostsRouter from "./services/posts/index.js";
import cookieParser from "cookie-parser";
const { MONGO_CONNECTION, PORT } = process.env;

const server = express();
const port = process.env.PORT || 3001;

const whitelist = ["https://linkedin-clone-aug.herokuapp.com/"];

const corsOptions = {
  origin: function (origin, next) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error("CROSS ORIGIN ERROR"));
    }
  },
  credentials: true,
};

// ******************************** MIDDLEWARE ********************************
server.use(
  cors({
    origin: "https://linkedin-clone-aug.herokuapp.com",
    credentials: true,
  })
);
server.use(cookieParser());
server.use(passport.initialize());
server.use(express.json());

// ******************************** ROUTES ********************************
server.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
server.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "hhttps://linkedin-clone-aug.herokuapp.com",
  }),

  function (req, res) {
    console.log(req.user);
    res.cookie("user_id", req.user._id.toString(), {
      path: "/",
      secure: true,
      sameSite: "none",
    });
    res.redirect("https://linkedin-clone-aug.herokuapp.com/home");
  }
);

server.use("/users", UsersRouter);
server.use("/posts", PostsRouter);
// ******************************** ERROR HANDLERS ********************************

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

// ******************************** DB CONNECTION ********************************

mongoose.connect(MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("📊 Mongo Connected❗️");
  server.listen(PORT, () => {
    console.table(listEndpoints(server));
    console.log(`Server running in port ${port} 📍`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("ERROR WITH DB--------->❗️", err);
});
