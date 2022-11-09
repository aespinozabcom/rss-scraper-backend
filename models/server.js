const express = require("express");
const cors = require("cors");
const path = require("path");

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
    // try {
    //   await sequelize.authenticate();
    //   console.log("Base de datos en linea");
    // } catch (error) {
    //   console.warn("Error en la base de datos: ", error);
    // }
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
