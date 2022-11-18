const express = require("express");
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");
const http = require("http");
const { dbConnection } = require("../database/config");
const apiRoutes = require("../routes/apiRoutes");
const feedMedioRoutes = require("../routes/feedMedioRoutes");
const noticiaRoutes = require("../routes/noticiaRoutes");
const { scrapearRss } = require("../helpers/scrapRss");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.path = {
      api: "/api/api",
      feedMedio: "/api/feed-medio",
      noticia: "/api/noticia",
    };

    this.dbConnect();

    this.middlewares();

    this.rutas();

    this.proxy();

    this.server = http.createServer(this.app);

    this.io = socketIo(this.server, {
      cors: "*",
    });

    this.io.on("connection", (socket) => {
      console.log("client connected: ", socket.id);

      socket.emit("noticia", "hola");

      // socket.join("clock-room");
      // socket.emit("connection", null);
      // socket.on("disconnect", (reason) => {
      //   console.log(reason);
      // });
    });

    this.scraping();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor iniciado en el puerto " + this.port);
    });
  }

  async dbConnect() {
    await dbConnection();
  }

  rutas() {
    this.app.use(this.path.api, apiRoutes);
    this.app.use(this.path.feedMedio, feedMedioRoutes);
    this.app.use(this.path.noticia, noticiaRoutes);
  }

  proxy() {
    this.app.all("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  }

  scraping() {
    try {
      setInterval(() => {
        scrapearRss(process.env.ID_API, this.io);
      }, 60000);
    } catch (error) {
      console.warn(error);
    }
  }
}

module.exports = Server;
