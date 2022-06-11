module.exports = function (sequelize, DataTypes) {
  return sequelize.define('gallery', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        default: "nextval('gallery_id_seq'::regclass)"
      },
      url: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      tableName: 'gallery',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "gallery_id_uindex",
          unique: true,
          fields: [
            {name: "id"},
          ]
        },
        {
          name: "gallery_pk",
          unique: true,
          fields: [
            {name: "id"},
          ]
        },
      ]
    }
  );
};
