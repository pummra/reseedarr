// core modules

// npm modules
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db";

// internal modules

const File = sequelize.define("File", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  radarrMovieId: {
    type: DataTypes.STRING,
  },
  hasFile: {
    type: DataTypes.BOOLEAN,
  },
  path: {
    type: DataTypes.STRING,
  },
  sizeOnDisk: {
    type: DataTypes.BIGINT,
  },
  date: {
    type: DataTypes.DATE,
  },
  downloadId: {
    type: DataTypes.STRING,
  },
  droppedPath: {
    type: DataTypes.STRING,
  },
  importedPath: {
    type: DataTypes.STRING,
  },
  downloadUrl: {
    type: DataTypes.STRING,
  },
  protocol: {
    type: DataTypes.STRING,
  },
});

export default File;
