const Api = require("../models/Api");

const existeApi = async (id) => {
  const buscarApi = await Usuario.findById(id);

  if (!buscarApi) {
    throw new Error(`No existe la api con el id: ${id}`);
  }
};

module.exports = {
  existeApi,
};
