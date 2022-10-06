const configs = {
  env: {
    port: +process.env.PORT,
    hostName: process.env.HOST_NAME,
    frontendWebUrl: process.env.FRONTEND_WEB_URL,
  },
} as const;

export default configs;
