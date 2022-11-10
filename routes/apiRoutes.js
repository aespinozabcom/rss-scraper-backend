const { Router } = require("express");
const { check } = require("express-validator");
// const {
//   buscarRolXId,
//   listarRoles,
//   crearRol,
//   editarRol,
//   desactivarRol,
// } = require("../controllers/rolController");
// const { validarRolExiste } = require("../helpers/db-validators");
// const { validarCampos } = require("../middlewares/validar-campos");
// const { validarUsuario, validarAdmin } = require("../middlewares/validar-jwt");

const router = Router();

//Listar roles
router.get("/", (req, res) => {
  res.status(200).json({
    msg: `Funca`,
  });
});

//Buscar rol x Id
router.get("/:id", [
  //   validarUsuario,
  check("id", "El id es obligatorio").isMongoId(),
  //   check("id").custom(validarRolExiste),
  //   validarCampos,
]);

//Crear rol
router.post("/", [
  //   validarAdmin,
  check("rol", "El rol es obligatorio").not().isEmpty(),
]);

//Editar rol
router.put("/:id", [
  //   validarAdmin,
  check("id", "El id es obligatorio").isMongoId(),
  //   check("id").custom(validarRolExiste),
  check("rol", "El rol es obligatorio").not().isEmpty(),
  //   validarCampos,
]);

//Desactivar rol
router.delete("/:id", [
  //   validarAdmin,
  check("id", "El id es obligatorio").isMongoId(),
  //   check("id").custom(validarRolExiste),
  //   validarCampos,
]);

module.exports = router;
