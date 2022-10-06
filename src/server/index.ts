import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

export default server;
