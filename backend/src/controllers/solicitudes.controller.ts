import { Response } from "express";
import { z } from "zod";

import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

const createSolicitudSchema = z.object({
  pacienteId: z.string().min(1, "El paciente es obligatorio."),
  especialidadId: z.string().min(1, "La especialidad es obligatoria."),
  centroSaludId: z.string().optional(),
  motivo: z.string().min(3, "El motivo debe tener al menos 3 caracteres."),
  prioridad: z.enum(["BAJA", "MEDIA", "ALTA"]).optional(),
  fechaEstimada: z.string().optional(),
});

const updateSolicitudSchema = z.object({
  especialidadId: z.string().optional(),
  centroSaludId: z.string().nullable().optional(),
  motivo: z.string().min(3).optional(),
  estado: z
    .enum(["EN_ESPERA", "AGENDADA", "FINALIZADA", "CANCELADA"])
    .optional(),
  prioridad: z.enum(["BAJA", "MEDIA", "ALTA"]).optional(),
  diasEspera: z.number().int().min(0).optional(),
  fechaEstimada: z.string().nullable().optional(),
});

export const getSolicitudes = async (_req: AuthRequest, res: Response) => {
  try {
    const solicitudes = await prisma.solicitud.findMany({
      include: {
        paciente: {
          include: {
            usuario: {
              select: {
                id: true,
                rut: true,
                nombre: true,
                correo: true,
                activo: true,
              },
            },
          },
        },
        especialidad: true,
        centroSalud: true,
        citas: true,
      },
      orderBy: [
        {
          prioridad: "desc",
        },
        {
          fechaSolicitud: "desc",
        },
      ],
    });

    return res.status(200).json({
      ok: true,
      solicitudes,
    });
  } catch (error) {
    console.error("Error obteniendo solicitudes:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const getSolicitudById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const solicitud = await prisma.solicitud.findUnique({
      where: {
        id,
      },
      include: {
        paciente: {
          include: {
            usuario: {
              select: {
                id: true,
                rut: true,
                nombre: true,
                correo: true,
                activo: true,
              },
            },
          },
        },
        especialidad: true,
        centroSalud: true,
        citas: {
          include: {
            centroSalud: true,
            especialidad: true,
          },
        },
      },
    });

    if (!solicitud) {
      return res.status(404).json({
        ok: false,
        message: "Solicitud no encontrada.",
      });
    }

    return res.status(200).json({
      ok: true,
      solicitud,
    });
  } catch (error) {
    console.error("Error obteniendo solicitud:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const createSolicitud = async (req: AuthRequest, res: Response) => {
  try {
    const result = createSolicitudSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const {
      pacienteId,
      especialidadId,
      centroSaludId,
      motivo,
      prioridad,
      fechaEstimada,
    } = result.data;

    const pacienteExiste = await prisma.paciente.findUnique({
      where: {
        id: pacienteId,
      },
    });

    if (!pacienteExiste) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado.",
      });
    }

    const especialidadExiste = await prisma.especialidad.findUnique({
      where: {
        id: especialidadId,
      },
    });

    if (!especialidadExiste) {
      return res.status(404).json({
        ok: false,
        message: "Especialidad no encontrada.",
      });
    }

    if (centroSaludId) {
      const centroExiste = await prisma.centroSalud.findUnique({
        where: {
          id: centroSaludId,
        },
      });

      if (!centroExiste) {
        return res.status(404).json({
          ok: false,
          message: "Centro de salud no encontrado.",
        });
      }
    }

    const nuevaSolicitud = await prisma.solicitud.create({
      data: {
        pacienteId,
        especialidadId,
        centroSaludId,
        motivo,
        prioridad: prioridad ?? "MEDIA",
        fechaEstimada: fechaEstimada ? new Date(fechaEstimada) : null,
      },
      include: {
        paciente: {
          include: {
            usuario: {
              select: {
                id: true,
                rut: true,
                nombre: true,
                correo: true,
              },
            },
          },
        },
        especialidad: true,
        centroSalud: true,
      },
    });

    return res.status(201).json({
      ok: true,
      message: "Solicitud creada correctamente.",
      solicitud: nuevaSolicitud,
    });
  } catch (error) {
    console.error("Error creando solicitud:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const updateSolicitud = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = updateSolicitudSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const solicitudExiste = await prisma.solicitud.findUnique({
      where: {
        id,
      },
    });

    if (!solicitudExiste) {
      return res.status(404).json({
        ok: false,
        message: "Solicitud no encontrada.",
      });
    }

    const data = result.data;

    const solicitudActualizada = await prisma.solicitud.update({
      where: {
        id,
      },
      data: {
        especialidadId: data.especialidadId,
        centroSaludId: data.centroSaludId,
        motivo: data.motivo,
        estado: data.estado,
        prioridad: data.prioridad,
        diasEspera: data.diasEspera,
        fechaEstimada:
          data.fechaEstimada === undefined
            ? undefined
            : data.fechaEstimada === null
              ? null
              : new Date(data.fechaEstimada),
      },
      include: {
        paciente: {
          include: {
            usuario: {
              select: {
                id: true,
                rut: true,
                nombre: true,
                correo: true,
              },
            },
          },
        },
        especialidad: true,
        centroSalud: true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Solicitud actualizada correctamente.",
      solicitud: solicitudActualizada,
    });
  } catch (error) {
    console.error("Error actualizando solicitud:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const deleteSolicitud = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const solicitudExiste = await prisma.solicitud.findUnique({
      where: {
        id,
      },
      include: {
        citas: true,
      },
    });

    if (!solicitudExiste) {
      return res.status(404).json({
        ok: false,
        message: "Solicitud no encontrada.",
      });
    }

    if (solicitudExiste.citas.length > 0) {
      await prisma.cita.updateMany({
        where: {
          solicitudId: id,
        },
        data: {
          solicitudId: null,
        },
      });
    }

    await prisma.solicitud.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Solicitud eliminada correctamente.",
    });
  } catch (error) {
    console.error("Error eliminando solicitud:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};