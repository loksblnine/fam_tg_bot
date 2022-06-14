const models = require("../configs/db/models");
const sequelize = require("../configs/db/config");

const createUser = (name) => {
  try {
    return models.initModels(sequelize).user.create({
      name,

    });
  } catch
    (e) {
    console.log("Пизда всему: ", e.toString());
  }
};

module.exports = {
  createUser
};
