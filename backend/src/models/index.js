'use strict';

import Sequelize from 'sequelize';
import sequelizeConfig from '../config/sequelize-config.cjs';

const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

import managerModel from './Manager.js';

db.Manager = managerModel(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db; 