const conexion = require("../config/db");

// Obtener todos los empleados
const obtenerEmpleados = (req, res) => {
  const sql = "SELECT * FROM empleados ORDER BY id DESC";

  conexion.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json(error);
    }

    res.json(resultados);
  });
};

// Obtener un empleado por ID
const obtenerEmpleado = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM empleados WHERE id = ?";

  conexion.query(sql, [id], (error, resultados) => {
    if (error) {
      return res.status(500).json(error);
    }

    if (resultados.length === 0) {
      return res.status(404).json({
        mensaje: "Empleado no encontrado",
      });
    }

    res.json(resultados[0]);
  });
};

// Crear empleado
const crearEmpleado = (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, cargo, salario } = req.body;

    const sql = `
        INSERT INTO empleados
        (nombre, apellido, correo, telefono, cargo, salario)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

    conexion.query(
      sql,
      [nombre, apellido, correo, telefono, cargo, salario],
      (error, resultado) => {
        if (error) {
          console.log(error);
          return res.status(500).json(error);
        }

        res.json({
          mensaje: "Empleado creado correctamente",
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Actualizar empleado
const actualizarEmpleado = (req, res) => {
  const { id } = req.params;

  const { nombre, apellido, correo, telefono, cargo, salario, fecha_ingreso } =
    req.body;

  const sql = `
    UPDATE empleados
    SET
    nombre=?,
    apellido=?,
    correo=?,
    telefono=?,
    cargo=?,
    salario=?,
    fecha_ingreso=?
    WHERE id=?
    `;

  conexion.query(
    sql,
    [nombre, apellido, correo, telefono, cargo, salario, fecha_ingreso, id],
    (error) => {
      if (error) {
        return res.status(500).json(error);
      }

      res.json({
        mensaje: "Empleado actualizado correctamente",
      });
    },
  );
};

// Eliminar empleado
const eliminarEmpleado = (req, res) => {
  const { id } = req.params;

  conexion.query("DELETE FROM empleados WHERE id=?", [id], (error) => {
    if (error) {
      return res.status(500).json(error);
    }

    res.json({
      mensaje: "Empleado eliminado correctamente",
    });
  });
};

module.exports = {
  obtenerEmpleados,
  obtenerEmpleado,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
};
