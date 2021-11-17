import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
import UsersRouter from "./services/users/index.js";
import PostsRouter from "./services/posts/index.js";

const { MONGO_CONNECTION, PORT } = process.env;

const server = express();
const port = process.env.PORT || 3001;

// ******************************** MIDDLEWARE ********************************
server.use(cors());
server.use(express.json());

// ******************************** ROUTES ********************************

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
