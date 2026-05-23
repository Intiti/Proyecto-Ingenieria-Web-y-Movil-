import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";

import { prisma } from "../config/prisma";
import { formatRut } from "../utils/formatRut";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middlewares/auth.middleware";

const loginSchema = z.object({
  identificador: z.string().min(1, "Debes ingresar RUT o correo."),
  password: z.string().min(1, "Debes ingresar contraseña."),
});

const registerSchema = z.object({
  rut: z.string().min(7, "El RUT es obligatorio."),
  nombre: z.string().min(3, "El nombre es obligatorio."),
  correo: z.string().email("Correo electrónico inválido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
  telefono: z.string().optional(),
  region: z.string().optional(),
  comuna: z.string().optional(),
  direccion: z.string().optional(),
});

export const login = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos de ingreso inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { identificador, password } = result.data;

    const isEmail = identificador.includes("@");
    const normalizedRut = isEmail ? null : formatRut(identificador);

    const usuario = await prisma.usuario.findFirst({
      where: isEmail
        ? { correo: identificador.toLowerCase() }
        : { rut: normalizedRut ?? "" },
      include: {
        paciente: true,
        funcionario: true,
      },
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas.",
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.passwordHash);

    if (!passwordValida) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas.",
      });
    }

    const token = generateToken({
      userId: usuario.id,
      rol: usuario.rol,
    });

    return res.status(200).json({
      ok: true,
      message: "Inicio de sesión exitoso.",
      token,
      user: {
        id: usuario.id,
        rut: usuario.rut,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        pacienteId: usuario.paciente?.id ?? null,
        funcionarioId: usuario.funcionario?.id ?? null,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const registerPatient = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos de registro inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const {
      rut,
      nombre,
      correo,
      password,
      telefono,
      region,
      comuna,
      direccion,
    } = result.data;

    const rutFormateado = formatRut(rut);
    const correoNormalizado = correo.toLowerCase();

    const usuarioExistente = await prisma.usuario.findFirst({
      where: {
        OR: [{ rut: rutFormateado }, { correo: correoNormalizado }],
      },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        ok: false,
        message: "Ya existe un usuario con ese RUT o correo.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        rut: rutFormateado,
        nombre,
        correo: correoNormalizado,
        passwordHash,
        rol: "PACIENTE",
        activo: true,
        paciente: {
          create: {
            telefono,
            region,
            comuna,
            direccion,
          },
        },
      },
      include: {
        paciente: true,
      },
    });

    const token = generateToken({
      userId: nuevoUsuario.id,
      rol: nuevoUsuario.rol,
    });

    return res.status(201).json({
      ok: true,
      message: "Paciente registrado correctamente.",
      token,
      user: {
        id: nuevoUsuario.id,
        rut: nuevoUsuario.rut,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol,
        pacienteId: nuevoUsuario.paciente?.id ?? null,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado.",
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: req.user.userId,
      },
      include: {
        paciente: true,
        funcionario: {
          include: {
            centroSalud: true,
          },
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado.",
      });
    }

    return res.status(200).json({
      ok: true,
      user: {
        id: usuario.id,
        rut: usuario.rut,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        paciente: usuario.paciente,
        funcionario: usuario.funcionario,
      },
    });
  } catch (error) {
    console.error("Error en me:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor.",
    });
  }
};