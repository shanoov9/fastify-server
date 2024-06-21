const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    logging: false,
    freezeTableName: true,
    operatorsAliases: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    },
    timezone: '+05:30',  // for writing to database
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.userModel = require("./user.model")(sequelize, Sequelize);
db.roleModel = require("./role.model")(sequelize, Sequelize);

module.exports = db;