import configs from "../../configs/configs";
import moveServices from "../../services/moveServices";
import { SocketWithData } from "../../types/interfaces";
import generalErrorHandler from "./generalErrorHandler";

const { eventNames } = configs;

const uploadHandHandler = async (socket: SocketWithData, handName: string) => {
  socket.to(socket.data.activeRoomId).emit(eventNames.hand.updated, handName);
};

export const addUserWaitingHandler = async (socket: SocketWithData) => {
  try {
    await moveServices.addUserWaiting(socket.data.activeRoomId, socket.id);
  } catch (error) {
    generalErrorHandler(
      socket,
      `Error adding waiting user ${socket.id} on ${socket.data.activeRoomId} room: ${error.message}`,
      "handlers:add-user-waiting"
    );
  }
};

export default uploadHandHandler;
