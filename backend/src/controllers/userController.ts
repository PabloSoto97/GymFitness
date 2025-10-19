import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe)
      return res.status(400).json({ error: "El email ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);
    const usuario = await prisma.usuario.create({
      data: { nombre, email, password: hashed, rol },
    });

    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Primero: buscar si es un usuario admin
    let usuario = await prisma.usuario.findUnique({ where: { email } });

    if (usuario) {
      const esValido = await bcrypt.compare(password, usuario.password);
      if (!esValido)
        return res.status(401).json({ error: "Contraseña incorrecta" });

      const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        token,
        usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      });
    }

    // Si no es usuario, buscar si es cliente
    const cliente = await prisma.cliente.findUnique({ where: { email } });

    if (!cliente)
      return res.status(400).json({ error: "Usuario o cliente no encontrado" });

    // Verificamos que la "contraseña" sea el número de teléfono
    if (password !== cliente.telefono) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generamos token para cliente
    const token = jwt.sign({ id: cliente.id, rol: "CLIENTE" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      usuario: { id: cliente.id, nombre: cliente.nombre, rol: "CLIENTE" },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en login" });
  }
};
