const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class BrandTitle extends Model { }
  BrandTitle.init(
    {
      uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title_text: { type: DataTypes.STRING, allowNull: false, field: "title_text" },
      title_text_color: { type: DataTypes.STRING, allowNull: false, field: "title_text_color" },
      title_text_hover_color: { type: DataTypes.STRING, allowNull: false, field: "title_text_hover_color" },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "brand_title",
    }
  )
  return BrandTitle
}