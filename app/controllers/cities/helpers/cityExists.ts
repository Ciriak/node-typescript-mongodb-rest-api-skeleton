import City from "../../../models/city";

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const cityExists = (name: string = "") => {
  return new Promise((resolve, reject) => {
    City.findOne(
      {
        name,
      },
      (err: Error, item: object) => {
        if (err) {
          return reject(buildErrObject(422, err.message));
        }

        if (item) {
          return reject(buildErrObject(422, "CITY_ALREADY_EXISTS"));
        }
        resolve(false);
      }
    );
  });
};

export default cityExists;
