import Room from "../database/models/Room";

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

export default {
  addUserWaiting,
  removeUserWaiting,
};
