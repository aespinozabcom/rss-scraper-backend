const { Schema, model } = require("mongoose");

const feedMedioSchema = Schema({
  descripcion: {
    type: String,
    required: [true, "La descripcion del feed medio es obligatoria"],
  },
  url: {
    type: String,
    required: [true, "La url del feed medio obligatoria"],
  },
});

module.exports = model("FeedMedio", feedMedioSchema);
