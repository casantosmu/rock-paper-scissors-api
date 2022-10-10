import { Socket as SocketServer } from "socket.io";

const getSocketsInRoom = async (socket: SocketServer, roomId: string) =>
  (await socket.in(roomId).fetchSockets()).length;

export default getSocketsInRoom;
