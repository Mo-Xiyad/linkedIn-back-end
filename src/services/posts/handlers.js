import PostModel from "./schema.js";

const getPosts = async (req, res, next) => {
  try {
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
    const post = await newPost.save();
    res.send(post);
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
