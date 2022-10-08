import "./loadEnvironment";
import configs from "./configs/configs";
import server from "./server";
import startServer from "./server/startServer";

import startSocket from "./server/startSocket";

startSocket(server);
startServer(server, configs.env.port);
