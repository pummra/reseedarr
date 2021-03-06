// core modules

// npm modules

// internal modules
import sequelize from "./db";
import app from "./app";

async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection ok!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

app.listen(3434, async () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  await checkDatabaseConnection();
  console.log("app listening on port 3434!");
});
