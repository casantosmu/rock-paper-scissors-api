import chalk from "chalk";
import Debug from "debug";
import configs from "../configs/configs";
import { SocketWithData } from "../types/interfaces";
import uploadHandHandler from "./handlers/moveHandlers";
import {
  disconnectRoomHandler,
  joinRoomHandler,
} from "./handlers/roomHandlers";

const { eventNames } = configs;

const onConnectionSocket = (socket: SocketWithData) => {
  const debug = Debug("rock-paper-scissors:on-connection-socket");

  debug(chalk.blue(`New socket connected: ${socket.id}`));

  socket.on(eventNames.room.joinBase, (roomId: string) =>
    joinRoomHandler(socket, roomId)
  );

  socket.on(eventNames.hand.update, (handName: string) =>
    uploadHandHandler(socket, handName)
  );

  socket.on(eventNames.predefined.disconnect, () => {
    disconnectRoomHandler(socket);
  });
};

export default onConnectionSocket;
