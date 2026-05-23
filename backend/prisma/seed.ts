import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.notificacion.deleteMany();
  await prisma.documento.deleteMany();
  await prisma.examen.deleteMany();
  await prisma.cita.deleteMany();
  await prisma.solicitud.deleteMany();
  await prisma.funcionario.deleteMany();
  await prisma.paciente.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.especialidad.deleteMany();
  await prisma.centroSalud.deleteMany();

  const passwordPaciente = await bcrypt.hash("paciente123", 10);
  const passwordFuncionario = await bcrypt.hash("admin123", 10);

  const centroSalud = await prisma.centroSalud.create({
    data: {
      nombre: "CESFAM Santo Domingo",
      comuna: "Santo Domingo",
      direccion: "Av. Litoral 1234",
      activo: true,
    },
  });

  const especialidadTraumatologia = await prisma.especialidad.create({
    data: {
      nombre: "Traumatología",
      activo: true,
    },
  });

  const usuarioPaciente = await prisma.usuario.create({
    data: {
      rut: "12.345.678-9",
      nombre: "María Muñoz Pérez",
      correo: "maria.munoz@gmail.com",
      passwordHash: passwordPaciente,
      rol: "PACIENTE",
      activo: true,
      paciente: {
        create: {
          telefono: "+56 9 8765 4321",
          region: "Región de Valparaíso",
          comuna: "Santo Domingo",
          direccion: "Av. Litoral 1234",
          contactoEmergenciaNombre: "Carlos Muñoz",
          contactoEmergenciaTelefono: "+56 9 1234 5678",
        },
      },
    },
    include: {
      paciente: true,
    },
  });

  const usuarioFuncionario = await prisma.usuario.create({
    data: {
      rut: "11.111.111-1",
      nombre: "Funcionario Municipal",
      correo: "funcionario@santodomingo.cl",
      passwordHash: passwordFuncionario,
      rol: "FUNCIONARIO",
      activo: true,
      funcionario: {
        create: {
          cargo: "Administrador de Salud Municipal",
          centroSaludId: centroSalud.id,
        },
      },
    },
  });

  if (!usuarioPaciente.paciente) {
    throw new Error("No se pudo crear el paciente inicial.");
  }

  const solicitud = await prisma.solicitud.create({
    data: {
      pacienteId: usuarioPaciente.paciente.id,
      especialidadId: especialidadTraumatologia.id,
      centroSaludId: centroSalud.id,
      motivo: "Consulta traumatológica por dolor persistente.",
      estado: "EN_ESPERA",
      prioridad: "ALTA",
      diasEspera: 36,
      fechaEstimada: new Date("2026-06-20"),
    },
  });

  await prisma.cita.create({
    data: {
      pacienteId: usuarioPaciente.paciente.id,
      solicitudId: solicitud.id,
      centroSaludId: centroSalud.id,
      especialidadId: especialidadTraumatologia.id,
      fecha: new Date("2026-05-20"),
      hora: "09:30",
      box: "Box 4",
      estado: "CONFIRMADA",
    },
  });

  await prisma.examen.create({
    data: {
      pacienteId: usuarioPaciente.paciente.id,
      nombre: "Electrocardiograma",
      estado: "PENDIENTE",
      fecha: new Date("2026-05-15"),
      instrucciones: "Presentarse 15 minutos antes con cédula de identidad.",
    },
  });

  await prisma.documento.create({
    data: {
      pacienteId: usuarioPaciente.paciente.id,
      tipo: "INTERCONSULTA",
      nombre: "Interconsulta Traumatología",
      url: "https://example.com/documentos/interconsulta-traumatologia.pdf",
    },
  });

  await prisma.notificacion.createMany({
    data: [
      {
        pacienteId: usuarioPaciente.paciente.id,
        titulo: "Avance en Lista de Espera",
        mensaje:
          "Has avanzado 3 posiciones en la lista de espera de Traumatología.",
        prioridad: "ALTA",
        leida: false,
      },
      {
        pacienteId: usuarioPaciente.paciente.id,
        titulo: "Nuevo Cupo Disponible",
        mensaje: "Se ha liberado un cupo para Cardiología el 20 de Junio.",
        prioridad: "ALTA",
        leida: false,
      },
      {
        pacienteId: usuarioPaciente.paciente.id,
        titulo: "Recordatorio de Examen",
        mensaje: "Tienes un Electrocardiograma programado para el 15 de Mayo.",
        prioridad: "MEDIA",
        leida: true,
      },
    ],
  });

  console.log("Seed ejecutado correctamente.");
  console.log("Paciente:", usuarioPaciente.correo, "/ paciente123");
  console.log("Funcionario:", usuarioFuncionario.correo, "/ admin123");
}

main()
  .catch((error) => {
    console.error("Error ejecutando seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });