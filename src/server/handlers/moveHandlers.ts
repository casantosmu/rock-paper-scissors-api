import { HydratedDocument } from "mongoose";
import { Server as SocketServer } from "socket.io";
import configs from "../../configs/configs";
import moveServices from "../../services/moveServices";
import { HandNames, RoomWithId, SocketWithData } from "../../types/interfaces";
import getPlayResult from "../../utils/game-utils";
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

export const moveResultHandler = async (
  io: SocketServer,
  socket: SocketWithData
) => {
  let readyToResult: HydratedDocument<RoomWithId>;
  try {
    readyToResult = await moveServices.updateReadyToResult(
      socket.data.activeRoomId
    );
  } catch (error) {
    generalErrorHandler(
      socket,
      `There was an error getting ${socket.data.activeRoomId} room to check if it's ready for result: ${error.message}`,
      "handlers:result"
    );
  }

  if (!readyToResult) return;

  const user1 = readyToResult.currentHands[0];
  const user2 = readyToResult.currentHands[1];

  const user1Result = getPlayResult(user1.currentHand, user2.currentHand);
  const user2Result = getPlayResult(user2.currentHand, user1.currentHand);

  io.to(user1.userId).emit(eventNames.move.result, user1Result);
  io.to(user2.userId).emit(eventNames.move.result, user2Result);
};
