import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import {
  registrarUsuario,
  loginUsuario,
} from "./controllers/userController.js";
import userRoutes from "./routes/userRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

// 🔹 CORS CONFIGURADO
app.use(
  cors({
    origin: [
      "http://localhost:5173", // desarrollo local
      "https://fitnessgirl.vercel.app", // ⚠️ reemplazá con tu dominio de Vercel exacto
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/usuarios", userRoutes);
app.use("/api/clientes", clienteRoutes);
app.post("/api/registro", registrarUsuario);
app.post("/api/login", loginUsuario);

const PORT = process.env.PORT || 4000;

// 🔹 INICIO
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado a la base de datos correctamente.");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error conectando a la base de datos:", err);
    process.exit(1);
  }
}

startServer();
