import { Response } from "express";
import { z } from "zod";

import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

const createCitaSchema = z.object({
  pacienteId: z.string().min(1, "El paciente es obligatorio."),
  solicitudId: z.string().nullable().optional(),
  centroSaludId: z.string().min(1, "El centro de salud es obligatorio."),
  especialidadId: z.string().min(1, "La especialidad es obligatoria."),
  fecha: z.string().min(1, "La fecha es obligatoria."),
  hora: z.string().min(1, "La hora es obligatoria."),
  box: z.string().optional(),
  estado: z
    .enum(["PROGRAMADA", "CONFIRMADA", "REALIZADA", "CANCELADA"])
    .optional(),
});

const updateCitaSchema = z.object({
  solicitudId: z.string().nullable().optional(),
  centroSaludId: z.string().optional(),
  especialidadId: z.string().optional(),
  fecha: z.string().optional(),
  hora: z.string().optional(),
  box: z.string().nullable().optional(),
  estado: z
    .enum(["PROGRAMADA", "CONFIRMADA", "REALIZADA", "CANCELADA"])
    .optional(),
});

const getParamId = (req: AuthRequest) => {
  const rawId = req.params.id;

  if (!rawId || Array.isArray(rawId)) {
    return null;
  }

  return rawId;
};

// citas del paciente autenticado
export const getMisCitas = async (req: AuthRequest, res: Response) => {
  try {
    const paciente = await prisma.paciente.findUnique({
      where: { usuarioId: req.user!.userId },
    });

    if (!paciente) {
      return res.status(404).json({ ok: false, message: "Perfil de paciente no encontrado." });
    }

    const citas = await prisma.cita.findMany({
      where: { pacienteId: paciente.id },
      include: {
        centroSalud: true,
        especialidad: true,
        solicitud: true,
      },
      orderBy: { fecha: "asc" },
    });

    return res.status(200).json({ ok: true, citas });
  } catch (error) {
    console.error("Error obteniendo mis citas:", error);
    return res.status(500).json({ ok: false, message: "Error interno del servidor." });
  }
};

export const getCitas = async (_req: AuthRequest, res: Response) => {
  try {
    const citas = await prisma.cita.findMany({
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
        solicitud: true,
        centroSalud: true,
        especialidad: true,
      },
      orderBy: {
        fecha: "asc",
      },
    });

    return res.status(200).json({
      ok: true,
      citas,
    });
  } catch (error) {
    console.error("Error obteniendo citas:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const getCitaById = async (req: AuthRequest, res: Response) => {
  try {
    const id = getParamId(req);

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "ID de cita inválido.",
      });
    }

    const cita = await prisma.cita.findUnique({
      where: { id },
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
        solicitud: true,
        centroSalud: true,
        especialidad: true,
      },
    });

    if (!cita) {
      return res.status(404).json({
        ok: false,
        message: "Cita no encontrada.",
      });
    }

    return res.status(200).json({
      ok: true,
      cita,
    });
  } catch (error) {
    console.error("Error obteniendo cita:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const createCita = async (req: AuthRequest, res: Response) => {
  try {
    const result = createCitaSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const {
      pacienteId,
      solicitudId,
      centroSaludId,
      especialidadId,
      fecha,
      hora,
      box,
      estado,
    } = result.data;

    const pacienteExiste = await prisma.paciente.findUnique({
      where: { id: pacienteId },
    });

    if (!pacienteExiste) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado.",
      });
    }

    const centroExiste = await prisma.centroSalud.findUnique({
      where: { id: centroSaludId },
    });

    if (!centroExiste) {
      return res.status(404).json({
        ok: false,
        message: "Centro de salud no encontrado.",
      });
    }

    const especialidadExiste = await prisma.especialidad.findUnique({
      where: { id: especialidadId },
    });

    if (!especialidadExiste) {
      return res.status(404).json({
        ok: false,
        message: "Especialidad no encontrada.",
      });
    }

    if (solicitudId) {
      const solicitudExiste = await prisma.solicitud.findUnique({
        where: { id: solicitudId },
      });

      if (!solicitudExiste) {
        return res.status(404).json({
          ok: false,
          message: "Solicitud no encontrada.",
        });
      }
    }

    const nuevaCita = await prisma.cita.create({
      data: {
        pacienteId,
        solicitudId: solicitudId ?? null,
        centroSaludId,
        especialidadId,
        fecha: new Date(fecha),
        hora,
        box,
        estado: estado ?? "PROGRAMADA",
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
        solicitud: true,
        centroSalud: true,
        especialidad: true,
      },
    });

    if (solicitudId) {
      await prisma.solicitud.update({
        where: { id: solicitudId },
        data: {
          estado: "AGENDADA",
        },
      });
    }

    return res.status(201).json({
      ok: true,
      message: "Cita creada correctamente.",
      cita: nuevaCita,
    });
  } catch (error) {
    console.error("Error creando cita:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const updateCita = async (req: AuthRequest, res: Response) => {
  try {
    const id = getParamId(req);

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "ID de cita inválido.",
      });
    }

    const result = updateCitaSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const citaExiste = await prisma.cita.findUnique({
      where: { id },
    });

    if (!citaExiste) {
      return res.status(404).json({
        ok: false,
        message: "Cita no encontrada.",
      });
    }

    const data = result.data;

    const citaActualizada = await prisma.cita.update({
      where: { id },
      data: {
        solicitudId: data.solicitudId,
        centroSaludId: data.centroSaludId,
        especialidadId: data.especialidadId,
        fecha: data.fecha ? new Date(data.fecha) : undefined,
        hora: data.hora,
        box: data.box,
        estado: data.estado,
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
        solicitud: true,
        centroSalud: true,
        especialidad: true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Cita actualizada correctamente.",
      cita: citaActualizada,
    });
  } catch (error) {
    console.error("Error actualizando cita:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const deleteCita = async (req: AuthRequest, res: Response) => {
  try {
    const id = getParamId(req);

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "ID de cita inválido.",
      });
    }

    const citaExiste = await prisma.cita.findUnique({
      where: { id },
    });

    if (!citaExiste) {
      return res.status(404).json({
        ok: false,
        message: "Cita no encontrada.",
      });
    }

    await prisma.cita.delete({
      where: { id },
    });

    return res.status(200).json({
      ok: true,
      message: "Cita eliminada correctamente.",
    });
  } catch (error) {
    console.error("Error eliminando cita:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};