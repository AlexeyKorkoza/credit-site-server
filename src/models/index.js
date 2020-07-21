const config = require('config');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);

const isValidFile = file => file.indexOf('.') !== 0 && (file !== basename) && file.slice(-3) === '.js';

const db = {};
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: true,
});

fs
    .readdirSync(__dirname)
    .forEach(file => {
        if (isValidFile(file)) {
            const model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        }
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
