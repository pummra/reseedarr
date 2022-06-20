// core modules
import path from "path";
import { fileURLToPath } from "url";
// npm modules
import express from "express";

// internal modules
import apiRoutes from "./routes";
// import apiRoutes from "./routes/api.routes";
// import appRoutes from "./routes/app.routes";

const app = express();
app.use(express.json());

const dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("directory-name", dirname);

const publicDirectoryPath = path.join(dirname, "../app");

app.use(express.static(publicDirectoryPath));

app.use("/api", apiRoutes);

export default app;
