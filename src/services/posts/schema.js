import mongoose from "mongoose";
const { Schema, model } = mongoose;

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
    comments: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    likes: [],
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
