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

const removeUserWaiting = async (roomId: string, userId: string) => {
  await Room.findByIdAndUpdate(roomId, {
    $pull: { usersWaiting: userId },
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
  const lessThanOneToStart = gameSettings.playersPerRoom - 1;

  const filter: FilterQuery<RoomWithId> = {
    _id: roomId,
    isStarted: false,
    [`usersWaiting.${lessThanOneToStart}`]: { $exists: true },
  };
  const update: UpdateQuery<RoomWithId> = {
    $set: {
      isStarted: true,
      usersWaiting: [],
    },
  };

  return Room.findOneAndUpdate(filter, update);
};

export default {
  addUserWaiting,
  removeUserWaiting,
  addCurrentHand,
  uploadIsStarted,
};
