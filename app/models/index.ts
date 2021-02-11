import fs from "fs";
const modelsPath = `${__dirname}/`;
import { removeExtensionFromFile } from "../middleware/utils";

export default function loadModels() {
  /*
   * Load models dynamically
   */

  // Loop models path and loads every file as a model except this file
  fs.readdirSync(modelsPath).filter((file) => {
    // Take filename and remove last part (extension)
    const modelFile = removeExtensionFromFile(file);
    // Prevents loading of this file
    return modelFile !== "index" ? require(`./${modelFile}`) : "";
  });
}
