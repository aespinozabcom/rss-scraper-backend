const Api = require("../models/Api");
const FeedMedio = require("../models/FeedMedio");
const Noticia = require("../models/Noticia");

const existeApi = async (id) => {
  const buscarApi = await Api.findById(id);

  if (!buscarApi) {
    throw new Error(`No existe la api con el id: ${id}`);
  }
};

const existeFeedMedio = async (id) => {
  const buscarFeedMedio = await FeedMedio.findById(id);

  if (!buscarFeedMedio) {
    throw new Error(`No existe el feed medio con el id: ${id}`);
  }
};

const existeNoticia = async (id) => {
  const buscarNoticia = await Noticia.findById(id);

  if (!buscarNoticia) {
    throw new Error(`No existe el feed medio con el id: ${id}`);
  }
};

module.exports = {
  existeApi,
  existeFeedMedio,
  existeNoticia,
};
