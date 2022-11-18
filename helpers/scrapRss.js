const axios = require("axios");
const FeedMedio = require("../models/FeedMedio");
const Api = require("../models/Api");
const Noticia = require("../models/Noticia");
const fs = require("fs");

const scrapearRss = async (idApi, io) => {
  const feeds = await FeedMedio.find({ estado: true });
  const api = await Api.findOne({ _id: idApi, estado: true });

  const listaNuevasNoticias = [];

  for await (const feed of feeds) {
    const noticiasRss = await axios({
      url: `${api.url}${feed.url}`,
      method: "GET",
    });

    for await (const not of noticiasRss.data.items) {
      let buscarNot = await Noticia.findOne({
        url: not.url,
      });

      if (!buscarNot) {
        buscarNot = await new Noticia({
          ...not,
          feedMedio: feed._id,
          api: idApi,
        });

        await buscarNot.save();

        listaNuevasNoticias.push(buscarNot);
      }
    }
  }

  if (listaNuevasNoticias.length > 0) {
    io.sockets.emit("noticias", listaNuevasNoticias);
  }
};

module.exports = {
  scrapearRss,
};
