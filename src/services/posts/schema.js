import mongoose from "mongoose";
const { Schema, model } = mongoose;

// ******************************* COMMENTS EMBEDDING *******************************
const comment = new Schema(
  {
    comment: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timeStamps: true }
);
// **************************************************************
const postSchema = new Schema(
  {
    text: { type: String },
    username: { type: String, default: "admin" },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
      default: "https://source.unsplash.com/1600x900/?portrait",
      // enum: ["https://source.unsplash.com/1600x900/?portrait"],
    },
    comments: {
      type: [comment],
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
