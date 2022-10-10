const configs = {
  env: {
    port: +process.env.PORT || 5000,
    hostName: process.env.HOST_NAME,
    frontendWebUrl: process.env.FRONTEND_WEB_URL,
    mongoDbUrl: process.env.MONGO_DB_URL,
  },
  eventNames: {
    room: {
      joinBase: "room:join",
      joinSucces: "room:join_success",
      joinError: "room:join_error",
      generalError: "room:general_error",
      closed: "room:closed",
    },
    hand: {
      update: "hand:update",
      updated: "hand:updated",
    },
    move: {
      uploadUserWaiting: "move:upload_user_waiting",
    },
    predefined: {
      connection: "connection",
      disconnect: "disconnect",
    },
  },
  gameSettings: {
    minimumPlayers: 1,
    playersPerRoom: 2,
    handNames: ["scissors", "paper", "rock"],
  },
} as const;

export default configs;
