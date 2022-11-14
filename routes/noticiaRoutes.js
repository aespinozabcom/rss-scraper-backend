const { Router } = require("express");
const { check } = require("express-validator");
const {
  listarNoticia,
  buscarNoticiaXId,
  editarNoticia,
  desactivarNoticia,
  activarNoticia,
  buscarNoticiaXFeed,
} = require("../controllers/noticiaController");
const { existeNoticia, existeFeedMedio } = require("../helpers/db-validators");

const router = Router();

router.get("/", listarNoticia);

router.get(
  "/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
  ],
  buscarNoticiaXId
);

router.get(
  "/feed/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    check("id").custom(existeFeedMedio),
  ],
  buscarNoticiaXFeed
);

router.put(
  "/:id",
  [
    check("feedMedio", "El feed medio es obligatorio").not().isEmpty(),
    check("feedMedio", "El feed medio debe ser un mongo id").isMongoId(),
    check("api", "La api es obligatoria").not().isEmpty(),
    check("api", "La api debe ser un mongo id").isMongoId(),
  ],
  editarNoticia
);

router.delete(
  "/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    check("id").custom(existeNoticia),
  ],
  desactivarNoticia
);

router.get(
  "/activar/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    check("id").custom(existeNoticia),
  ],
  activarNoticia
);

module.exports = router;
