const { Router } = require("express");
const { check } = require("express-validator");
const {
  listarFeedMedioController,
  buscarFeedMedioXid,
  crearFeedMedio,
  editarFeedMedio,
  desactivarFeedMedio,
  activarFeedMedio,
} = require("../controllers/feedMedioController");
const { existeFeedMedio } = require("../helpers/db-validators");
const {
  validarFeedMedioUnico,
} = require("../middlewares/validarFeedMedioUnico");
const { validarUrlFeed } = require("../middlewares/validarUrlFeed");

const router = Router();

router.get("/", listarFeedMedioController);

router.get(
  "/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
  ],
  buscarFeedMedioXid
);

router.post(
  "/",
  [
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion debe ser un string").isString(),
    check("url", "La url es obligatoria").not().isEmpty(),
    check("url", "La url debe ser un string").isURL(),
    // check("urlFeedly", "La url es obligatoria").not().isEmpty(),
    validarUrlFeed,
    validarFeedMedioUnico,
  ],
  crearFeedMedio
);

router.put(
  "/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    check("id").custom(existeFeedMedio),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion debe ser un string").isString(),
    check("url", "La url es obligatoria").not().isEmpty(),
    check("url", "La url debe ser un string").isURL(),
    check("urlFeedly", "La url es obligatoria").not().isEmpty(),
    validarFeedMedioUnico,
  ],
  editarFeedMedio
);

router.delete(
  "/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    check("id").custom(existeFeedMedio),
  ],
  desactivarFeedMedio
);

router.get(
  "/activar/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    check("id").custom(existeFeedMedio),
  ],
  activarFeedMedio
);

module.exports = router;
