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

  const centroMedicoMunicipal = await prisma.centroSalud.create({
    data: {
      nombre: "Centro Médico Municipal",
      comuna: "Santo Domingo",
      direccion: "Arturo Prat 850",
      activo: true,
    },
  });

  const postaElConvento = await prisma.centroSalud.create({
    data: {
      nombre: "Posta Rural El Convento",
      comuna: "Santo Domingo",
      direccion: "Camino El Convento Km 8",
      activo: true,
    },
  });

  const especialidadCardiologia = await prisma.especialidad.create({
    data: {
      nombre: "Cardiología",
      activo: true,
    },
  });

  const especialidadMedicinaGeneral = await prisma.especialidad.create({
    data: {
      nombre: "Medicina general",
      activo: true,
    },
  });

  const especialidadLaboratorio = await prisma.especialidad.create({
    data: {
      nombre: "Laboratorio",
      activo: true,
    },
  });

  const especialidadPediatria = await prisma.especialidad.create({
    data: {
      nombre: "Pediatría",
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

  const usuarioGabriel = await prisma.usuario.create({
    data: {
      rut: "22.222.222-2",
      nombre: "Gabriel Toro",
      correo: "gabriel.toro@gmail.com",
      passwordHash: passwordPaciente,
      rol: "PACIENTE",
      activo: true,
      paciente: {
        create: {
          telefono: "+56 9 2222 2222",
          region: "Región de Valparaíso",
          comuna: "Santo Domingo",
          direccion: "Los Aromos 456",
          contactoEmergenciaNombre: "Camila Toro",
          contactoEmergenciaTelefono: "+56 9 3333 3333",
        },
      },
    },
    include: {
      paciente: true,
    },
  });
  
  const pacientesExtraData = [
    {
      rut: "23.333.333-3",
      nombre: "José Osega",
      correo: "jose.osega@gmail.com",
      telefono: "+56 9 2333 3333",
      direccion: "Los Canelos 221",
      contacto: "Marcela Osega",
      contactoTelefono: "+56 9 7333 3333",
      especialidadId: especialidadCardiologia.id,
      centroSaludId: centroMedicoMunicipal.id,
      motivo: "Evaluación cardiológica por control preventivo.",
      prioridad: "ALTA" as const,
      diasEspera: 29,
      fechaEstimada: "2026-06-21",
      fechaCita: "2026-06-19",
      hora: "08:45",
      box: "Box 1",
      estadoCita: "CONFIRMADA" as const,
      examen: "Electrocardiograma de control",
    },
    {
      rut: "24.444.444-4",
      nombre: "Nicolás Matus",
      correo: "nicolas.matus@gmail.com",
      telefono: "+56 9 2444 4444",
      direccion: "Pasaje Las Rosas 102",
      contacto: "Patricia Matus",
      contactoTelefono: "+56 9 7444 4444",
      especialidadId: especialidadTraumatologia.id,
      centroSaludId: centroSalud.id,
      motivo: "Dolor de rodilla posterior a actividad física.",
      prioridad: "MEDIA" as const,
      diasEspera: 16,
      fechaEstimada: "2026-06-28",
      fechaCita: "2026-06-22",
      hora: "10:20",
      box: "Box 3",
      estadoCita: "PROGRAMADA" as const,
      examen: "Radiografía de rodilla",
    },
    {
      rut: "25.555.555-5",
      nombre: "Francisco Muñoz",
      correo: "francisco.munoz@gmail.com",
      telefono: "+56 9 2555 5555",
      direccion: "Av. Las Vertientes 340",
      contacto: "Claudia Muñoz",
      contactoTelefono: "+56 9 7555 5555",
      especialidadId: especialidadLaboratorio.id,
      centroSaludId: centroMedicoMunicipal.id,
      motivo: "Solicitud de exámenes de laboratorio general.",
      prioridad: "BAJA" as const,
      diasEspera: 8,
      fechaEstimada: "2026-06-17",
      fechaCita: "2026-06-16",
      hora: "12:00",
      box: "Box 5",
      estadoCita: "REALIZADA" as const,
      examen: "Perfil bioquímico",
    },
    {
      rut: "26.666.666-6",
      nombre: "Sandra Cano",
      correo: "sandra.cano@gmail.com",
      telefono: "+56 9 2666 6666",
      direccion: "Los Pinos 768",
      contacto: "Ricardo Cano",
      contactoTelefono: "+56 9 7666 6666",
      especialidadId: especialidadMedicinaGeneral.id,
      centroSaludId: postaElConvento.id,
      motivo: "Control médico por síntomas respiratorios leves.",
      prioridad: "MEDIA" as const,
      diasEspera: 12,
      fechaEstimada: "2026-06-24",
      fechaCita: "2026-06-20",
      hora: "14:30",
      box: "Box 2",
      estadoCita: "PROGRAMADA" as const,
      examen: "Hemograma completo",
    },
    {
      rut: "27.777.777-7",
      nombre: "Camila Fuentes",
      correo: "camila.fuentes@gmail.com",
      telefono: "+56 9 2777 7777",
      direccion: "Los Aromos 980",
      contacto: "Andrea Fuentes",
      contactoTelefono: "+56 9 7777 7777",
      especialidadId: especialidadPediatria.id,
      centroSaludId: centroSalud.id,
      motivo: "Control pediátrico y revisión de vacunas.",
      prioridad: "BAJA" as const,
      diasEspera: 6,
      fechaEstimada: "2026-06-18",
      fechaCita: "2026-06-18",
      hora: "15:15",
      box: "Box 6",
      estadoCita: "CONFIRMADA" as const,
      examen: "Control preventivo",
    },
    {
      rut: "28.888.888-8",
      nombre: "Rodrigo Araya",
      correo: "rodrigo.araya@gmail.com",
      telefono: "+56 9 2888 8888",
      direccion: "Camino Vecinal 145",
      contacto: "Javiera Araya",
      contactoTelefono: "+56 9 7888 8888",
      especialidadId: especialidadTraumatologia.id,
      centroSaludId: centroMedicoMunicipal.id,
      motivo: "Evaluación por dolor cervical persistente.",
      prioridad: "ALTA" as const,
      diasEspera: 41,
      fechaEstimada: "2026-07-02",
      fechaCita: "2026-06-26",
      hora: "09:50",
      box: "Box 4",
      estadoCita: "PROGRAMADA" as const,
      examen: "Radiografía cervical",
    },
    {
      rut: "29.999.999-9",
      nombre: "Valentina Rojas",
      correo: "valentina.rojas@gmail.com",
      telefono: "+56 9 2999 9999",
      direccion: "El Arrayán 500",
      contacto: "Sofía Rojas",
      contactoTelefono: "+56 9 7999 9999",
      especialidadId: especialidadCardiologia.id,
      centroSaludId: centroSalud.id,
      motivo: "Control por antecedentes familiares cardíacos.",
      prioridad: "MEDIA" as const,
      diasEspera: 21,
      fechaEstimada: "2026-06-29",
      fechaCita: "2026-06-24",
      hora: "16:00",
      box: "Box 1",
      estadoCita: "CONFIRMADA" as const,
      examen: "Electrocardiograma",
    },
    {
      rut: "30.111.111-1",
      nombre: "Pedro Carrasco",
      correo: "pedro.carrasco@gmail.com",
      telefono: "+56 9 3011 1111",
      direccion: "Los Maitenes 601",
      contacto: "Elena Carrasco",
      contactoTelefono: "+56 9 7011 1111",
      especialidadId: especialidadMedicinaGeneral.id,
      centroSaludId: postaElConvento.id,
      motivo: "Consulta por control de presión arterial.",
      prioridad: "MEDIA" as const,
      diasEspera: 14,
      fechaEstimada: "2026-06-23",
      fechaCita: "2026-06-21",
      hora: "11:40",
      box: "Box 3",
      estadoCita: "CANCELADA" as const,
      examen: "Control de presión arterial",
    },
    {
      rut: "31.222.222-2",
      nombre: "Daniela Vega",
      correo: "daniela.vega@gmail.com",
      telefono: "+56 9 3122 2222",
      direccion: "Av. Central 432",
      contacto: "Mauricio Vega",
      contactoTelefono: "+56 9 7122 2222",
      especialidadId: especialidadLaboratorio.id,
      centroSaludId: centroMedicoMunicipal.id,
      motivo: "Solicitud de exámenes preventivos.",
      prioridad: "BAJA" as const,
      diasEspera: 5,
      fechaEstimada: "2026-06-15",
      fechaCita: "2026-06-15",
      hora: "08:10",
      box: "Box 5",
      estadoCita: "REALIZADA" as const,
      examen: "Hemograma y perfil lipídico",
    },
    {
      rut: "32.333.333-3",
      nombre: "Matías Salazar",
      correo: "matias.salazar@gmail.com",
      telefono: "+56 9 3233 3333",
      direccion: "Pasaje Los Robles 88",
      contacto: "Carolina Salazar",
      contactoTelefono: "+56 9 7233 3333",
      especialidadId: especialidadTraumatologia.id,
      centroSaludId: centroSalud.id,
      motivo: "Evaluación por lesión de tobillo.",
      prioridad: "ALTA" as const,
      diasEspera: 33,
      fechaEstimada: "2026-07-05",
      fechaCita: "2026-06-27",
      hora: "13:25",
      box: "Box 4",
      estadoCita: "PROGRAMADA" as const,
      examen: "Radiografía de tobillo",
    },
  ];

  const pacientesExtra = await Promise.all(
    pacientesExtraData.map(async (pacienteSeed) => {
      const usuario = await prisma.usuario.create({
        data: {
          rut: pacienteSeed.rut,
          nombre: pacienteSeed.nombre,
          correo: pacienteSeed.correo,
          passwordHash: passwordPaciente,
          rol: "PACIENTE",
          activo: true,
          paciente: {
            create: {
              telefono: pacienteSeed.telefono,
              region: "Región de Valparaíso",
              comuna: "Santo Domingo",
              direccion: pacienteSeed.direccion,
              contactoEmergenciaNombre: pacienteSeed.contacto,
              contactoEmergenciaTelefono: pacienteSeed.contactoTelefono,
            },
          },
        },
        include: {
          paciente: true,
        },
      });

      if (!usuario.paciente) {
        throw new Error(`No se pudo crear el paciente ${pacienteSeed.nombre}.`);
      }

      return {
        pacienteId: usuario.paciente.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        seed: pacienteSeed,
      };
    }),
  );

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

  if (!usuarioGabriel.paciente) {
    throw new Error("No se pudo crear el paciente Gabriel Toro.");
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

  const solicitudGabriel = await prisma.solicitud.create({
    data: {
      pacienteId: usuarioGabriel.paciente.id,
      especialidadId: especialidadTraumatologia.id,
      centroSaludId: centroSalud.id,
      motivo: "Control médico por molestia lumbar y seguimiento general.",
      estado: "EN_ESPERA",
      prioridad: "MEDIA",
      diasEspera: 18,
      fechaEstimada: new Date("2026-06-25"),
    },
  });

  await prisma.cita.create({
    data: {
      pacienteId: usuarioGabriel.paciente.id,
      solicitudId: solicitudGabriel.id,
      centroSaludId: centroSalud.id,
      especialidadId: especialidadTraumatologia.id,
      fecha: new Date("2026-06-18"),
      hora: "11:15",
      box: "Box 2",
      estado: "PROGRAMADA",
    },
  });

  await prisma.examen.create({
    data: {
      pacienteId: usuarioGabriel.paciente.id,
      nombre: "Radiografía de columna",
      estado: "PENDIENTE",
      fecha: new Date("2026-06-12"),
      instrucciones: "Presentarse con cédula de identidad y orden médica.",
    },
  });

  await prisma.documento.create({
    data: {
      pacienteId: usuarioGabriel.paciente.id,
      tipo: "INTERCONSULTA",
      nombre: "Orden Radiografía Columna",
      url: "https://example.com/documentos/orden-radiografia-gabriel.pdf",
    },
  });

  await prisma.notificacion.createMany({
    data: [
      {
        pacienteId: usuarioGabriel.paciente.id,
        titulo: "Solicitud ingresada",
        mensaje:
          "Tu solicitud para Traumatología fue ingresada correctamente al sistema.",
        prioridad: "MEDIA",
        leida: false,
      },
      {
        pacienteId: usuarioGabriel.paciente.id,
        titulo: "Cita programada",
        mensaje: "Tienes una cita programada para el 18 de junio a las 11:15.",
        prioridad: "ALTA",
        leida: false,
      },
      {
        pacienteId: usuarioGabriel.paciente.id,
        titulo: "Examen pendiente",
        mensaje:
          "Recuerda revisar las instrucciones para tu radiografía de columna.",
        prioridad: "BAJA",
        leida: true,
      },
    ],
  });

  for (const pacienteExtra of pacientesExtra) {
    const solicitudExtra = await prisma.solicitud.create({
      data: {
        pacienteId: pacienteExtra.pacienteId,
        especialidadId: pacienteExtra.seed.especialidadId,
        centroSaludId: pacienteExtra.seed.centroSaludId,
        motivo: pacienteExtra.seed.motivo,
        estado:
          pacienteExtra.seed.estadoCita === "REALIZADA"
            ? "AGENDADA"
            : "EN_ESPERA",
        prioridad: pacienteExtra.seed.prioridad,
        diasEspera: pacienteExtra.seed.diasEspera,
        fechaEstimada: new Date(pacienteExtra.seed.fechaEstimada),
      },
    });

    await prisma.cita.create({
      data: {
        pacienteId: pacienteExtra.pacienteId,
        solicitudId: solicitudExtra.id,
        centroSaludId: pacienteExtra.seed.centroSaludId,
        especialidadId: pacienteExtra.seed.especialidadId,
        fecha: new Date(pacienteExtra.seed.fechaCita),
        hora: pacienteExtra.seed.hora,
        box: pacienteExtra.seed.box,
        estado: pacienteExtra.seed.estadoCita,
      },
    });

    await prisma.examen.create({
      data: {
        pacienteId: pacienteExtra.pacienteId,
        nombre: pacienteExtra.seed.examen,
        estado: "PENDIENTE",
        fecha: new Date(pacienteExtra.seed.fechaCita),
        instrucciones:
          "Presentarse con cédula de identidad y llegar 15 minutos antes de la atención.",
      },
    });

    await prisma.documento.create({
      data: {
        pacienteId: pacienteExtra.pacienteId,
        tipo: "INTERCONSULTA",
        nombre: `Interconsulta ${pacienteExtra.seed.examen}`,
        url: `https://example.com/documentos/${pacienteExtra.correo.replace(
          "@",
          "-",
        )}.pdf`,
      },
    });

    await prisma.notificacion.createMany({
      data: [
        {
          pacienteId: pacienteExtra.pacienteId,
          titulo: "Solicitud registrada",
          mensaje: `Tu solicitud fue registrada correctamente para evaluación médica.`,
          prioridad: pacienteExtra.seed.prioridad,
          leida: false,
        },
        {
          pacienteId: pacienteExtra.pacienteId,
          titulo: "Estado de cita actualizado",
          mensaje: `Tu cita quedó en estado ${pacienteExtra.seed.estadoCita.toLowerCase()} para el ${pacienteExtra.seed.fechaCita}.`,
          prioridad: "MEDIA",
          leida: false,
        },
        {
          pacienteId: pacienteExtra.pacienteId,
          titulo: "Documento disponible",
          mensaje: "Ya puedes revisar el documento asociado a tu solicitud.",
          prioridad: "BAJA",
          leida: true,
        },
      ],
    });
  }

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
  console.log("Paciente Gabriel:", usuarioGabriel.correo, "/ paciente123");
  console.log("Pacientes extra:");
  pacientesExtra.forEach((paciente) => {
    console.log(`- ${paciente.nombre}: ${paciente.correo} / paciente123`);
  });
}

main()
  .catch((error) => {
    console.error("Error ejecutando seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });