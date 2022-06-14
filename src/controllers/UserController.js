const models = require("../configs/db/models");
const sequelize = require("../configs/db/config");

const createUser = (name, id) => {
  try {
    return models.initModels(sequelize).user.create({
      name,
      directChatId: id
    });
  } catch
    (e) {
    console.log("Пизда всему: [UserController]: createUser", e.toString());
  }
};

const findOneByUserId = (userId) => {
  try {
    return models.initModels(sequelize).user.findOne({
      where: {
        directChatId: userId
      },
      raw: true,
    }).then((rows) => {
      console.log(rows);
      return rows?.length > 0;
    });
  } catch
    (e) {
    console.log("Пизда всему: [UserController]: findOneByUserId", e.toString());
  }
};

module.exports = {
  createUser,
  findOneByUserId
};
