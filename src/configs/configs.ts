const configs = {
  env: {
    port: +process.env.PORT || 5000,
    hostName: process.env.HOST_NAME,
    frontendWebUrl: process.env.FRONTEND_WEB_URL,
  },
  eventMessages: {
    room: {
      joinBase: "join_game",
      joinSucces: "join_game_success",
      joinError: "join_game_error",
    },
    hand: {
      update: "move_hand_update",
      updated: "move_hand_updated",
    },
  },
  gameSettings: {
    playersPerRoom: 2,
  },
} as const;

export default configs;
