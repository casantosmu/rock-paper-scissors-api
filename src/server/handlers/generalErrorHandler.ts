import chalk from "chalk";
import { Socket } from "socket.io";
import Debug from "debug";
import configs from "../../configs/configs";

const { eventNames } = configs;

const generalErrorHandler = (
  socket: Socket,
  loggerMessage: string,
  debugPath: string = "handlers:general-error"
) => {
  const debug = Debug(`rock-paper-scissors:${debugPath}`);

  debug(chalk.red(loggerMessage));
  socket.emit(eventNames.room.generalError);
  socket.disconnect();
};

export default generalErrorHandler;
