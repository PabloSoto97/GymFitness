import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Crear cliente
export const crearCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, email, telefono, fechaFin, pagado } = req.body;
    const adminId = req.user?.id;

    if (!adminId) {
      return res.status(401).json({ error: "Admin no autenticado" });
    }

    const existe = await prisma.cliente.findUnique({ where: { email } });
    if (existe)
      return res.status(400).json({ error: "El email ya está registrado" });

    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        email,
        telefono,
        fechaFin: fechaFin ? new Date(fechaFin) : undefined,
        pagado: pagado || false,
        creadoPor: adminId, // ✅ ahora siempre es number
      },
    });
    try {
      await fetch(
        "https://gymfitness-t27t.onrender.com//webhook-test/webhook-test/nuevo-cliente",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cliente),
        }
      );
    } catch (err) {
      console.error("Error enviando a n8n:", err);
    }
    return res.json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear cliente" });
  }
};

export const obtenerClientes = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    let where = {};

    const hoy = new Date();

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
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};
// Listar todos los clientes
export const listarClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { admin: { select: { id: true, nombre: true, email: true } } },
      orderBy: { id: "desc" },
    });
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Actualizar cliente (pago, fechaFin, etc.)
export const actualizarCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, fechaFin, pagado } = req.body;

    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { nombre, telefono, fechaFin, pagado },
    });

    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

// Eliminar cliente
export const eliminarCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.cliente.delete({ where: { id: Number(id) } });

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};
