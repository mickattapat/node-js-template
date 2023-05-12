const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model { }
  User.init(
    {
      // ด้านล่างเป็นการตั้งค่า attribute ของ table นะครับ
      // ชื่อตัวแปรที่เราใช้เรียกแทน: { type: Sequelize.STRING(50), allowNull: false, field: 'ชื่อของ attribute' }
      // สามารถใส่ option เพิ่มเติมได้นะครับเช่น primaryKey: true อะไรแบบนี้
      // แล้วก็อันนี้สำคัญ ** ไม่จำเป็นต้องสร้าง attribute ที่เป็น FK จาก table อื่นนะครับ เพราะเราจะไปกำหนด relation กันใน file index
      uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: { type: DataTypes.STRING, allowNull: false, field: "username" },
      password: { type: DataTypes.INTEGER, allowNull: false, field: "password" },
      role: { type: DataTypes.STRING, allowNull: false, field: "role" },
      status: { type: DataTypes.STRING, allowNull: false, field: "status" }
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: 'user'
    }
  )
  return User
}
