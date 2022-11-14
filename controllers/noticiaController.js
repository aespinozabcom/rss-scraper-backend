const Noticia = require("../models/Noticia");

const listarNoticia = async (req, res) => {
  const noticias = await Noticia.find({ estado: true }).sort([
    ["date_published", -1],
  ]);

  res.status(200).json(noticias);
};

const buscarNoticiaXId = async (req, res) => {
  const { id } = req.params;

  const noticia = await Noticia.findOne({ _id: id, estado: true });

  res.status(200).json(noticia);
};

const buscarNoticiaXFeed = async (req, res) => {
  const { id } = req.params;

  const noticia = await Noticia.find({ feedMedio: id, estado: true }).sort([
    ["date_published", -1],
  ]);

  res.status(200).json(noticia);
};

const editarNoticia = async (req, res) => {
  const { id } = req.params;
  const { feedMedio, api } = req.body;

  const noticia = await Noticia.findByIdAndUpdate(
    id,
    { feedMedio, api },
    { new: true }
  );

  await noticia.save();

  res.status(201).json(noticia);
};

const desactivarNoticia = async (req, res) => {
  const { id } = req.params;

  const noticia = await Noticia.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  await noticia.save();

  res.status(201).json(noticia);
};

const activarNoticia = async (req, res) => {
  const { id } = req.params;

  const noticia = await Noticia.findByIdAndUpdate(
    id,
    { estado: true },
    { new: true }
  );

  await noticia.save();

  res.status(201).json(noticia);
};

module.exports = {
  listarNoticia,
  buscarNoticiaXId,
  buscarNoticiaXFeed,
  editarNoticia,
  desactivarNoticia,
  activarNoticia,
};
