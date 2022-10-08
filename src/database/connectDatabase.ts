import chalk from "chalk";
import Debug from "debug";
import mongoose from "mongoose";

const debug = Debug("rock-paper-scissors:connect-database");

const connectDatabase = (mongoUrl: string) =>
  new Promise<void>((resolve, reject) => {
    mongoose.connect(mongoUrl, (error) => {
      if (error) {
        debug(chalk.red(`Error connecting to database: ${error.message}`));
        reject();
        return;
      }

      debug(chalk.green("Connected to database"));
      resolve();
    });
  });

export default connectDatabase;
