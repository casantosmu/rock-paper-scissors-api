import chalk from "chalk";
import Debug from "debug";
import configs from "../../configs/configs";
import moveServices from "../../services/moveServices";
import roomServices from "../../services/roomServices";
import { SocketWithData } from "../../types/interfaces";
import getSocketsInRoom from "../../utils/socket-utils";
import generalErrorHandler from "./generalErrorHandler";

const { eventNames, gameSettings } = configs;

export const joinRoomHandler = async (
  socket: SocketWithData,
  roomId: string
) => {
  const debug = Debug("rock-paper-scissors:controllers:join-game");

  if (!roomId) {
    socket.emit(eventNames.room.joinError);
    debug(chalk.red(`${roomId} is not a valid room id`));
    return;
  }

  const withoutGame = 1;

  if (socket.rooms.size > withoutGame) {
    socket.emit(eventNames.room.joinError);
    debug(chalk.red(`User ${socket.id} has already started a game`));
    return;
  }

  const socketsInRoom = await getSocketsInRoom(socket, roomId);

  if (socketsInRoom >= gameSettings.playersPerRoom) {
    socket.emit(eventNames.room.joinError);
    debug(chalk.red(`Room ${roomId} is currently full`));
    return;
  }

  try {
    await roomServices.createIfNotExists(roomId);
  } catch (error) {
    socket.emit(eventNames.room.joinError);
    debug(chalk.red(`Error creating room ${roomId}: ${error.message}`));
    return;
  }

  // eslint-disable-next-line no-param-reassign
  socket.data.activeRoomId = roomId;
  socket.join(roomId);

  debug(chalk.blue(`User ${socket.id} has joined to ${roomId}`));
  socket.emit(eventNames.room.joinSucces);
};

export const disconnectRoomHandler = async (socket: SocketWithData) => {
  const debug = Debug("rock-paper-scissors:controllers:disconnect-room");

  debug(chalk.blue(`Socket disconnected: ${socket.id}`));

  const socketsInRoom = await getSocketsInRoom(
    socket,
    socket.data.activeRoomId
  );

  if (!socketsInRoom) {
    try {
      await roomServices.deleteRoom(socket.data.activeRoomId);

      debug(chalk.blue(`Room ${socket.data.activeRoomId} has been removed`));
      socket.emit(eventNames.room.closed);
    } catch (error) {
      generalErrorHandler(
        socket,
        `Error removing ${socket.data.activeRoomId} room: ${error.message}`,
        "disconnect-room"
      );
    }

    return;
  }

  if (socketsInRoom === gameSettings.minimumPlayers) {
    socket.to(socket.data.activeRoomId).disconnectSockets();
  }

  try {
    await moveServices.removeUserWaiting(socket.data.activeRoomId, socket.id);
  } catch (error) {
    generalErrorHandler(
      socket,
      `Error removing user ${socket.id} from ${socket.data.activeRoomId} room: ${error.message}`,
      "controllers:disconnect-room"
    );
  }
};
