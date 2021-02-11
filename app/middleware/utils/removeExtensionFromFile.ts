/**
 * Removes extension from file
 * @param {string} file - filename
 */
export default function removeExtensionFromFile(file: string) {
  return file.split(".").slice(0, -1).join(".").toString();
}
