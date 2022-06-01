// core modules

// npm modules
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db";

// internal modules

const Radarr = sequelize.define("Radarr", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
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

export default Radarr;
