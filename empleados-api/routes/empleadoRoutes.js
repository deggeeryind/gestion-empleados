const verificarToken = require("../middlerware/authMiddleware.js");
const express = require("express");

const router = express.Router();

const {
    obtenerEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
} = require("../controllers/empleadoControllers.js");

router.get("/", obtenerEmpleados);

router.get("/:id", obtenerEmpleado);

router.post("/", crearEmpleado);

router.put("/:id", actualizarEmpleado);

router.delete("/:id", eliminarEmpleado);

module.exports = router;