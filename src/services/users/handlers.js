import UserModel from "./schema.js"


const getUsers = async (req, res, next) => {
  try {
    const getAllUsers = await UserModel.find();

    if(getAllUsers){
      res.send({getAllUsers})
    }else{
      res.send("No users could be found")
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//creates a new user
const createUsers = async (req, res, next) => {
  try {
    const user = req.body
    if(user){
      const createNewUser = new UserModel(req.body);

      const {_id} = await createNewUser.save();

      res.status(201).send({data: _id});

    } else {
      res.status(400).send(`user could not be created`)
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
};

//GETS A SINGLE USER
const getUsersById = async (req, res, next) => {
  try {
    const id = req.params.userId

    const foundUser = await UserModel.findById(id)

    if(foundUser){
      res.send({foundUser})
    } else {
      res.status(404).send(`user with the ID: ${id} not found`)
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//UPDATES A SINGLE USER
const updateUsersById = async (req, res, next) => {
  try {
    const id = req.params.userId
    const modifiedUser = await UserModel.findByIdAndUpdate(id, req.body, {new: true});

      if(modifyedUser) {
        res.status(201).send({data: modifiedUser});

      } else {
        res.status(404).send(`user with the ID: ${id} not found`)

      }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteUsersById = async (req, res, next) => {
  try {
    const id = req.params.userId
    const deleteUser = await UserModel.findByIdAndDelete(id);

    if(deleteUser) {
      res.status(204).send("User deleted successfully");

    } else {
      res.status(404).send(`user with the ID: ${id} not found`)

    }


  } catch (error) {
    console.log(error);
    next(error);
  }
};

//CRUD FOR EXPERIENCE AND EDUCATION
const handler = {
  getUsers,
  createUsers,
  getUsersById,
  updateUsersById,
  deleteUsersById,
};
export default handler;
