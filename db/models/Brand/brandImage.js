const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class BrandImage extends Model { }
  BrandImage.init(
    {
      uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: { type: DataTypes.STRING, allowNull: false, field: "image" },
      w_size: { type: DataTypes.STRING, defaultValue: '50', allowNull: false, field: "w_size" },
      h_size: { type: DataTypes.STRING, defaultValue: '50', allowNull: false, field: "h_size" },
      status: { type: DataTypes.STRING, defaultValue: 'true', allowNull: false, field: "status" },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "brand_image",
    }
  )
  return BrandImage
}