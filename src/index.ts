import "./loadEnvironment";
import configs from "./configs/configs";
import server from "./server";
import startSocket from "./server/startSocket";
import startServer from "./server/startServer";

(async () => {
  try {
    startSocket(server);
    await startServer(server, configs.env.port);
  } catch {
    process.exit(1);
  }
})();
