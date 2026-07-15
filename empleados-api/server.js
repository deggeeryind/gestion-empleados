require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

require("./config/db");

const empleadoRoutes = require("./routes/empleadoRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/empleados", empleadoRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API Gestión de Empleados funcionando correctamente"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});