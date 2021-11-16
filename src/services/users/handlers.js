import UserModel from "./schema.js";
import fs from "fs";
import { generateUserPDF } from "../pdf/index.js";

//Get all new user
const getUsers = async (req, res, next) => {
  try {
    const getAllUsers = await UserModel.find();

    if (getAllUsers) {
      res.send({ getAllUsers });
    } else {
      res.send("No users could be found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//Get all new user PDF
const getUserPdf = async (req, res, next) => {
  try {
    // First create PDF
    // Download PDF
    // Display static information (strings for example name, surname)
    // Display dynamic information (inside of arras)
    // Display Images
    // put logic if you have img, if you have non required data (for example bio is blank)

    const user = await UserModel.findById(req.params.userId);
    console.log(user);
    if (!user) {
      res
        .status(404)
        .send({ message: `User with ID:${req.params.userId}  not found` });
    }
    const pdfStream = await generateUserPDF(user);
    res.setHeader("Content-Type", "application/pdf");
    pdfStream.pipe(res);
    pdfStream.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//creates a new user
const createUsers = async (req, res, next) => {
  try {
    const user = req.body;
    if (user) {
      const createNewUser = new UserModel(req.body);

      const { _id } = await createNewUser.save();

      res.status(201).send({ data: _id });
    } else {
      res.status(400).send(`user could not be created`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//GETS A SINGLE USER
const getUsersById = async (req, res, next) => {
  try {
    const id = req.params.userId;

    const foundUser = await UserModel.findById(id);

    if (foundUser) {
      res.send({ foundUser });
    } else {
      res.status(404).send(`user with the ID: ${id} not found`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//UPDATES A SINGLE USER
const updateUsersById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const modifiedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (modifyedUser) {
      res.status(201).send({ data: modifiedUser });
    } else {
      res.status(404).send(`user with the ID: ${id} not found`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteUsersById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const deleteUser = await UserModel.findByIdAndDelete(id);

    if (deleteUser) {
      res.status(204).send("User deleted successfully");
    } else {
      res.status(404).send(`user with the ID: ${id} not found`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//CRUD FOR EXPERIENCE AND EDUCATION

/* ---------------------------------------------------- EXPERIENCE ---------------------------------------------------- */
//Gets all experience from a single user
const getExperience = async (req, res, next) => {
  try {
    const id = req.params.postId;

    const user = await UserModel.findById(id);
    if (user) {
      res.send(user.experience);
    } else {
      next(createHttpError(404, `User with the ID:  ${id} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//CREATES A NEW EXPERIENCE
const createExperience = async (req, res, next) => {
  try {
    const id = req.params.postId;
    const user = await UserModel.findById(id);
    if (user) {
      const addExperience = findByIdAndUpdate(
        id,
        { $push: { experience: req.body } },
        { new: true }
      );
      res.send(addExperience);
    } else {
      next(createHttpError(404, `User with the ID:  ${id} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//GETS A SPECIFIC EXPERIENCE
const getExperienceById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const experienceId = req.params.experienceId;

    const user = await UserModel.findById(userId);
    if (user) {
      const foundExperience = post.experience.find(
        (exp) => exp._id.toString() === experienceId
      );
      res.send(foundExperience);
    } else {
      next(createHttpError(404, `User with the ID:  ${id} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//UPDATES AN EXPERIENCE WITH A USER ID

const updateExperienceById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const experienceId = req.params.experienceId;
    const user = await UserModel.findById(userId);

    if (user) {
      const index = user.experience.findIndex(
        (i) => i._id.toString() === experienceId
      );
      console.log(index);

      if (index !== -1) {
        console.log(user.experience[index]);
        user.experience[index] = {
          ...user.experience[index].toObject(),
          ...req.body,
        };
        await user.save();
        res.send(user);
      } else {
        next(
          createHttpError(404, `Experience with id: ${experienceId} not found!`)
        );
      }
    } else {
      next(createHttpError(404, `User with id:  ${userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
};

//DELETES A SPECIFIC EXPERIENCE WITH A USER ID

const deleteExperienceById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const experienceId = req.params.experienceId;

    const updatedExperience = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { experience: { _id: experienceId } } },
      { new: true }
    );
    if (updatedExperience) {
      res.send(updatedExperience);
    } else {
      next(
        createHttpError(404, `Experience with id ${experienceId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------------------- EDUCATION ---------------------------------------------------- */

//Gets all education
const getEducation = async (req, res, next) => {
  try {
    const id = req.params.postId;

    const user = await UserModel.findById(id);
    if (user) {
      res.send(user.education);
    } else {
      next(createHttpError(404, `User with the ID:  ${id} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Creates a new instance of Education
const createEducation = async (req, res, next) => {
  try {
    const id = req.params.postId;
    const user = await UserModel.findById(id);
    if (user) {
      const addEducation = findByIdAndUpdate(
        id,
        { $push: { education: req.body } },
        { new: true }
      );
      res.send(addEducation);
    } else {
      next(createHttpError(404, `User with the ID: ${id} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//GETS A SPECIFIC INSTANCE OF EDUCATION
const getEducationById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const educationId = req.params.educationId;

    const user = await UserModel.findById(userId);
    if (user) {
      const foundEducation = post.education.find(
        (exp) => exp._id.toString() === educationId
      );
      res.send(foundEducation);
    } else {
      next(createHttpError(404, `User with the ID:  ${id} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//UPDATES AN INSTANCE OF EDUCATION BY ID

const updateEducationById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const educationId = req.params.ecucationId;
    const user = await UserModel.findById(userId);

    if (user) {
      const index = user.education.findIndex(
        (i) => i._id.toString() === educationId
      );
      console.log(index);

      if (index !== -1) {
        console.log(user.education[index]);
        user.education[index] = {
          ...user.education[index].toObject(),
          ...req.body,
        };
        await user.save();
        res.send(user);
      } else {
        next(
          createHttpError(404, `Education with id: ${educationId} not found!`)
        );
      }
    } else {
      next(createHttpError(404, `User with id:  ${userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
};

//DELETES AN INSTANCE OF EDUCATION BY Id

const deleteEducationById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const educationId = req.params.educationId;

    const updatedEducation = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { education: { _id: educationId } } },
      { new: true }
    );
    if (updatedEducation) {
      res.send(updatedEducation);
    } else {
      next(createHttpError(404, `Education with id ${educationId} not found!`));
    }
  } catch (error) {
    next(error);
  }
};

const handler = {
  getUsers,
  createUsers,
  getUsersById,
  updateUsersById,
  deleteUsersById,
  getExperience, //done
  createExperience, //done
  getEducation, //done
  createEducation, //done
  getExperienceById, //done
  updateExperienceById, //done
  deleteExperienceById, //done
  getEducationById, //Done
  updateEducationById, //DONE
  deleteEducationById,
  getUserPdf, //in progress
};
export default handler;
