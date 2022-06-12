// core modules

// npm modules
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db";

// internal modules

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  executionTime: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.updatedAt - this.createdAt;
    },
    set() {
      throw new Error("Not possible to set executionTime");
    },
  },
  log: {
    type: DataTypes.JSON,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

if (Task.prototype) {
  Task.prototype.addLog = async function addLog(options) {
    let message = "";
    if (typeof options === "string") message = options;
    if (options.message) message = options.message;
    this.log.push({ message });
    await this.save();
  };
  Task.prototype.getLog = function getLog() {
    return this.log.slice(-1)[0];
  };
  Task.prototype.logger = async function logger(operation, options = {}) {
    if (!this.log) this.log = [];
    let result;
    if (operation === "add") result = await this.addLog(options);
    if (operation === "get") result = this.getLog();
    return result;
  };
  Task.prototype.complete = async function complete() {
    this.active = false;
    await this.save();
  };
}

export default Task;
