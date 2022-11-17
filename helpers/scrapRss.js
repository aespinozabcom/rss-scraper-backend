const axios = require("axios");
const FeedMedio = require("../models/FeedMedio");
const Api = require("../models/Api");
const Noticia = require("../models/Noticia");
const fs = require("fs");

const scrapearRss = async (idApi) => {
  const feeds = await FeedMedio.find({ estado: true });
  const api = await Api.findOne({ _id: idApi, estado: true });

  feeds.forEach(async (feed) => {
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

      ultimasNoticias.forEach(async (ut) => {
        if (!noticiasLimpias.includes(ut)) {
          const crearNot = await new Noticia({
            ...ut,
            feedMedio: feed._id,
            api: idApi,
          });

          await crearNot.save();
        }
      });
    } else {
      noticiasRss.data.items.forEach(async (nt) => {
        const crearNot = await new Noticia({
          ...nt,
          feedMedio: feed._id,
          api: idApi,
        });

        await crearNot.save();
      });
    }
  });
};

module.exports = {
  scrapearRss,
};
