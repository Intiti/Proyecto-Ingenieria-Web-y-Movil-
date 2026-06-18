# MuniSalud - Gestión Municipal de Listas de Espera

## Integrantes

* Branco González
* Michelle Hernández
* Inti Liberona

**Asignatura:** Ingeniería Web y Móvil
**Paralelo:** 2
**Entrega:** Entrega Final

---

## Índice

* [Descripción de la entrega](#descripción-de-la-entrega)
* [1. Justificación y problema](#1-justificación-y-problema)
* [2. Usuario objetivo](#2-usuario-objetivo)
* [3. Requerimientos del sistema](#3-requerimientos-del-sistema)

  * [3.1 Requerimientos funcionales](#31-requerimientos-funcionales)
  * [3.2 Requerimientos no funcionales](#32-requerimientos-no-funcionales)
* [4. Arquitectura de navegación](#4-arquitectura-de-navegación)
* [5. Arquitectura técnica](#5-arquitectura-técnica)
* [6. Tecnologías utilizadas](#6-tecnologías-utilizadas)
* [7. Estructura del proyecto](#7-estructura-del-proyecto)
* [8. Instalación y ejecución](#8-instalación-y-ejecución)
* [9. Credenciales de prueba](#9-credenciales-de-prueba)
* [10. Funcionalidades implementadas](#10-funcionalidades-implementadas)
* [11. API REST implementada](#11-api-rest-implementada)
* [12. Base de datos](#12-base-de-datos)
* [13. Seguridad implementada](#13-seguridad-implementada)
* [14. Integración externa](#14-integración-externa)
* [15. Docker](#15-docker)
* [16. Prototipo UI/UX](#16-prototipo-uiux)
* [17. Gestión del proyecto](#17-gestión-del-proyecto)
* [18. Estado final de la entrega](#18-estado-final-de-la-entrega)

---

## Descripción de la entrega

**MuniSalud** es una aplicación web orientada a mejorar la gestión municipal de listas de espera, solicitudes médicas, agenda de atenciones, exámenes, documentos y comunicación entre pacientes y funcionarios de salud.

La entrega final incluye una solución fullstack funcional, compuesta por:

* Frontend desarrollado con Ionic + React + TypeScript.
* Backend REST desarrollado con Node.js + Express + TypeScript.
* Base de datos relacional PostgreSQL gestionada con Prisma ORM.
* Autenticación real mediante JWT.
* Contraseñas hasheadas con bcrypt.
* Validación de datos con Zod.
* Protección de rutas por rol: paciente, funcionario y administrador.
* Gestión de pacientes, solicitudes, citas, exámenes, documentos y notificaciones.
* Reportes administrativos dinámicos.
* Integración externa con API pública de feriados.
* Docker y docker-compose para despliegue local.
* Seed de datos de prueba para demostración.

---

## 1. Justificación y problema

Las listas de espera en salud pública generan incertidumbre en los pacientes, ya que muchas veces no existe visibilidad clara sobre el estado de una solicitud médica, la prioridad asignada, la fecha estimada de atención o los cambios en la agenda.

En un contexto municipal, además, los funcionarios necesitan herramientas que les permitan gestionar solicitudes, detectar casos prioritarios, coordinar citas y revisar indicadores de atención de forma rápida.

**MuniSalud** busca resolver este problema mediante una plataforma web que centraliza la información de pacientes, solicitudes médicas, agenda, notificaciones, documentos y reportes administrativos.

---

## 2. Usuario objetivo

### Paciente

Usuario que necesita consultar el estado de sus solicitudes médicas, revisar su agenda, acceder a exámenes/documentos, recibir notificaciones y mantener actualizados sus datos personales.

La interfaz para paciente prioriza:

* Claridad visual.
* Botones grandes.
* Lenguaje directo.
* Navegación simple.
* Acceso rápido a información relevante.

### Funcionario municipal / administrador

Usuario encargado de gestionar pacientes, solicitudes, listas de espera, citas médicas, reportes e indicadores del sistema.

La interfaz administrativa prioriza:

* Visualización de datos.
* Filtros por estado, centro y especialidad.
* Acciones rápidas sobre solicitudes y citas.
* Reportes de gestión.
* Identificación de casos prioritarios.

---

## 3. Requerimientos del sistema

### 3.1 Requerimientos funcionales

#### Rol Paciente

1. **Inicio de sesión paciente:**
   El paciente puede iniciar sesión con RUT y contraseña.

2. **Registro de paciente:**
   El sistema permite crear una cuenta de paciente mediante formulario de registro.

3. **Consulta de solicitudes médicas:**
   El paciente puede revisar sus solicitudes, estado, especialidad, centro asignado, prioridad y días de espera.

4. **Agenda médica:**
   El paciente puede consultar sus citas médicas, fecha, hora, centro de salud, especialidad y estado.

5. **Exámenes:**
   El paciente puede consultar exámenes pendientes o registrados, junto con instrucciones asociadas.

6. **Documentos:**
   El paciente puede acceder a documentos médicos asociados a sus solicitudes o atenciones.

7. **Notificaciones:**
   El paciente puede revisar notificaciones reales almacenadas en base de datos, marcarlas como leídas y eliminarlas.

8. **Campana de notificaciones:**
   El sistema muestra una campana con notificaciones recientes y contador de no leídas.

9. **Perfil del paciente:**
   El paciente puede consultar y actualizar sus datos personales y de contacto.

10. **Ayuda y orientación:**
    El paciente cuenta con una vista de ayuda con información de apoyo y accesos directos.

11. **Calendario de feriados:**
    El Home del paciente muestra información obtenida desde un servicio externo de feriados de Chile.

---

#### Rol Funcionario / Administrador

1. **Inicio de sesión funcionario:**
   El funcionario puede iniciar sesión con correo institucional y contraseña.

2. **Panel administrativo:**
   El funcionario accede a un dashboard con accesos rápidos a los módulos de gestión.

3. **Gestión de pacientes:**
   El funcionario puede listar pacientes, revisar información y acceder a datos asociados.

4. **Gestión de listas de espera:**
   El funcionario puede visualizar solicitudes médicas, filtrar por estado/prioridad, revisar tiempos de espera y gestionar registros.

5. **Gestión de agenda administrativa:**
   El funcionario puede visualizar citas médicas reales registradas en base de datos.

6. **Acciones sobre citas:**
   El funcionario puede confirmar citas, marcar asistencia, cancelar citas y reactivar citas canceladas.

7. **Integración de feriados en agenda:**
   La agenda administrativa consulta feriados externos y muestra advertencias si una cita coincide con un feriado.

8. **Reportes administrativos:**
   El funcionario puede revisar indicadores dinámicos desde el backend: pacientes registrados, solicitudes en espera, citas programadas, exámenes pendientes, notificaciones no leídas, especialidades más solicitadas y centros con mayor cantidad de citas.

9. **Filtros administrativos:**
   Las vistas administrativas incluyen filtros por estado, centro, especialidad o criterios visuales.

10. **Seed de datos de demostración:**
    El sistema incluye múltiples pacientes, solicitudes, citas, exámenes, documentos y notificaciones para facilitar la revisión y demostración del proyecto.

---

### 3.2 Requerimientos no funcionales

1. **Seguridad:**
   El sistema usa JWT, bcrypt, validación de roles, helmet, CORS, rate limiting y sanitización de entradas.

2. **Usabilidad:**
   La interfaz utiliza lenguaje simple, estructura visual clara y componentes accesibles.

3. **Rendimiento:**
   Las vistas consumen endpoints específicos y usan estados de carga/error para mejorar la experiencia.

4. **Mantenibilidad:**
   El frontend está organizado por features y el backend separa controladores, rutas, middlewares, utilidades y configuración.

5. **Escalabilidad:**
   La arquitectura permite agregar nuevos módulos como integración con Google Calendar, correo real, recuperación de contraseña y despliegue en nube.

6. **Portabilidad:**
   El proyecto puede ejecutarse localmente con PostgreSQL instalado o mediante Docker Compose.

---

## 4. Arquitectura de navegación

La aplicación se divide en tres grupos:

* Rutas públicas.
* Rutas de paciente.
* Rutas administrativas.

### 4.1 Rutas públicas

| Ruta                    | Descripción                                |
| ----------------------- | ------------------------------------------ |
| `/login`                | Inicio de sesión del paciente              |
| `/crear-cuenta`         | Registro de nuevo paciente                 |
| `/recuperar-contrasena` | Flujo visual de recuperación de contraseña |
| `/admin/login`          | Inicio de sesión funcionario               |

### 4.2 Rutas del paciente

| Ruta              | Descripción                    |
| ----------------- | ------------------------------ |
| `/home`           | Inicio del paciente            |
| `/solicitudes`    | Solicitudes y listas de espera |
| `/agenda`         | Agenda médica del paciente     |
| `/examenes`       | Exámenes médicos               |
| `/documentos`     | Documentos asociados           |
| `/notificaciones` | Centro de notificaciones       |
| `/perfil`         | Perfil y datos personales      |
| `/ayuda`          | Ayuda y orientación            |

### 4.3 Rutas administrativas

| Ruta               | Descripción                    |
| ------------------ | ------------------------------ |
| `/admin/dashboard` | Panel principal administrativo |
| `/admin/pacientes` | Gestión de pacientes           |
| `/admin/listas`    | Gestión de listas de espera    |
| `/admin/agenda`    | Gestión de agenda médica       |
| `/admin/reportes`  | Reportes administrativos       |

### 4.4 Protección por roles

El sistema diferencia los accesos mediante roles:

* `PACIENTE`
* `FUNCIONARIO`
* `ADMIN`

En frontend se validan rutas protegidas contra `/api/auth/me`.

En backend se utilizan middlewares:

* `authRequired`
* `roleRequired`

Las rutas administrativas requieren rol `FUNCIONARIO` o `ADMIN`.

---

## 5. Arquitectura técnica

### Frontend

Aplicación desarrollada con Ionic + React + TypeScript. Consume la API REST mediante un servicio centralizado (`api.ts`) y maneja autenticación mediante almacenamiento local del token.

Características principales:

* Rutas públicas y protegidas.
* Componentes compartidos.
* Menús diferenciados por rol.
* Campana de notificaciones.
* Vistas por feature.
* Consumo real de endpoints del backend.
* Manejo de estados de carga, error y éxito.

### Backend

API REST desarrollada con Express + TypeScript. Se encarga de:

* Autenticación.
* Autorización por rol.
* Validación de inputs.
* Sanitización de datos.
* Gestión de pacientes, solicitudes, citas, exámenes, documentos, notificaciones, reportes y servicios externos.
* Comunicación con PostgreSQL mediante Prisma.

### Base de datos

Base de datos PostgreSQL modelada con Prisma ORM. Incluye migraciones y seed.

---

## 6. Tecnologías utilizadas

### Frontend

* Ionic
* React
* TypeScript
* React Router
* Vite
* CSS
* Ionicons

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* bcrypt
* Zod
* helmet
* express-rate-limit
* CORS
* dotenv

### Infraestructura

* Docker
* Docker Compose
* Nginx

### Herramientas

* Git
* GitHub
* Visual Studio Code
* pgAdmin
* Prisma Studio
* Insomnia / Thunder Client

---

## 7. Estructura del proyecto

```txt
Proyecto-Ingenieria-Web-y-Movil-/
  backend/
    prisma/
      migrations/
      schema.prisma
      seed.ts
    src/
      config/
        prisma.ts
      controllers/
        auth.controller.ts
        pacientes.controller.ts
        solicitudes.controller.ts
        citas.controller.ts
        examenes.controller.ts
        notificaciones.controller.ts
        servicios.controller.ts
        reportes.controller.ts
      middlewares/
        auth.middleware.ts
        sanitize.middleware.ts
      routes/
        auth.routes.ts
        pacientes.routes.ts
        solicitudes.routes.ts
        citas.routes.ts
        examenes.routes.ts
        notificaciones.routes.ts
        servicios.routes.ts
        reportes.routes.ts
      utils/
        formatRut.ts
        jwt.ts
      app.ts
      server.ts
    Dockerfile
    docker-entrypoint.sh
    .env.example
    package.json
    tsconfig.json

  src/
    core/
      presentation/
        components/
          AppMenu.tsx
          NotificationBell.tsx
          PatientMenu.tsx
          ProtectedRoute.tsx
        hooks/
          useRevealOnScroll.ts
      theme/
        app-theme.css

    features/
      auth/
        presentation/
          screens/
            Login.tsx
            Register.tsx
            ForgotPassword.tsx
            AdminLogin.tsx
      paciente/
        presentation/
          screens/
            Home.tsx
            Solicitudes.tsx
            Agenda.tsx
            Examenes.tsx
            Documents.tsx
            Notifications.tsx
            Perfil.tsx
            Ayuda.tsx
      admin/
        presentation/
          screens/
            AdminDashboard.tsx
            AdminPacientes.tsx
            AdminListas.tsx
            AdminAgenda.tsx
            AdminReportes.tsx

    services/
      api.ts
      authService.ts

    App.tsx
    main.tsx

  Dockerfile
  docker-compose.yml
  nginx.conf
  .env.example
  package.json
```

---

## 8. Instalación y ejecución

### 8.1 Requisitos previos

* Git
* Node.js
* npm
* PostgreSQL
* pgAdmin o cliente PostgreSQL
* Docker Desktop, opcional
* Visual Studio Code

---

### 8.2 Clonar repositorio

```bash
git clone https://github.com/Intiti/Proyecto-Ingenieria-Web-y-Movil-.git
cd Proyecto-Ingenieria-Web-y-Movil-
```

---

### 8.3 Instalación frontend

Desde la raíz del proyecto:

```bash
npm install
```

Crear `.env` en la raíz si corresponde:

```env
VITE_API_URL=http://localhost:4000/api
```

Ejecutar frontend:

```bash
npm run dev
```

Disponible en:

```txt
http://localhost:5173
```

---

### 8.4 Instalación backend

Entrar a la carpeta backend:

```bash
cd backend
npm install
```

Crear archivo `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/munisalud?schema=public"
JWT_SECRET="munisalud_secret_desarrollo"
PORT=4000
CORS_ORIGIN="http://localhost:5173"
```

Aplicar migraciones:

```bash
npx prisma migrate dev
```

Generar cliente Prisma:

```bash
npx prisma generate
```

Cargar datos de prueba:

```bash
npx prisma db seed
```

Ejecutar backend:

```bash
npm run dev
```

API disponible en:

```txt
http://localhost:4000/api
```

Health check:

```txt
http://localhost:4000/api/health
```

---

### 8.5 Ejecución local simultánea

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
npm run dev
```

---

## 9. Credenciales de prueba

Las credenciales se cargan mediante `backend/prisma/seed.ts`.

### Funcionario

```txt
Correo: funcionario@santodomingo.cl
Contraseña: admin123
```

### Paciente principal

```txt
RUT: 12.345.678-9
Correo: maria.munoz@gmail.com
Contraseña: paciente123
```

### Pacientes adicionales

```txt
gabriel.toro@gmail.com / paciente123
jose.osega@gmail.com / paciente123
nicolas.matus@gmail.com / paciente123
francisco.munoz@gmail.com / paciente123
sandra.cano@gmail.com / paciente123
camila.fuentes@gmail.com / paciente123
rodrigo.araya@gmail.com / paciente123
valentina.rojas@gmail.com / paciente123
pedro.carrasco@gmail.com / paciente123
daniela.vega@gmail.com / paciente123
matias.salazar@gmail.com / paciente123
```

El paciente principal también puede ingresar con RUT sin puntos ni guion:

```txt
123456789
```

---

## 10. Funcionalidades implementadas

### 10.1 Autenticación

* Login de paciente por RUT.
* Login de funcionario por correo.
* Registro de paciente.
* Validación de credenciales en backend.
* Redirección diferenciada según rol.
* Corrección de navegación para evitar bloqueo por cache de Ionic.
* Logout con limpieza de sesión.

### 10.2 Paciente

* Home del paciente con accesos rápidos.
* Consulta de solicitudes médicas.
* Agenda médica personal.
* Exámenes.
* Documentos.
* Centro de notificaciones conectado al backend.
* Campana de notificaciones real.
* Perfil editable.
* Ayuda y orientación.
* Visualización del próximo feriado desde API externa.

### 10.3 Funcionario

* Dashboard administrativo.
* Gestión de pacientes.
* Gestión de listas de espera.
* Agenda administrativa conectada al backend.
* Acciones reales sobre citas:

  * Confirmar.
  * Marcar asistencia.
  * Cancelar.
  * Reactivar cita cancelada.
* Reportes administrativos dinámicos.
* Visualización de feriados en agenda administrativa.

### 10.4 Seed de demostración

El seed crea:

* Centros de salud.
* Especialidades.
* Funcionario.
* Múltiples pacientes.
* Solicitudes médicas.
* Citas con distintos estados.
* Exámenes.
* Documentos.
* Notificaciones leídas y no leídas.

Esto permite que la demo tenga información visible en agenda, reportes, listas de espera y notificaciones.

---

## 11. API REST implementada

### 11.1 Autenticación

| Método | Ruta                 | Descripción                 | Acceso      |
| ------ | -------------------- | --------------------------- | ----------- |
| GET    | `/api/health`        | Verifica estado de API      | Público     |
| POST   | `/api/auth/login`    | Inicia sesión               | Público     |
| POST   | `/api/auth/register` | Registra paciente           | Público     |
| GET    | `/api/auth/me`       | Retorna usuario autenticado | Autenticado |

### 11.2 Pacientes

| Método | Ruta                 | Descripción                 | Acceso            |
| ------ | -------------------- | --------------------------- | ----------------- |
| GET    | `/api/pacientes`     | Lista pacientes             | Funcionario/Admin |
| GET    | `/api/pacientes/:id` | Obtiene paciente            | Autenticado       |
| PUT    | `/api/pacientes/:id` | Actualiza datos de paciente | Autenticado       |

### 11.3 Solicitudes

| Método | Ruta                               | Descripción                    | Acceso            |
| ------ | ---------------------------------- | ------------------------------ | ----------------- |
| GET    | `/api/solicitudes`                 | Lista solicitudes              | Funcionario/Admin |
| GET    | `/api/solicitudes/mis-solicitudes` | Lista solicitudes del paciente | Paciente          |
| GET    | `/api/solicitudes/:id`             | Obtiene detalle de solicitud   | Autenticado       |
| POST   | `/api/solicitudes`                 | Crea solicitud médica          | Funcionario/Admin |
| PATCH  | `/api/solicitudes/:id`             | Actualiza solicitud            | Funcionario/Admin |
| DELETE | `/api/solicitudes/:id`             | Elimina solicitud              | Funcionario/Admin |

### 11.4 Citas

| Método | Ruta                   | Descripción                          | Acceso            |
| ------ | ---------------------- | ------------------------------------ | ----------------- |
| GET    | `/api/citas`           | Lista todas las citas                | Funcionario/Admin |
| GET    | `/api/citas/mis-citas` | Lista citas del paciente autenticado | Paciente          |
| GET    | `/api/citas/:id`       | Obtiene detalle de cita              | Autenticado       |
| POST   | `/api/citas`           | Crea cita médica                     | Funcionario/Admin |
| PATCH  | `/api/citas/:id`       | Actualiza cita                       | Funcionario/Admin |
| DELETE | `/api/citas/:id`       | Elimina cita                         | Funcionario/Admin |

### 11.5 Exámenes

| Método | Ruta                         | Descripción                 | Acceso      |
| ------ | ---------------------------- | --------------------------- | ----------- |
| GET    | `/api/examenes`              | Lista exámenes              | Autenticado |
| GET    | `/api/examenes/mis-examenes` | Lista exámenes del paciente | Paciente    |

### 11.6 Notificaciones

| Método | Ruta                                     | Descripción                       | Acceso   |
| ------ | ---------------------------------------- | --------------------------------- | -------- |
| GET    | `/api/notificaciones/mis-notificaciones` | Lista notificaciones del paciente | Paciente |
| PATCH  | `/api/notificaciones/:id/leida`          | Marca notificación como leída     | Paciente |
| DELETE | `/api/notificaciones/:id`                | Elimina notificación              | Paciente |

### 11.7 Servicios externos

| Método | Ruta                      | Descripción                                  | Acceso      |
| ------ | ------------------------- | -------------------------------------------- | ----------- |
| GET    | `/api/servicios/feriados` | Consulta feriados de Chile desde API externa | Autenticado |

### 11.8 Reportes

| Método | Ruta                    | Descripción                             | Acceso            |
| ------ | ----------------------- | --------------------------------------- | ----------------- |
| GET    | `/api/reportes/resumen` | Retorna KPIs y rankings administrativos | Funcionario/Admin |

---

## 12. Base de datos

La base de datos se modela con Prisma ORM sobre PostgreSQL.

### Entidades principales

* Usuario
* Paciente
* Funcionario
* CentroSalud
* Especialidad
* Solicitud
* Cita
* Examen
* Documento
* Notificacion

### Relaciones principales

* Un usuario puede tener perfil de paciente o funcionario.
* Un paciente puede tener muchas solicitudes.
* Un paciente puede tener muchas citas.
* Un paciente puede tener muchos exámenes.
* Un paciente puede tener muchos documentos.
* Un paciente puede tener muchas notificaciones.
* Una solicitud pertenece a una especialidad y a un centro de salud.
* Una cita pertenece a un paciente, centro de salud y especialidad.
* Una cita puede estar asociada a una solicitud.
* Un funcionario pertenece a un centro de salud.

### Estados principales

#### Solicitud

* `EN_ESPERA`
* `AGENDADA`
* `ATENDIDA`
* `CANCELADA`

#### Cita

* `PROGRAMADA`
* `CONFIRMADA`
* `REALIZADA`
* `CANCELADA`

#### Prioridad

* `BAJA`
* `MEDIA`
* `ALTA`

---

## 13. Seguridad implementada

| Mecanismo          | Descripción                                                         |
| ------------------ | ------------------------------------------------------------------- |
| JWT                | Token de autenticación para rutas protegidas.                       |
| bcrypt             | Hash seguro de contraseñas.                                         |
| Zod                | Validación de datos de entrada.                                     |
| Prisma ORM         | Consultas parametrizadas para prevenir inyección SQL.               |
| helmet             | Headers HTTP seguros.                                               |
| express-rate-limit | Límite global de solicitudes y límite específico en login/register. |
| CORS               | Orígenes permitidos mediante variable de entorno.                   |
| Sanitización XSS   | Middleware para reducir riesgo de inyección de contenido malicioso. |
| Rutas protegidas   | Validación de token y rol antes de acceder a recursos.              |
| Control de acceso  | Pacientes solo pueden acceder a sus propios datos.                  |

---

## 14. Integración externa

El proyecto incorpora una integración con una API externa de feriados.

### Endpoint interno

```txt
GET /api/servicios/feriados
```

### Uso en el sistema

* El Home del paciente muestra el próximo feriado.
* La agenda administrativa muestra el próximo feriado.
* Si una cita coincide con un feriado, la interfaz muestra una advertencia.

### Justificación

En un sistema de salud municipal, los feriados son relevantes para la planificación de atenciones, disponibilidad de centros y coordinación de citas.


---
## 13. Integración con servicio externo

MuniSalud integra la API pública Nager.Date para la consulta de feriados nacionales de Chile en tiempo real. Esta integración es pertinente al dominio del sistema dado que los feriados afectan directamente la disponibilidad de citas médicas y el funcionamiento de los centros de salud de la comuna.

Servicio integrado

CampoDetalleAPINager.Date Public Holiday APIEndpointhttps://date.nager.at/api/v3/PublicHolidays/{year}/CLTipoAPI REST pública, sin autenticación requeridaUsoConsulta de feriados nacionales chilenos para el año en curso

Endpoint expuesto

MétodoRutaDescripciónAccesoGET/api/servicios/feriadosRetorna los feriados nacionales del año actual y el próximo feriadoAutenticado

Ejemplo de respuesta

json{
  "ok": true,
  "source": "external-api",
  "year": 2026,
  "proximoFeriado": {
    "fecha": "2026-06-29",
    "nombre": "Saints Peter and Paul",
    "nombreLocal": "San Pedro y San Pablo",
    "pais": "CL",
    "global": true,
    "tipos": ["Public"]
  },
  "feriados": [
    {
      "fecha": "2026-01-01",
      "nombre": "New Year's Day",
      "nombreLocal": "Año Nuevo",
      "pais": "CL",
      "global": true,
      "tipos": ["Public"]
    }
  ]
}

Implementación técnica

La integración implementa un sistema de caché en memoria con duración de 6 horas (CACHE_DURATION_MS = 6 * 60 * 60 * 1000) para evitar llamadas innecesarias al servicio externo en cada solicitud. La respuesta indica si los datos provienen de la API externa (source: "external-api") o del caché local (source: "cache").

El manejo de errores contempla dos escenarios: fallo del servicio externo (responde con HTTP 502) y error interno del servidor (responde con HTTP 500), en ambos casos con mensajes descriptivos sin exponer detalles internos.

La ruta está protegida con el middleware authRequired, por lo que solo usuarios autenticados (pacientes o funcionarios) pueden consultarla.

Justificación

El calendario de feriados impacta directamente la operación del sistema: permite al funcionario identificar días no hábiles al gestionar la agenda, evitar agendar citas en fechas inapropiadas y ofrecer al paciente información contextual sobre posibles interrupciones del servicio. La API Nager.Date es mantenida activamente, cubre Chile con datos precisos y no requiere registro ni credenciales, lo que simplifica la gestión de secretos en el entorno de producción.


---

## 15. Docker

El proyecto incluye configuración Docker para levantar:

* Frontend.
* Backend.
* PostgreSQL.

### Variables de entorno raíz

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=munisalud
JWT_SECRET=munisalud_secret_desarrollo
RUN_SEED=true
VITE_API_URL=http://localhost:4000/api
CORS_ORIGIN=http://localhost:8080
```

### Levantar proyecto con Docker

```bash
docker-compose up --build
```

Servicios:

| Servicio   | URL                         |
| ---------- | --------------------------- |
| Frontend   | `http://localhost:8080`     |
| Backend    | `http://localhost:4000/api` |
| PostgreSQL | `localhost:5432`            |

Detener servicios:

```bash
docker-compose down
```

Eliminar volumen de base de datos:

```bash
docker-compose down -v
```

---

## 16. Prototipo UI/UX

Prototipo trabajado para las vistas principales de paciente y funcionario:

```txt
https://www.figma.com/proto/VZNDjyapyVvHnXxJKnnw4h/MuniSalud?node-id=26-99&p=f&t=CVmV1LAhO5alpUCW-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=26%3A99
```

---

## 17. Gestión del proyecto

El proyecto se gestiona mediante GitHub.

Prácticas utilizadas:

* Ramas por funcionalidad.
* Commits descriptivos.
* Pull Requests.
* Resolución de conflictos.
* Integración progresiva de módulos.
* Separación entre frontend, backend y base de datos.
* Seed de demostración para pruebas.

---

## 18. Estado final de la entrega

Estado actual:

* Frontend implementado con Ionic + React + TypeScript.
* Backend implementado con Node.js + Express + TypeScript.
* Base de datos PostgreSQL con Prisma ORM.
* Migraciones y seed disponibles.
* Login paciente y funcionario funcional.
* Registro de paciente funcional.
* Rutas protegidas por token.
* Diferenciación por rol.
* Gestión de pacientes.
* Gestión de solicitudes.
* Gestión de citas.
* Exámenes y documentos visibles desde datos del sistema.
* Notificaciones conectadas a backend.
* Campana de notificaciones conectada.
* Agenda administrativa con acciones reales.
* Reportes administrativos dinámicos.
* Integración externa de feriados.
* Seguridad avanzada implementada.
* Docker configurado.
* README actualizado para entrega final.

---