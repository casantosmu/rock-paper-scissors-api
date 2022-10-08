import "./loadEnvironment";
import configs from "./configs/configs";
import server from "./server";
import startSocket from "./server/startSocket";
import startServer from "./server/startServer";
import connectDatabase from "./database/connectDatabase";

(async () => {
  try {
    startSocket(server);
    await connectDatabase(configs.env.mongoDbUrl);
    await startServer(server, configs.env.port);
  } catch {
    process.exit(1);
  }
})();
