const configs = {
  env: {
    port: +process.env.PORT,
    hostName: process.env.HOST_NAME,
  },
} as const;

export default configs;
