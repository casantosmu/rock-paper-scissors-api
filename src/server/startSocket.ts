import http from "http";
import { Server as SocketServer } from "socket.io";
import configs from "../configs/configs";
import { SocketWithData } from "../types/interfaces";
import onConnectionSocket from "./onConnectionSocket";

const { eventNames } = configs;

const startSocket = (server: http.Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: configs.env.frontendWebUrl,
      credentials: true,
    },
  });

  io.on(eventNames.predefined.connection, (socket: SocketWithData) => {
    onConnectionSocket(io, socket);
  });
};

export default startSocket;
