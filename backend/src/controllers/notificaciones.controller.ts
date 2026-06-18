import { Response } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// notificaciones del paciente autenticado
export const getMisNotificaciones = async (req: AuthRequest, res: Response) => {
  try {
    const paciente = await prisma.paciente.findUnique({
      where: { usuarioId: req.user!.userId },
    });

    if (!paciente) {
      return res.status(404).json({ ok: false, message: "Paciente no encontrado." });
    }

    const notificaciones = await prisma.notificacion.findMany({
      where: { pacienteId: paciente.id },
      orderBy: { fecha: "desc" },
    });

    return res.status(200).json({ ok: true, notificaciones });
  } catch (error) {
    console.error("Error obteniendo notificaciones:", error);
    return res.status(500).json({ ok: false, message: "Error interno del servidor." });
  }
};

const marcarLeidaSchema = z.object({ leida: z.boolean() });

// marca una notificacion como leida o no leida
export const marcarLeida = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = marcarLeidaSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
    }

    const notificacion = await prisma.notificacion.findUnique({
      where: { id: req.params.id },
    });

    if (!notificacion) {
      return res.status(404).json({ ok: false, message: "Notificacion no encontrada." });
    }

    const updated = await prisma.notificacion.update({
      where: { id: req.params.id },
      data: { leida: parsed.data.leida },
    });

    return res.status(200).json({ ok: true, notificacion: updated });
  } catch (error) {
    console.error("Error actualizando notificacion:", error);
    return res.status(500).json({ ok: false, message: "Error interno del servidor." });
  }
};
