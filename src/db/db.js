// core modules

// npm modules
import { Sequelize } from "sequelize";
import cls from "cls-hooked";

// internal modules

// set namespace for sequelize transactions
const namespace = cls.createNamespace("sequelize-transaction-session");
Sequelize.useCLS(namespace);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "/config/database.sqlite",
  logging: false,
});

(async () => {
  await sequelize.sync({
    alter: true,
  });
})();

export default sequelize;
