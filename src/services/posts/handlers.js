import PostModel from "./schema.js";
import UserModel from "../users/schema.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import q2m from "query-to-mongo";

const getPosts = async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const totalPosts = await PostModel.countDocuments(mongoQuery.criteria);
    const post = await PostModel.find(mongoQuery.criteria, {
      __v: 0,
    })
      .limit(mongoQuery.options.limit)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort)
      .populate({
        path: "user",
        select: "_id name surname email bio image username",
      });

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
    const id = req.params.postId;
    const post = await PostModel.findById(id, {}).populate({
      path: "user",
      select: "_id name surname email bio image username",
    });
    res.send(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updatePostsById = async (req, res, next) => {
  try {
    const id = req.params.postId;
    if (id) {
      const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (updatedPost) {
        res.send(updatedPost);
      } else {
        next(createHttpError(304, `Post with id ${id} could not be modified`));
      }
    } else {
      next(createHttpError(404, `Post with id ${id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deletePostsById = async (req, res, next) => {
  try {
    const id = req.params.postId;
    const deletePost = await PostModel.findByIdAndDelete(id);
    if (deletePost) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Post with id ${id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const id = req.params.postId;
    const post = await PostModel.findById(id);
    if (post) {
      const liked = await PostModel.findOne({
        _id: id,
        likes: new mongoose.Types.ObjectId(req.body.userId),
      });
      if (!liked) {
        await PostModel.findByIdAndUpdate(
          id,
          { $push: { likes: req.body.userId } },
          { new: true }
        );
      } else {
        await PostModel.findByIdAndUpdate(
          id,
          { $pull: { likes: req.body.userId } },
          { new: true }
        );
      }
    } else {
      next(createHttpError(404, `Post with id ${id} not found!`));
    }

    const newPost = await PostModel.findById(id);

    res.send(newPost);
  } catch (error) {}
};

const handler = {
  likePost,
  getPosts,
  createPosts,
  getPostsById,
  updatePostsById,
  deletePostsById,
};
export default handler;
