require('dotenv-safe').config();
import initMongo from './config/mongo';
import { CallbackError, Model } from 'mongoose';
import city from './app/models/city';
import user from './app/models/user';
import forgotPassword from './app/models/forgotPassword';
import userAccess from './app/models/userAccess';

initMongo();

const models: Model<any>[] = [city, user, forgotPassword, userAccess];

const deleteModelFromDB = (model: Model<any>): Promise<void> => {
  return new Promise((resolve, reject) => {
    model.deleteMany((err: CallbackError) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const clean = async () => {
  try {
    const promiseArray = models.map(
      async (model) => await deleteModelFromDB(model)
    );
    await Promise.all(promiseArray);
    console.log('Cleanup complete!');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

clean();
