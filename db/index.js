const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '.env' })

//อันนี้เป็นส่วนที่ใช้ในการบอก Sequelize ว่าเราจะ connect ไปที่ไหน
console.log(process.env.DB_NAME);
const sequelize = new Sequelize(
  process.env.DB_NAME, // นี่เป็นชื่อ DB ของเรา
  process.env.DB_USER, // user ที่ใช้สรการเข้าไปยัง db
  process.env.DB_PASSWORD, // password 
  {
    host: process.env.DB_HOST, // host ของ db ที่เราสร้างเอาไว้
    dialect: process.env.DB_DIAL, // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
    port: process.env.DB_PORT,
    define: {
      timestamps: false //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
    },
    logging: false,
    timezone: "+07:00",
  });

const db = {};

//ส่วนนี้เป็นการ import model ของ table ใน database เข้ามาเพื่อตั้งต่า relation
// Admin
db.User = require("./models/Admin/user")(sequelize, Sequelize);

// Brand
db.BrandImage = require("./models/Brand/brandImage")(sequelize, Sequelize);
db.BrandTitle = require("./models/Brand/brandTitle")(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//ส่วนนี้เป็นการตั้งต่า relation นะครับ โดยเป็นการบอกว่าใน 1 team มีได้หลาย player ง่ายๆ ก็คือ relation แบบ 1:M 
// db.Team.hasMany(
//   db.Player,
//   {
//       foreignKey: { name: 'tid', field: 'tid' }, //name ตรงสำคัญพยายามตั่งให้เป็นชื่อเดียวกับ FK ใน table ที่นำไปใช้
//   }
// );

//ส่วนนี้เป็นการตั้ง relation แบบกลับกันกับด้านบน จริงแล้วเราไม่ตั้งก็ได้ แต่แนะนำให้ตั้งเอาไว้ เพราะเวลาที่เราไม่ได้ใส่ 
//line นี้จะทำให้เราสามารถใช้  team ในการหา player ได้อย่างเดียวและไม่สามารถใช้ player หา team ได้
// db.User.belongsTo(db.Team, { foreignKey: 'tid' });

module.exports = db;