// core modules

// npm modules
import { Sequelize } from "sequelize";
import cls from "cls-hooked";

// internal modules

// set namespace for sequelize transactions
const namespace = cls.createNamespace("sequelize-transaction-session");
Sequelize.useCLS(namespace);

let storage;

if (process.env.NODE_ENV === "test") {
  storage = `${process.cwd()}/tests/database/database.sqlite`;
} else {
  storage = "/config/database.sqlite";
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
});

export default sequelize;
