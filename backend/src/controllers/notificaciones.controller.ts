import { Response } from "express";
import { z } from "zod";

import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

const getParamId = (req: AuthRequest) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return null;
  }

  return id;
};

const getPacienteAutenticado = async (req: AuthRequest) => {
  if (!req.user?.userId) {
    return null;
  }

  return prisma.paciente.findUnique({
    where: {
      usuarioId: req.user.userId,
    },
  });
};

const marcarLeidaSchema = z.object({
  leida: z.boolean().optional(),
});

export const getMisNotificaciones = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.rol !== "PACIENTE") {
      return res.status(403).json({
        ok: false,
        message: "Solo los pacientes pueden consultar sus notificaciones.",
      });
    }

    const paciente = await getPacienteAutenticado(req);

    if (!paciente) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado.",
      });
    }

    const notificaciones = await prisma.notificacion.findMany({
      where: {
        pacienteId: paciente.id,
      },
      orderBy: [
        {
          leida: "asc",
        },
        {
          fecha: "desc",
        },
      ],
      take: 50,
    });

    return res.status(200).json({
      ok: true,
      notificaciones,
    });
  } catch (error) {
    console.error("Error obteniendo notificaciones:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const marcarLeida = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.rol !== "PACIENTE") {
      return res.status(403).json({
        ok: false,
        message: "Solo los pacientes pueden modificar sus notificaciones.",
      });
    }

    const id = getParamId(req);

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "ID de notificación requerido.",
      });
    }

    const parsed = marcarLeidaSchema.safeParse(req.body ?? {});

    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const paciente = await getPacienteAutenticado(req);

    if (!paciente) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado.",
      });
    }

    const notificacion = await prisma.notificacion.findFirst({
      where: {
        id,
        pacienteId: paciente.id,
      },
    });

    if (!notificacion) {
      return res.status(404).json({
        ok: false,
        message: "Notificación no encontrada.",
      });
    }

    const updated = await prisma.notificacion.update({
      where: {
        id,
      },
      data: {
        leida: parsed.data.leida ?? true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Notificación actualizada correctamente.",
      notificacion: updated,
    });
  } catch (error) {
    console.error("Error actualizando notificación:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const eliminarNotificacion = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.rol !== "PACIENTE") {
      return res.status(403).json({
        ok: false,
        message: "Solo los pacientes pueden eliminar sus notificaciones.",
      });
    }

    const id = getParamId(req);

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "ID de notificación requerido.",
      });
    }

    const paciente = await getPacienteAutenticado(req);

    if (!paciente) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado.",
      });
    }

    const notificacion = await prisma.notificacion.findFirst({
      where: {
        id,
        pacienteId: paciente.id,
      },
    });

    if (!notificacion) {
      return res.status(404).json({
        ok: false,
        message: "Notificación no encontrada.",
      });
    }

    await prisma.notificacion.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Notificación eliminada correctamente.",
    });
  } catch (error) {
    console.error("Error eliminando notificación:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};