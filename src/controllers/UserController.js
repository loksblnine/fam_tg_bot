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

const findOneByUserId = (userId) => {
  try {
    return models.initModels(sequelize).user.findOne({
      where: {
        user_id: userId
      }
    }).then((rows) => {
      return rows.length > 0;
    });
  } catch
    (e) {
    console.log("Пизда всему: ", e.toString());
  }
};

module.exports = {
  createUser,
  findOneByUserId
};
