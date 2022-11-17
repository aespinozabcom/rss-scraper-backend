require("dotenv").config();
const cluster = require("cluster");
const Server = require("./models/server");
// const Rss = require("./models/rss");
const numCPUs = require("os").cpus().length;
// const { fork } = require("child_process");

const server = new Server();
// const rss = new Rss();

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
} else {
  server.listen();
  // rss.scrapear();
}
