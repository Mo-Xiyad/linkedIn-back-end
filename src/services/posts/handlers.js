import PostModel from "./schema.js";
import UserModel from "../users/schema.js";
// import mon

const getPosts = async (req, res, next) => {
  try {
    // const mongoQuery =
    const post = await PostModel.find().populate({ path: "user" });
    res.send(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const createPosts = async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body);

    const { _id } = await newPost.save();
    const findUser = await UserModel.findByIdAndUpdate(
      req.body.user,
      { $push: { posts: _id } },
      { new: true }
    );
    res.send({ _id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getPostsById = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updatePostsById = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deletePostsById = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const handler = {
  getPosts,
  createPosts,
  getPostsById,
  updatePostsById,
  deletePostsById,
};
export default handler;
