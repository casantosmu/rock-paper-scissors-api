import { Socket } from "socket.io";
import configs from "../configs/configs";

export type HandNames = typeof configs.gameSettings.handNames[number];

type CurrentHand = {
  userId: string;
  currentHand: HandNames;
};

export interface Room {
  isStarted: boolean;
  usersWaiting: string[];
  currentHands: CurrentHand[];
}

export interface RoomWithId extends Room {
  _id: string;
}

export interface SocketWithData extends Socket {
  data: {
    activeRoomId: string;
  };
}
