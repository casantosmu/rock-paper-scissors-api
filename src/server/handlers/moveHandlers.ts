import configs from "../../configs/configs";
import moveServices from "../../services/moveServices";
import { HandNames, SocketWithData } from "../../types/interfaces";
import isValidHandName from "../../utils/validation-utils";
import generalErrorHandler from "./generalErrorHandler";

const { eventNames } = configs;

export const uploadHandHandler = async (
  socket: SocketWithData,
  handName: HandNames
) => {
  if (!isValidHandName(handName)) {
    generalErrorHandler(
      socket,
      `${handName} is not a valid hand name`,
      "handlers:upload-hand"
    );
    return;
  }

  try {
    await moveServices.addCurrentHand(
      socket.data.activeRoomId,
      socket.id,
      handName
    );

    socket.to(socket.data.activeRoomId).emit(eventNames.hand.updated, handName);
  } catch (error) {
    generalErrorHandler(
      socket,
      `Error adding waiting user ${socket.id} on ${socket.data.activeRoomId} room: ${error.message}`,
      "handlers:upload-hand"
    );
  }
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

export const isStartedHandler = async (socket: SocketWithData) => {
  try {
    const isReadyToStart = await moveServices.uploadIsStarted(
      socket.data.activeRoomId
    );

    if (isReadyToStart) {
      socket.emit(eventNames.move.starts);
      socket.to(socket.data.activeRoomId).emit(eventNames.move.starts);
    }
  } catch (error) {
    generalErrorHandler(
      socket,
      `Failed to upload move starts on ${socket.data.activeRoomId} room: ${error.message}`,
      "handlers:is-ready"
    );
  }
};
