module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      directChatId: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      tableName: 'user',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "user_id_uindex",
          unique: true,
          fields: [
            {name: "id"},
          ]
        },
        {
          name: "user_name_uindex",
          unique: true,
          fields: [
            {name: "name"},
          ]
        },
        {
          name: "user_directchatid_uindex",
          unique: true,
          fields: [
            {name: "directChatId"},
          ]
        },
        {
          name: "user_pk",
          unique: true,
          fields: [
            {name: "id"},
          ]
        },
      ]
    }
  );
};
