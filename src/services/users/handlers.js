import UserModel from "./schema.js";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";

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

//creates a new user
const createUsers = async (req, res, next) => {
  try {
    const errorsList = validationResult(req);

    if (!errorsList.isEmpty()) {
      next(createHttpError(400, { errorsList }));
    } else {
      const user = req.body;

      if (user) {
        const createNewUser = new UserModel(req.body);

        const { _id } = await createNewUser.save();

        res.status(201).send({ data: _id });
      } else {
        res.status(400).send(`user could not be created`);
      }
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

//******************************* Google Authenticator *******************************
const createGoogleUser = async (user) => {
  try {
    const newUser = {
      google_id: user.sub,
      name: user.given_name,
      surname: user.family_name,
      email: user.email,
      image: user.picture,
      username: user.name,
    };

    if (user) {
      const createNewUser = new UserModel(newUser);

      const user = await createNewUser.save();

      return user;
    } else {
      return `user could not be created`;
    }
  } catch (error) {
    console.log(error);
  }
};

const checkFotAuthorizedUser = async (id) => {
  try {
    if (id) {
      const foundUser = await UserModel.findOne({
        google_id: id,
      });
      return foundUser;
    } else {
      throw new Error("Id needed parameter");
    }
  } catch (error) {
    throw new Error("cant find user");
  }
};

//******************************* END Google Authenticator *******************************

//UPDATES A SINGLE USER
const updateUsersById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const modifiedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (modifiedUser) {
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
    const id = req.params.userId;

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
    const id = req.params.userId;
    const addExperience = await UserModel.createInstance(
      "experience",
      req.params,
      req.body
    );
    if (addExperience) {
      console.log(addExperience);
      res.send(addExperience);
    } else {
      next(createHttpError(404, `User with the ID: ${id} not found!`));
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
    const findExperience = await UserModel.getInstance(
      "experience",
      req.params,
      req.body,
      experienceId
    );

    if (findExperience) {
      res.send(findExperience);
    } else {
      next(
        createHttpError(
          404,
          `Instance of Exerience or User with the ID:  ${id} not found!`
        )
      );
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
    const id = req.params.userId;

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
    const id = req.params.userId;
    const user = await UserModel.findById(id);
    const addEducation = await UserModel.createInstance(
      "education",
      req.params,
      req.body
    );
    if (addEducation) {
      console.log(addEducation);
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
    const findEducation = await UserModel.getInstance(
      "education",
      req.params,
      req.body,
      educationId
    );

    if (findEducation) {
      res.send(findEducation);
    } else {
      next(
        createHttpError(
          404,
          `Instance of Education or User with the ID:  ${id} not found!`
        )
      );
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
    const educationId = req.params.educationId;
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
  createExperience, //done DRY
  getEducation, //done
  createEducation, //done DRY
  getExperienceById, //done DRY
  updateExperienceById, //done
  deleteExperienceById, //done
  getEducationById, //Done  DRY
  updateEducationById, //DONE
  deleteEducationById,
  checkFotAuthorizedUser,
  createGoogleUser,
};
export default handler;
