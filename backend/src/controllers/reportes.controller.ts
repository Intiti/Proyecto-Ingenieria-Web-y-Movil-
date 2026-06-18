import { Response } from "express";

import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

const isStaff = (req: AuthRequest) => {
  return req.user?.rol === "FUNCIONARIO" || req.user?.rol === "ADMIN";
};

const contarPorNombre = (items: string[]) => {
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([nombre, total]) => ({ nombre, total }))
    .sort((a, b) => b.total - a.total);
};

export const getResumenReportes = async (req: AuthRequest, res: Response) => {
  try {
    if (!isStaff(req)) {
      return res.status(403).json({
        ok: false,
        message: "No tienes permisos para consultar reportes administrativos.",
      });
    }

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const [
      totalPacientes,
      totalSolicitudes,
      solicitudesEnEspera,
      solicitudesAltaPrioridad,
      citasProgramadas,
      citasProximos7Dias,
      examenesPendientes,
      notificacionesNoLeidas,
      solicitudesEspecialidad,
      citasCentro,
    ] = await Promise.all([
      prisma.paciente.count(),

      prisma.solicitud.count(),

      prisma.solicitud.count({
        where: {
          estado: "EN_ESPERA",
        },
      }),

      prisma.solicitud.count({
        where: {
          prioridad: "ALTA",
        },
      }),

      prisma.cita.count({
        where: {
          estado: {
            in: ["PROGRAMADA", "CONFIRMADA"],
          },
        },
      }),

      prisma.cita.count({
        where: {
          fecha: {
            gte: today,
            lte: nextWeek,
          },
          estado: {
            in: ["PROGRAMADA", "CONFIRMADA"],
          },
        },
      }),

      prisma.examen.count({
        where: {
          estado: "PENDIENTE",
        },
      }),

      prisma.notificacion.count({
        where: {
          leida: false,
        },
      }),

      prisma.solicitud.findMany({
        select: {
          especialidad: {
            select: {
              nombre: true,
            },
          },
        },
        take: 500,
      }),

      prisma.cita.findMany({
        select: {
          centroSalud: {
            select: {
              nombre: true,
            },
          },
        },
        take: 500,
      }),
    ]);

    const especialidadesMasSolicitadas = contarPorNombre(
      solicitudesEspecialidad.map((solicitud) => solicitud.especialidad.nombre),
    ).slice(0, 5);

    const centrosConMasCitas = contarPorNombre(
      citasCentro.map((cita) => cita.centroSalud.nombre),
    ).slice(0, 5);

    return res.status(200).json({
      ok: true,
      resumen: {
        totalPacientes,
        totalSolicitudes,
        solicitudesEnEspera,
        solicitudesAltaPrioridad,
        citasProgramadas,
        citasProximos7Dias,
        examenesPendientes,
        notificacionesNoLeidas,
      },
      rankings: {
        especialidadesMasSolicitadas,
        centrosConMasCitas,
      },
    });
  } catch (error) {
    console.error("Error generando reportes:", error);

    return res.status(500).json({
      ok: false,
      message: "No se pudieron generar los reportes administrativos.",
    });
  }
};