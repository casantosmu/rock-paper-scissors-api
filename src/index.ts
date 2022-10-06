import "./loadEnvironment";
import configs from "./configs/configs";
import server from "./server";
import startServer from "./server/startServer";

import startSocket from "./server/startSocket";

const port = configs.env.port || 5000;

startSocket(server);
startServer(server, port);
