const { Schema, model } = require("mongoose");

const noticiaSchema = Schema(
  {
    titulo: {
      type: String,
    },
    content: {
      type: String,
    },
    summary: {
      type: String,
    },
    fecha: {
      type: Date,
    },
    url: {
      type: String,
    },
    feedMedio: {
      type: Schema.Types.ObjectId,
      ref: "FeedMedio",
    },
    estado: {
      type: Boolean,
      required: [true],
      default: true,
    },
  },
  { strict: false }
);

module.exports = model("FeedMedio", noticiaSchema);
