const configs = {
  env: {
    port: +process.env.PORT,
    hostName: process.env.HOST_NAME,
    frontendWebUrl: process.env.FRONTEND_WEB_URL,
  },
  eventMessages: {
    room: {
      joinBase: "join_game",
      joinSucces: "join_game_success",
      joinError: "join_game_error",
    },
  },
} as const;

export default configs;
