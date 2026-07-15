const conexion = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar usuario
const registrar = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;

    try {

        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios(nombre, correo, password, rol)
            VALUES(?,?,?,?)
        `;

        conexion.query(
            sql,
            [nombre, correo, passwordHash, rol],
            (error, resultado) => {

                if (error) {
                    return res.status(500).json(error);
                }

                res.status(201).json({
                    mensaje: "Usuario registrado correctamente"
                });

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};

// Login
const login = (req, res) => {

    const { correo, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo=?";

    conexion.query(sql, [correo], async (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultado.length === 0) {

            return res.status(401).json({
                mensaje: "Correo incorrecto"
            });

        }

        const usuario = resultado[0];

        const coincide = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!coincide) {

            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });

        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        res.json({

            mensaje: "Login exitoso",

            token,

            usuario: {

                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol

            }

        });

    });

};

module.exports = {
    registrar,
    login
};