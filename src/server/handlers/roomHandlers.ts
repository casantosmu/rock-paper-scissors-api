import { Socket } from "socket.io";
import chalk from "chalk";
import Debug from "debug";
import configs from "../../configs/configs";

const { eventNames, gameSettings } = configs;

const joinRoomHandler = async (socket: Socket, roomId: string) => {
  const debug = Debug("rock-paper-scissors:controllers:join-game");

  if (!roomId) {
    socket.emit(eventNames.room.joinError);
    debug(chalk.red(`${roomId} is not a valid game id`));
    return;
  }

  const withoutGame = 1;

  if (socket.rooms.size > withoutGame) {
    socket.emit(eventNames.room.joinError);
    debug(chalk.red(`User ${socket.id} has already started a game`));
    return;
  }

  const socketsInRoom = (await socket.in(roomId).fetchSockets()).length;

  if (socketsInRoom >= gameSettings.playersPerRoom) {
    socket.emit(eventNames.room.joinError);
    debug(chalk.red(`Room ${roomId} is currently full`));
    return;
  }

  await socket.join(roomId);

  socket.emit(eventNames.room.joinSucces);
  debug(chalk.greenBright(`User ${socket.id} has joined to ${roomId}`));
};

export default joinRoomHandler;
