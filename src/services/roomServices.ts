import Room from "../database/models/Room";

const createIfNotExists = async (roomId: string) => {
  const isRoomCreated = await Room.findById(roomId).lean();

  if (!isRoomCreated) {
    await Room.create({ _id: roomId });
  }
};

export default { createIfNotExists };
