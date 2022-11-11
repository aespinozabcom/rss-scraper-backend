const FeedMedio = require("../models/FeedMedio");

const listarFeedMedioController = async (req, res) => {
  const feedMedios = await FeedMedio.find({ estado: true });

  res.status(200).json(feedMedios);
};

const buscarFeedMedioXid = async (req, res) => {
  const { id } = req.params;

  const feedMedio = await FeedMedio.findOne({ _id: id, estado: true });

  res.status(200).json(feedMedio);
};

const crearFeedMedio = async (req, res) => {
  const { descripcion, url, urlFeedly } = req.body;

  const feedMedio = await new FeedMedio({
    descripcion: descripcion.toUpperCase(),
    url,
    urlFeedly,
  });

  await feedMedio.save();

  res.status(200).json(feedMedio);
};

const editarFeedMedio = async (req, res) => {
  const { id } = req.params;
  const { descripcion, url, urlFeedly } = req.body;

  const feedMedio = await FeedMedio.findByIdAndUpdate(
    id,
    { descripcion: descripcion.toUpperCase(), url, urlFeedly },
    { new: true }
  );

  await feedMedio.save();

  res.status(201).json(feedMedio);
};

const desactivarFeedMedio = async (req, res) => {
  const { id } = req.params;

  const feedMedio = await FeedMedio.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  await feedMedio.save();

  res.status(201).json(feedMedio);
};

const activarFeedMedio = async (req, res) => {
  const { id } = req.params;

  const feedMedio = await FeedMedio.findByIdAndUpdate(
    id,
    { estado: true },
    { new: true }
  );

  await feedMedio.save();

  res.status(201).json(feedMedio);
};

module.exports = {
  listarFeedMedioController,
  buscarFeedMedioXid,
  crearFeedMedio,
  editarFeedMedio,
  desactivarFeedMedio,
  activarFeedMedio,
};
