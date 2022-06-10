// core modules

// npm modules
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db";

// internal modules

const Application = sequelize.define("Application", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true,
    },
  },
  apiKey: {
    type: DataTypes.STRING,
  },
});

export default Application;
