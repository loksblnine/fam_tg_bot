const models = require("../configs/db/models");
const sequelize = require("../configs/db/config");

const getPhotoById = async (id) => {
  try {
    return models.initModels(sequelize).gallery.findOne({
      where: {
        id
      },
      raw: true
    });
  } catch
    (e) {
    console.log("Пизда всему: ", e.toString());
  }
};

module.exports = {
  getPhotoById
};
