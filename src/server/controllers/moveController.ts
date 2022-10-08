import { Socket } from "socket.io";
import configs from "../../configs/configs";
import getUserRoom from "../../utils/utils";

const { eventMessages } = configs;

const updateHandController = async (socket: Socket, handName: string) => {
  const userRoom = getUserRoom(socket.rooms);

  socket.to(userRoom).emit(eventMessages.hand.updated, handName);
};

export default updateHandController;
