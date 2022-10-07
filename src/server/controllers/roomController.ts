import { Socket } from "socket.io";
import chalk from "chalk";
import Debug from "debug";
import configs from "../../configs/configs";

const { eventMessages } = configs;

const joinRoomController = async (socket: Socket, roomId: string) => {
  const debug = Debug("rock-paper-scissors:controllers:join-game");

  if (!roomId) {
    socket.emit(eventMessages.room.joinError);
    debug(chalk.red(`${roomId} is not a valid game id`));
    return;
  }

  const withoutGame = 1;

  if (socket.rooms.size > withoutGame) {
    socket.emit(eventMessages.room.joinError);
    debug(chalk.red(`User ${socket.id} has already started a game`));
    return;
  }

  const maxPlayers = 2;
  const sockets = await socket.in(roomId).fetchSockets();

  if (sockets.length >= maxPlayers) {
    socket.emit(eventMessages.room.joinError);
    debug(chalk.red(`Room ${roomId} is currently full`));
    return;
  }

  await socket.join(roomId);

  socket.emit(eventMessages.room.joinSucces);
  debug(chalk.greenBright(`User ${socket.id} has joined to ${roomId}`));
};

export default joinRoomController;