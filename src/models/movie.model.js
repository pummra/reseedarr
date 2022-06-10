// core modules

// npm modules
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db";

// internal modules

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
  },
  tmdbId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  poster: {
    type: DataTypes.STRING,
  },
});

export default Movie;
