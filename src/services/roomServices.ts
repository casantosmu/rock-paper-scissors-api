import Room from "../database/models/Room";

const createIfNotExists = async (roomId: string) => {
  const isRoomCreated = await Room.findById(roomId).lean();

  if (!isRoomCreated) {
    await Room.create({ _id: roomId });
  }
};

const deleteRoom = async (roomId: string) => {
  await Room.findByIdAndDelete(roomId);
};

const removeUser = async (roomId: string, userId: string) => {
  await Room.findByIdAndUpdate(roomId, {
    $pull: { usersWaiting: userId, currentHands: { userId } },
  });
};

export default { createIfNotExists, deleteRoom, removeUser };
