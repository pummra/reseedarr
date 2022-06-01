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
  storage = "./tests/database/database.sqlite";
} else {
  storage = "/config/database.sqlite";
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
});

(async () => {
  if (process.env.NODE_ENV !== "production") {
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
      force: process.env.NODE_ENV === "test",
    });
  }
})();

export default sequelize;
