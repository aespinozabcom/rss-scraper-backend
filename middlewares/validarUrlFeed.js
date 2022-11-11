const FeedMedio = require("../models/FeedMedio");

const validarApiDuplicado = async (req, res, next) => {
  const { descripcion, url, urlFeedly } = req.body;

  let buscarFeedMedio = await FeedMedio.findOne({
    descripcion: descripcion.toUpperCase(),
    url,
    urlFeedly,
  });

  if (buscarFeedMedio) {
    return res.status(400).json({
      msg: `Ya existe una api con la descripcion: ${descripcion} y la url: ${url}`,
    });
  }

  buscarFeedMedio = await FeedMedio.findOne({
    descripcion: descripcion.toUpperCase(),
  });

  if (buscarFeedMedio) {
    return res.status(400).json({
      msg: `Ya existe una api con la descripcion: ${descripcion}`,
    });
  }

  buscarFeedMedio = await FeedMedio.findOne({
    url,
  });

  if (buscarFeedMedio) {
    return res.status(400).json({
      msg: `Ya existe una api con la url: ${url}`,
    });
  }

  next();
};

module.exports = {
  validarApiDuplicado,
};
