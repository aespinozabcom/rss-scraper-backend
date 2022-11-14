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
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "El id debe ser un mongo id").isMongoId(),
    check("id").custom(existeNoticia),
    check("title", "El title es obligatorio").not().isEmpty(),
    check("title", "El title debe ser un string").isString(),
    check("content_html", "El content_html es obligatorio").not().isEmpty(),
    check("content_html", "El content_html debe ser un string").isString(),
    check("summary", "El summary es obligatorio").not().isEmpty(),
    check("summary", "El summary debe ser un string").isString(),
    check("date_published", "El date_published es obligatorio").not().isEmpty(),
    check("date_published", "El date_published debe ser un string").isDate(),
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
