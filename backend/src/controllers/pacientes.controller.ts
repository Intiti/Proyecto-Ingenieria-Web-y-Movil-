import { Response } from "express";
import { z } from "zod";

import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

const updatePacienteSchema = z.object({
  telefono: z.string().optional(),
  region: z.string().optional(),
  comuna: z.string().optional(),
  direccion: z.string().optional(),
  contactoEmergenciaNombre: z.string().optional(),
  contactoEmergenciaTelefono: z.string().optional(),
});

export const getPacientes = async (_req: AuthRequest, res: Response) => {
  try {
    const pacientes = await prisma.paciente.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            rut: true,
            nombre: true,
            correo: true,
            rol: true,
            activo: true,
          },
        },
        solicitudes: {
          include: {
            especialidad: true,
            centroSalud: true,
          },
        },
        citas: {
          include: {
            especialidad: true,
            centroSalud: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      ok: true,
      pacientes,
    });
  } catch (error) {
    console.error("Error obteniendo pacientes:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const getPacienteById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const paciente = await prisma.paciente.findUnique({
      where: {
        id,
      },
      include: {
        usuario: {
          select: {
            id: true,
            rut: true,
            nombre: true,
            correo: true,
            rol: true,
            activo: true,
          },
        },
        solicitudes: {
          include: {
            especialidad: true,
            centroSalud: true,
          },
        },
        citas: {
          include: {
            especialidad: true,
            centroSalud: true,
          },
        },
        examenes: true,
        documentos: true,
        notificaciones: true,
      },
    });

    if (!paciente) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado.",
      });
    }

    return res.status(200).json({
      ok: true,
      paciente,
    });
  } catch (error) {
    console.error("Error obteniendo paciente:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const updatePaciente = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = updatePacienteSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const pacienteExiste = await prisma.paciente.findUnique({
      where: {
        id,
      },
    });

    if (!pacienteExiste) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado.",
      });
    }

    const pacienteActualizado = await prisma.paciente.update({
      where: {
        id,
      },
      data: result.data,
      include: {
        usuario: {
          select: {
            id: true,
            rut: true,
            nombre: true,
            correo: true,
            rol: true,
            activo: true,
          },
        },
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Paciente actualizado correctamente.",
      paciente: pacienteActualizado,
    });
  } catch (error) {
    console.error("Error actualizando paciente:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};