import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface TokenPayload {
  id: number;
  rol: string;
  iat?: number;
  exp?: number;
}

// ✅ Middleware general: cualquier usuario logueado
export const verificarToken = (
  req: Request & { user?: TokenPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token no provisto" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};

// ✅ Middleware solo para ADMIN
export const verificarTokenAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (decoded.rol !== "ADMIN") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};
