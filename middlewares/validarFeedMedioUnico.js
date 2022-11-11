const FeedMedio = require("../models/FeedMedio");

const validarFeedMedioUnico = async (req, res, next) => {
  const { descripcion, url, urlFeedly } = req.body;

  let buscarFeedMedio = await FeedMedio.findOne({
    descripcion: descripcion.toUpperCase(),
  });

  if (buscarFeedMedio) {
    return res.status(400).json({
      msg: `Ya existe un feed medio con la descripcion: ${descripcion}`,
    });
  }

  buscarFeedMedio = await FeedMedio.findOne({
    url,
  });

  if (buscarFeedMedio) {
    return res.status(400).json({
      msg: `Ya existe un feed medio con la url: ${url}`,
    });
  }

  if (urlFeedly !== undefined && urlFeedly !== null) {
    buscarFeedMedio = await FeedMedio.findOne({
      urlFeedly,
    });
    if (buscarFeedMedio) {
      return res.status(400).json({
        msg: `Ya existe un feed medio con la url feedly: ${urlFeedly}`,
      });
    }
  }

  next();
};

module.exports = {
  validarFeedMedioUnico,
};
