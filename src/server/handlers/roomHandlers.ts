import chalk from "chalk";
import Debug from "debug";
import configs from "../../configs/configs";
import roomServices from "../../services/roomServices";
import { SocketWithData } from "../../types/interfaces";
import getSocketsInRoom from "../../utils/socket-utils";

const { eventNames, gameSettings } = configs;

const joinRoomHandler = async (socket: SocketWithData, roomId: string) => {
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

export default joinRoomHandler;
