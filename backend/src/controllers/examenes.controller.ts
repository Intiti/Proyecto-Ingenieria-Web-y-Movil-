import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// examenes del paciente autenticado
export const getMisExamenes = async (req: AuthRequest, res: Response) => {
  try {
    const paciente = await prisma.paciente.findUnique({
      where: { usuarioId: req.user!.userId },
    });

    if (!paciente) {
      return res.status(404).json({ ok: false, message: "Paciente no encontrado." });
    }

    const examenes = await prisma.examen.findMany({
      where: { pacienteId: paciente.id },
      orderBy: { fecha: "asc" },
    });

    return res.status(200).json({ ok: true, examenes });
  } catch (error) {
    console.error("Error obteniendo examenes:", error);
    return res.status(500).json({ ok: false, message: "Error interno del servidor." });
  }
};
