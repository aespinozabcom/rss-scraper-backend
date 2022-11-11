const { Schema, model } = require("mongoose");

const noticiaSchema = Schema(
  {
    api: {
      type: Schema.Types.ObjectId,
      ref: "Api",
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

module.exports = model("Noticia", noticiaSchema);
