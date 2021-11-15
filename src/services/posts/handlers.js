import PostModel from "./schema.js";
import UserModel from "../users/schema.js";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";

const getPosts = async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const totalPosts = await PostModel.countDocuments(mongoQuery.criteria);
    const post = await PostModel.find(mongoQuery.criteria)
      .limit(mongoQuery.options.limit)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort)
      .populate({ path: "user comments" });

    if (post) {
      res.send({
        links: mongoQuery.links("/posts", totalPosts),
        pageTotal: Math.ceil(totalPosts / mongoQuery.options.limit),
        totalPosts,
        post: post,
      });
    } else {
      next(createHttpError(404, `Post not found!`));
    }
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
