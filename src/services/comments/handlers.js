import PostModel from "../posts/schema.js";
import q2m from "query-to-mongo";

const getComments = async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const id = req.params.postId;
    const post = await PostModel.findById(id).populate({
      path: "comments.user",
      select: "_id name surname email bio image username",
    });
    if (post) {
      res.send(post);
    } else {
      console.log("error Inside the else block -------><");
      res.send(`Post with the ID: ${id} not found`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const createComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await PostModel.findById(postId);
    if (post) {
      const addComment = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { comments: req.body } },
        { new: true }
      );
      console.log(addComment);
      res.send({ addComment });
    } else {
      console.log("error Inside the else block -------><");
      res.send(`Post with the ID: ${postId} not found`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getCommentsById = async (req, res, next) => {
  try {
    const commentId = req.params.postId;
    const comment = await PostModel.findById(commentId);
    if (comment) {
      res.status(201).send(comment);
    } else {
      console.log("error Inside the else block -------><");
      res.send(`Comment with the ID: ${commentId} not found`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updateCommentsById = async (req, res, next) => {
  try {
    const commentId = req.params.postId;
    const comment = await PostModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (comment) {
      res.status(201).send(comment);
    } else {
      console.log("error Inside the else block -------><");
      res.send(`Comment with the ID: ${commentId} not found`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteCommentsById = async (req, res, next) => {
  try {
    const commentId = req.params.postId;
    const comment = await PostModel.findByIdAndDelete(commentId);
    if (comment) {
      res.status(201).send(comment);
    } else {
      console.log("error Inside the else block -------><");
      res.send(`Comment with the ID: ${commentId} not found`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const handler = {
  getComments,
  createComments,
  getCommentsById,
  updateCommentsById,
  deleteCommentsById,
};
export default handler;
