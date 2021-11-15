import CommentsModel from "../comments/schema.js";

const getComments = async (req, res, next) => {
  try {
    const comments = await CommentsModel.find().populate({
      path: "createdBy",
      path: "post",
    });
    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const createComments = async (req, res, next) => {
  try {
    const newComment = new CommentsModel(req.body);
    const { _id } = await newComment.save();
    res.status(201).send({ _id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getCommentsById = async (req, res, next) => {
  try {
    const id = req.params.commentID;
    const comment = await CommentsModel.findById(id);
    if (comment) {
      res.status(201).send(comment);
    } else {
      next(`Comment with id: ${id} does not exist`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updateCommentsById = async (req, res, next) => {
  try {
    const id = req.params.commentID;
    const updatedComment = await CommentsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedComment) {
      res.status(201).send(updatedComment);
    } else {
      next(`Comment with id: ${id} does not exist`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteCommentsById = async (req, res, next) => {
  try {
    const id = req.params.commentID;
    const deleteComments = await CommentsModel.findByIdfindByIdAndDelete(id);
    res.status(201).send(deleteComments);
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
