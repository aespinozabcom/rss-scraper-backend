const EventEmitter = require("events");
const fs = require("fs");
const axios = require("axios");
const FeedMedio = require("../models/FeedMedio");
const Api = require("../models/Api");
const Noticia = require("../models/Noticia");
const path = require("path");

class MyEmmiter extends EventEmitter {}

class Rss {
  constructor() {
    this.myEmitter = new MyEmmiter();

    this.myEmitter.on("noticia", async (data) => {
      for await (const dt of data) {
        const crearNot = await new Noticia({
          ...dt,
          api: process.env.ID_API,
        });

        await crearNot.save();
      }
    });
  }

  scrapear() {
    setInterval(async () => {
      const feeds = await FeedMedio.find({ estado: true });
      const api = await Api.findOne({ _id: process.env.ID_API, estado: true });

      let listarNoticias = [];

      for await (const feed of feeds) {
        const noticiasRss = await axios({
          url: `${api.url}${feed.url}`,
          method: "GET",
        });

        const noticiasBD = await Noticia.find({
          estado: true,
          feedMedio: feed._id,
        }).sort([["date_published", 1]]);

        if (noticiasBD.length > 0) {
          const ultimaFecha = noticiasBD.pop().date_published;

          const ultimasNoticias = noticiasRss.data.items.filter(
            (nt) => Date.parse(nt.date_published) > Date.parse(ultimaFecha)
          );

          const noticiasLimpias = noticiasBD.map((nt) => {
            return {
              guid: nt.guid,
              url: nt.url,
              title: nt.title,
              content_html: nt.content_html,
              summary: nt.summary,
              date_published: nt.date_published,
              author: nt.author,
            };
          });

          const noticiasFinal = ultimasNoticias
            .filter((x) => !noticiasLimpias.includes(x))
            .map((ntf) => {
              return {
                ...ntf,
                feedMedio: feed._id,
              };
            });

          listarNoticias = [...listarNoticias, ...noticiasFinal];
        } else {
          listarNoticias = [
            ...listarNoticias,
            ...noticiasRss.data.items.map((nrs) => {
              return { ...nrs, feedMedio: feed._id };
            }),
          ];
        }
      }

      if (listarNoticias.length > 0) {
        this.myEmitter.emit("noticia", listarNoticias);
      }
    }, 30000);
  }
}

module.exports = Rss;
