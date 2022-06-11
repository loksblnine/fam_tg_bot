const DataTypes = require("sequelize").DataTypes;
const _gallery = require("./Gallery");
const _user = require("./User");

function models(sequelize) {
  const gallery = _gallery(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);

  return {
    gallery,
    user
  };
}

module.exports = models;
module.exports.initModels = models;
module.exports.default = models;
