import express, { Request, Response } from "express";
const router = express.Router();
import fs from "fs";
import removeExtensionFromFile from "../middleware/utils/removeExtensionFromFile";
const routesPath = `${__dirname}/`;

/*
 * Load routes statically and/or dynamically
 */

// Load Auth route
router.use("/", require("./auth"));

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file);
  // Prevents loading of this file and auth file
  return routeFile !== "index" && routeFile !== "auth" && file !== ".DS_Store"
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : "";
});

/*
 * Setup routes for index
 */
router.get("/", (req: Request, res: Response) => {
  res.render("index");
});

/*
 * Handle 404 error
 */
router.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    errors: {
      msg: "URL_NOT_FOUND",
    },
  });
});

export default router;
