const FeedMedio = require("../models/FeedMedio");

const listarFeedMedioController = async (req, res) => {
  const feedMedios = await FeedMedio.find({ estado: true });

  res.status(200).json(feedMedios);
};

const buscarApiController = async (req, res) => {
  const { id } = req.params;

  const api = await FeedMedio.findById(id, { estado: true });

  res.status(200).json(api);
};

const crearApi = async (req, res) => {
  const { descripcion, url } = req.body;

  const api = await new FeedMedio({
    descripcion: descripcion.toUpperCase(),
    url,
  });

  await api.save();

  res.status(200).json(api);
};

const editarApi = async (req, res) => {
  const { id } = req.params;
  const { descripcion, url } = req.body;

  const api = await FeedMedio.findByIdAndUpdate(
    id,
    { descripcion: descripcion.toUpperCase(), url },
    { new: true }
  );

  await api.save();

  res.status(201).json(api);
};

const desactivarApi = async (req, res) => {
  const { id } = req.params;

  const api = await FeedMedio.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  await api.save();

  res.status(201).json(api);
};

const activarApi = async (req, res) => {
  const { id } = req.params;

  const api = await FeedMedio.findByIdAndUpdate(
    id,
    { estado: true },
    { new: true }
  );

  await api.save();

  res.status(201).json(api);
};

module.exports = {
  listarFeedMedioController,
  buscarApiController,
  crearApi,
  editarApi,
  desactivarApi,
  activarApi,
};
