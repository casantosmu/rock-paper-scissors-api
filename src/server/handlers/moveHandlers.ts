import configs from "../../configs/configs";
import { SocketWithData } from "../../types/interfaces";

const { eventNames } = configs;

const uploadHandHandler = async (socket: SocketWithData, handName: string) => {
  socket.to(socket.data.activeRoomId).emit(eventNames.hand.updated, handName);
};

export default uploadHandHandler;
