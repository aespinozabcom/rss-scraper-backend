const express = require("express");
const cors = require("cors");
const path = require("path");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.path = {
      pais: "/api/prueba",
    };

    this.dbConnect();

    this.middlewares();

    this.rutas();

    this.proxy();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor iniciado en el puerto " + this.port);
    });
  }

  async dbConnect() {
    await dbConnection();
  }

  rutas() {
    // this.app.use(this.path.pais, paisRoutes);
  }

  proxy() {
    this.app.all("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  }
}

module.exports = Server;
