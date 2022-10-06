import "./loadEnvironment";
import configs from "./configs/configs";
import startServer from "./server/startServer";
import server from "./server";

const port = configs.env.port || 5000;

(async () => {
  try {
    await startServer(server, port);
  } catch {
    process.exit(1);
  }
})();
