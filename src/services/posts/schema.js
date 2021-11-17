import mongoose from "mongoose";
const { Schema, model } = mongoose;

// ******************************* COMMENTS EMBEDDING *******************************
const commentArray = new Schema(
  {
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timeStamps: true }
);
// **************************************************************
const postSchema = new Schema(
  {
    text: { type: String, required: true },
    username: { type: String, default: "Admin"},
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      // required: true,
      default: "https://source.unsplash.com/1600x900/?portrait",
      // enum: ["https://source.unsplash.com/1600x900/?portrait"],
    },
    comments: {
      type: [commentArray],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
