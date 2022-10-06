import Debug from "debug";
import http from "http";
import chalk from "chalk";
import configs from "../configs/configs";

const debug = Debug("rock-paper-scissors:startServer");

const startServer = (server: http.Server, port: number) =>
  new Promise<void>((resolve, reject) => {
    try {
      server.listen(port, () => {
        debug(
          chalk.green(`Server listening on ${configs.env.hostName}:${port}`)
        );
        resolve();
      });

      server.on("error", (error) => {
        throw new Error(error.message);
      });
    } catch (error) {
      debug(chalk.red(`There was an error on the server: ${error}`));
      reject();
    }
  });

export default startServer;
