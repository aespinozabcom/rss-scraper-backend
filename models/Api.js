const { Schema, model } = require("mongoose");

const apiSchema = Schema({
  descripcion: {
    type: String,
    required: [true, "La descripcion de la api es obligatoria"],
  },
  url: {
    type: String,
    required: [true, "La url de la api es obligatoria"],
  },
});

module.exports = model("Api", apiSchema);
