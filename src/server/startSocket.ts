import chalk from "chalk";
import Debug from "debug";
import http from "http";
import { Server as SocketServer } from "socket.io";
import configs from "../configs/configs";
import updateHandController from "./controllers/moveController";
import joinRoomController from "./controllers/roomController";

const debug = Debug("rock-paper-scissors:start-socket");
const { eventNames } = configs;

const startSocket = (server: http.Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: configs.env.frontendWebUrl,
      credentials: true,
    },
  });

  io.on(eventNames.predefined.connection, (socket) => {
    debug(chalk.blueBright(`New socket connected: ${socket.id}`));

    socket.on(eventNames.room.joinBase, (roomId: string) =>
      joinRoomController(socket, roomId)
    );

    socket.on(eventNames.hand.update, (handName: string) =>
      updateHandController(socket, handName)
    );

    socket.on(eventNames.predefined.disconnect, () => {
      debug(chalk.blueBright(`Socket disconnected: ${socket.id}`));
    });
  });
};

export default startSocket;
