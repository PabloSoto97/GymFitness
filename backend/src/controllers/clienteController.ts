import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// ✅ Crear cliente
export const crearCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, email, telefono, fechaFin, pagado, fechaInicio } = req.body;
    const adminId = req.user?.id; // viene del middleware de autenticación

    if (!adminId) {
      return res.status(401).json({ error: "Admin no autenticado" });
    }

    // Verificar si el cliente ya existe por email
    const existe = await prisma.cliente.findFirst({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Crear cliente
    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        email,
        telefono,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : new Date(), // 👈 si no viene, toma fecha actual
        fechaFin: fechaFin ? new Date(fechaFin) : new Date(),
        pagado: pagado || false,
        notificado: false, // 👈 siempre arranca como no notificado
        creadoPor: Number(adminId),
      },
    });

    // Enviar al webhook de n8n
    try {
      await fetch(
        "https://n8n-deploy-959l.onrender.com/webhook-test/nuevo-cliente",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cliente),
        }
      );
    } catch (err) {
      console.error("⚠️ Error enviando a n8n:", err);
    }

    return res.json(cliente);
  } catch (error) {
    console.error("❌ Error al crear cliente:", error);
    return res.status(500).json({ error: "Error al crear cliente" });
  }
};

// ✅ Obtener clientes con filtros (ultimos14, ultimos30, vencen3)
export const obtenerClientes = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    const hoy = new Date();
    let where: any = {};

    if (filter === "ultimos14") {
      const desde = new Date();
      desde.setDate(hoy.getDate() - 14);
      where = { fechaInicio: { gte: desde } };
    }

    if (filter === "ultimos30") {
      const desde = new Date();
      desde.setDate(hoy.getDate() - 30);
      where = { fechaInicio: { gte: desde } };
    }

    if (filter === "vencen3") {
      const hasta = new Date();
      hasta.setDate(hoy.getDate() + 3);
      where = { fechaFin: { lte: hasta } };
    }

    const clientes = await prisma.cliente.findMany({
      where,
      orderBy: { fechaInicio: "desc" },
    });

    res.json(clientes);
  } catch (error) {
    console.error("❌ Error al obtener clientes:", error);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};

// ✅ Listar todos los clientes
export const listarClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { admin: { select: { id: true, nombre: true, email: true } } },
      orderBy: { id: "desc" },
    });
    res.json(clientes);
  } catch (error) {
    console.error("❌ Error al listar clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// ✅ Actualizar cliente
export const actualizarCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Si se marca como pagado, reiniciamos notificado
    if (data.pagado === true) {
      data.notificado = false;
    }

    const clienteActualizado = await prisma.cliente.update({
      where: { id: Number(id) },
      data,
    });

    res.json(clienteActualizado);
  } catch (error) {
    console.error("❌ Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

// ✅ Eliminar cliente
export const eliminarCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.cliente.delete({ where: { id: Number(id) } });

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};
