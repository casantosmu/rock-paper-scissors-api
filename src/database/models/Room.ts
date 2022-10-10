import { model, Schema } from "mongoose";
import configs from "../../configs/configs";
import { RoomWithId } from "../../types/interfaces";

const { gameSettings } = configs;

const roomSchema = new Schema<RoomWithId>({
  _id: { type: String },
  isStarted: { type: Boolean, default: false },
  usersWaiting: [{ type: String }],
  currentHands: [
    {
      userId: String,
      currentHand: {
        type: String,
        enum: gameSettings.handNames,
      },
    },
  ],
});

const Room = model<RoomWithId>("Room", roomSchema, "rooms");

export default Room;
