import chalk from "chalk";
import Debug from "debug";
import configs from "../configs/configs";
import { SocketWithData } from "../types/interfaces";
import updateHandController from "./controllers/moveController";
import joinRoomController from "./controllers/roomController";

const { eventNames } = configs;

const onConnectionSocket = (socket: SocketWithData) => {
  const debug = Debug("rock-paper-scissors:on-connection-socket");

  debug(chalk.blue(`New socket connected: ${socket.id}`));

  socket.on(eventNames.room.joinBase, (roomId: string) =>
    joinRoomController(socket, roomId)
  );

  socket.on(eventNames.hand.update, (handName: string) =>
    updateHandController(socket, handName)
  );

  socket.on(eventNames.predefined.disconnect, () => {
    debug(chalk.blueBright(`Socket disconnected: ${socket.id}`));
  });
};

export default onConnectionSocket;
