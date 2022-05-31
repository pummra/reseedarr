// core modules

// npm modules
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db";

// internal modules

const App = sequelize.define("App", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM("radarr", "sonarr", "prowlarr", "flood"),
  },
  address: {
    type: DataTypes.STRING,
  },
  apiKey: {
    type: DataTypes.STRING,
  },
});

export default App;
