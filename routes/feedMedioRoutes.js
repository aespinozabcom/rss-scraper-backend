const { Router } = require("express");
const { check } = require("express-validator");
const {
  listarFeedMedioController,
} = require("../controllers/feedMedioController");

const router = Router();

//Listar roles
router.get("/", listarFeedMedioController);

//Buscar rol x Id
router.get(
  "/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
  ]
  //   buscarApiController
);

//Crear rol
router.post(
  "/",
  [
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion debe ser un string").isString(),
    check("url", "La url es obligatoria").not().isEmpty(),
    check("url", "La url debe ser un string").isURL(),
    // validarApiDuplicado,
  ]
  //   crearApi
);

//Editar rol
router.put(
  "/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion debe ser un string").isString(),
    check("url", "La url es obligatoria").not().isEmpty(),
    check("url", "La url debe ser un string").isURL(),
  ]
  //   editarApi
);

//Desactivar rol
router.delete(
  "/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    // check("id").custom(existeApi),
  ]
  //   desactivarApi
);

router.get(
  "/activar/:id",
  [
    check("id", "La id es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").isMongoId(),
    // check("id").custom(existeApi),
  ]
  //   activarApi
);

module.exports = router;
