// core modules
// npm modules
import express from "express";

// internal modules

const apiRoutes = express.Router();

apiRoutes.get("/", (req, res) => {
  res.send("API OI");
});

export default apiRoutes;
