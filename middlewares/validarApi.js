const Api = require("../models/Api");

const validarApiDuplicado = async (req, res, next) => {
  const { descripcion, url } = req.body;

  let buscarApi = await Api.findOne({
    descripcion: descripcion.toUpperCase(),
    url,
  });

  if (buscarApi) {
    return res.status(400).json({
      msg: `Ya existe una api con la descripcion: ${descripcion} y la url: ${url}`,
    });
  }

  buscarApi = await Api.findOne({
    descripcion: descripcion.toUpperCase(),
  });

  if (buscarApi) {
    return res.status(400).json({
      msg: `Ya existe una api con la descripcion: ${descripcion}`,
    });
  }

  buscarApi = await Api.findOne({
    url,
  });

  if (buscarApi) {
    return res.status(400).json({
      msg: `Ya existe una api con la url: ${url}`,
    });
  }

  next();
};

module.exports = {
  validarApiDuplicado,
};
