import chalk from "chalk";
import Debug from "debug";
import http from "http";
import { Server as SocketServer } from "socket.io";
import configs from "../configs/configs";

const debug = Debug("rock-paper-scissors:start-socket");

const startSocket = (server: http.Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: configs.env.frontendWebUrl,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    debug(chalk.blueBright(`New socket connected: ${socket.id}`));

    socket.on("disconnect", () => {
      debug(chalk.blueBright(`Socket disconnected: ${socket.id}`));
    });
  });
};

export default startSocket;
