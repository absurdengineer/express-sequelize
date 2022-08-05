const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const database = require("../config/database.config");

const User = database.define(
  "users",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.isNewRecord) {
          const salt = await bcrypt.genSalt(11);
          const hash = await bcrypt.hash(user.getDataValue("password"), salt);
          user.setDataValue("password", hash);
        }
      },
    },
  }
);

User.prototype.toJSON = function () {
  const user = this;
  delete user.dataValues.password;
  return user.dataValues;
};

User.findByCredentials = async function ({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  return user;
};

database
  .sync()
  .then(() => {
    console.log("users table created.");
  })
  .catch((err) => {
    console.error("Unable to create users table: ", err);
  });

module.exports = User;
