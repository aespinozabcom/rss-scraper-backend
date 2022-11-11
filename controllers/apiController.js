const Api = require("../models/Api");

const listarApiController = async (req, res) => {
  const apis = await Api.find({ estado: true });

  res.status(200).json(apis);
};

const buscarApiController = async (req, res) => {
  const { id } = req.params;

  const api = await Api.findById(id, { estado: true });

  res.status(200).json(api);
};

const crearApi = async (req, res) => {
  const { descripcion, url } = req.body;

  const api = await new Api({ descripcion: descripcion.toUpperCase(), url });

  await api.save();

  res.status(200).json(api);
};

const editarApi = async (req, res) => {
  const { id } = req.params;
  const { descripcion, url } = req.body;

  const api = await Api.findByIdAndUpdate(
    id,
    { descripcion: descripcion.toUpperCase(), url },
    { new: true }
  );

  await api.save();

  res.status(201).json(api);
};

const desactivarApi = async (req, res) => {
  const { id } = req.params;

  const api = await Api.findByIdAndUpdate(id, { estado: false }, { new: true });

  await api.save();

  res.status(201).json(api);
};

const activarApi = async (req, res) => {
  const { id } = req.params;

  const api = await Api.findByIdAndUpdate(id, { estado: true }, { new: true });

  await api.save();

  res.status(201).json(api);
};

module.exports = {
  listarApiController,
  buscarApiController,
  crearApi,
  editarApi,
  desactivarApi,
  activarApi,
};
