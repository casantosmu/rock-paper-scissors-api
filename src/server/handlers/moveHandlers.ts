import { Socket } from "socket.io";
import configs from "../../configs/configs";
import getUserRoom from "../../utils/utils";

const { eventNames } = configs;

const uploadHandHandler = async (socket: Socket, handName: string) => {
  const userRoom = getUserRoom(socket.rooms);

  socket.to(userRoom).emit(eventNames.hand.updated, handName);
};

export default uploadHandHandler;
