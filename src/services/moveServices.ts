import { FilterQuery, UpdateQuery } from "mongoose";
import configs from "../configs/configs";
import Room from "../database/models/Room";
import { HandNames, RoomWithId } from "../types/interfaces";

const { gameSettings } = configs;

const addUserWaiting = async (roomId: string, userId: string) => {
  await Room.findByIdAndUpdate(roomId, {
    $addToSet: { usersWaiting: userId },
  });
};

const addCurrentHand = async (
  roomId: string,
  userId: string,
  handName: HandNames
) => {
  await Room.findByIdAndUpdate(roomId, {
    $addToSet: { currentHands: { userId, currentHand: handName } },
  });
};

const uploadIsStarted = async (roomId: string) => {
  const filter: FilterQuery<RoomWithId> = {
    _id: roomId,
    isStarted: false,
    [`usersWaiting.${gameSettings.playersPerRoom - 1}`]: { $exists: true },
  };
  const update: UpdateQuery<RoomWithId> = {
    $set: {
      isStarted: true,
      usersWaiting: [],
    },
  };

  return Room.findOneAndUpdate(filter, update);
};

const getReadyToResult = async (roomId: string) => {
  const filter: FilterQuery<RoomWithId> = {
    _id: roomId,
    isStarted: true,
    [`currentHands.${gameSettings.playersPerRoom - 1}`]: { $exists: true },
  };

  return Room.findOne(filter);
};

export default {
  addUserWaiting,
  addCurrentHand,
  uploadIsStarted,
  getReadyToResult,
};
