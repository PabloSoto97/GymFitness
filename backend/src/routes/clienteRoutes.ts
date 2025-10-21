import { Router } from "express";
import {
  crearCliente,
  listarClientes,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/clienteController.js";
import { verificarTokenAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/", verificarTokenAdmin, crearCliente);
router.get("/", listarClientes);
router.put("/:id", actualizarCliente);
router.delete("/:id", verificarTokenAdmin, eliminarCliente);

export default router;
