import { Socket } from "socket.io";

export interface SocketWithData extends Socket {
  data: {
    activeRoomId: string;
  };
}
