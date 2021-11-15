/*  {CommentsSchema}  
        "_id": "5d84937322b7b54d848eb41b", //server generated
        //user who posted it (as reference? nested? Your choice!)
        "comment": "I totally agree with you! Great post!",
        //post (as reference? nested? your choice)
        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    } */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentsSchema = new Schema(
  {
    comment: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timeStamps: true }
);

export default model("Comments", CommentsSchema);
