const models = require("../configs/db/models");
const sequelize = require("../configs/db/config");

const getPhotoById = (id) => {
  try {
    return models.initModels(sequelize).gallery.findOne({
      where: {
        id
      },
      raw: true
    });
  } catch
    (e) {
    console.log("Пизда всему: [GalleryController]: getPhotoById", e.toString());
  }
};

module.exports = {
  getPhotoById
};
