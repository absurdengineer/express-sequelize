//? Load Modules
const Joi = require("joi");
const User = require("../models/User");

//? User Validator
const validateUser = (tripResource) => {
  //? Joi Schema for User
  const userSchema = Joi.object({
    name: Joi.string().label("Name").when("create", {
      is: 1,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    email: Joi.string().label("Email").email().when("create", {
      is: 1,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    password: Joi.string()
      .label("Password")
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .when("create", {
        is: 1,
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    create: Joi.number().optional(),
  });
  return userSchema.validate(tripResource);
};

//? List All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users.length)
      return res.status(204).json({ message: "No Users Found." });
    return res
      .status(200)
      .json({ data: users, message: "Users retrieved successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

//? Create New User
const createUser = async (req, res) => {
  try {
    const { error } = validateUser({ create: 1, ...req.body });
    if (error) return res.status(400).json({ message: error.message });
    const { email } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user)
      return res
        .status(400)
        .json({ message: "User with provided email already exists." });
    user = await User.create(req.body);
    return res
      .status(201)
      .json({ data: user, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getUsers: getUsers,
  createUser: createUser,
};
