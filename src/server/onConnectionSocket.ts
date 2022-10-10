import chalk from "chalk";
import Debug from "debug";
import configs from "../configs/configs";
import { HandNames, SocketWithData } from "../types/interfaces";
import {
  addUserWaitingHandler,
  isStartedHandler,
  uploadHandHandler,
} from "./handlers/moveHandlers";
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

  socket.on(eventNames.move.uploadUserWaiting, async () => {
    await addUserWaitingHandler(socket);
    isStartedHandler(socket);
  });

  socket.on(eventNames.hand.update, (handName: HandNames) =>
    uploadHandHandler(socket, handName)
  );

  socket.on(eventNames.predefined.disconnect, () => {
    disconnectRoomHandler(socket);
  });
};

export default onConnectionSocket;
