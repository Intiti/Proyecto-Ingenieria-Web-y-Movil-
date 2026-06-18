import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

type NagerHoliday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[] | null;
  launchYear?: number | null;
  types: string[];
};

type Feriado = {
  fecha: string;
  nombre: string;
  nombreLocal: string;
  pais: string;
  global: boolean;
  tipos: string[];
};

let cacheFeriados: {
  year: number;
  data: Feriado[];
  fetchedAt: number;
} | null = null;

const CACHE_DURATION_MS = 1000 * 60 * 60 * 6;

const mapHoliday = (holiday: NagerHoliday): Feriado => {
  return {
    fecha: holiday.date,
    nombre: holiday.name,
    nombreLocal: holiday.localName,
    pais: holiday.countryCode,
    global: holiday.global,
    tipos: holiday.types,
  };
};

const getCurrentChileYear = () => {
  return new Date().getFullYear();
};

const getNextHoliday = (feriados: Feriado[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    feriados.find((feriado) => {
      const feriadoDate = new Date(`${feriado.fecha}T00:00:00`);
      return feriadoDate >= today;
    }) ?? null
  );
};

export const getFeriadosChile = async (_req: AuthRequest, res: Response) => {
  try {
    const year = getCurrentChileYear();
    const now = Date.now();

    const cachedFeriados = cacheFeriados;

    const cacheIsValid =
      cachedFeriados !== null &&
      cachedFeriados.year === year &&
      now - cachedFeriados.fetchedAt < CACHE_DURATION_MS;

    if (cacheIsValid) {
      return res.status(200).json({
        ok: true,
        source: "cache",
        year,
        feriados: cachedFeriados.data,
        proximoFeriado: getNextHoliday(cachedFeriados.data),
      });
    }

    const response = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/CL`,
    );

    if (!response.ok) {
      return res.status(502).json({
        ok: false,
        message: "No se pudo consultar el servicio externo de feriados.",
      });
    }

    const externalData = (await response.json()) as NagerHoliday[];

    const feriados = externalData
      .map(mapHoliday)
      .sort((a, b) => a.fecha.localeCompare(b.fecha));

    cacheFeriados = {
      year,
      data: feriados,
      fetchedAt: now,
    };

    return res.status(200).json({
      ok: true,
      source: "external-api",
      year,
      feriados,
      proximoFeriado: getNextHoliday(feriados),
    });
  } catch (error) {
    console.error("Error consultando feriados:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno al consultar feriados.",
    });
  }
};