import { Socket } from "socket.io";
import configs from "../../configs/configs";

const { eventMessages } = configs;

const updateHandController = async (socket: Socket, handName: string) => {
  const firstRoom = 1;

  const roomId = [...socket.rooms][firstRoom];

  socket.to(roomId).emit(eventMessages.hand.updated, handName);
};

export default updateHandController;
