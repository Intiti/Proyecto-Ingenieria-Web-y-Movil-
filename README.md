# MuniSalud - Gestión de Listas de Espera

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
* [2. Análisis del usuario objetivo](#2-análisis-del-usuario-objetivo)
* [3. Requerimientos del sistema](#3-requerimientos-del-sistema)
  * [3.1 Requerimientos funcionales](#31-requerimientos-funcionales)
  * [3.2 Requerimientos no funcionales](#32-requerimientos-no-funcionales)
* [4. Arquitectura de navegación](#4-arquitectura-de-navegación)
* [5. Arquitectura técnica](#5-arquitectura-técnica)
* [6. Tecnologías utilizadas](#6-tecnologías-utilizadas)
* [7. Estructura del proyecto](#7-estructura-del-proyecto)
* [8. Instalación y ejecución](#8-instalación-y-ejecución)
* [9. Credenciales de prueba](#9-credenciales-de-prueba)
* [10. API REST implementada](#10-api-rest-implementada)
* [11. Base de datos](#11-base-de-datos)
* [12. Seguridad implementada](#12-seguridad-implementada)
* [13. Prototipo UI/UX](#13-prototipo-uiux)
* [14. Material complementario](#14-material-complementario)
* [15. Gestión del proyecto](#15-gestión-del-proyecto)
* [16. Estado de la entrega](#16-estado-de-la-entrega)

---

## Descripción de la entrega

Esta es la entrega final del proyecto **MuniSalud**, una aplicación orientada a mejorar la gestión de listas de espera y la comunicación entre pacientes y funcionarios municipales de salud.

En esta entrega final se presenta:

* Frontend navegable para paciente y funcionario.
* Backend con API REST completa.
* Base de datos relacional en PostgreSQL.
* Autenticación real mediante JWT con validación en backend.
* Seguridad avanzada: helmet, rate limiting, sanitización XSS, CORS configurado por entorno.
* Integración frontend-backend en las vistas principales.
* Despliegue local completo mediante Docker y docker-compose.
* Evidencias de pruebas con Insomnia.

---

## 1. Justificación y problema

En Chile, las listas de espera en el área de salud representan un problema estructural del sistema público. En muchos casos, el paciente recibe una interconsulta o solicitud médica y luego pierde visibilidad sobre el estado de su proceso, su prioridad, los tiempos estimados o la disponibilidad de atención.

Este problema es especialmente relevante en comunas con alta densidad poblacional y recursos limitados. La Municipalidad de Santo Domingo busca mejorar la gestión sanitaria de sus habitantes mediante herramientas digitales que acerquen los servicios de salud a la comunidad de manera accesible y cómoda.

El proyecto MuniSalud nace como respuesta a esa necesidad, desarrollado específicamente para el contexto de la red de salud municipal de Santo Domingo. La plataforma permite al paciente consultar su estado de atención, revisar su agenda médica, recibir notificaciones, acceder a documentos y mantener actualizados sus datos personales.

Desde el punto de vista administrativo, la aplicación busca apoyar a los funcionarios del CESFAM y centros de salud de la comuna en la gestión de pacientes, listas de espera, agenda médica y reportes para la toma de decisiones.

---

## 2. Análisis del usuario objetivo

### Paciente

Usuario que necesita consultar su lugar en la lista de espera, revisar próximas citas, acceder a documentos médicos, recibir notificaciones y mantener actualizados sus datos de contacto.

El diseño considera una interfaz clara, con botones visibles, jerarquía visual simple y lenguaje directo, pensando en usuarios con distintos niveles de familiaridad tecnológica.

### Funcionario municipal / administrador

Usuario encargado de revisar pacientes, gestionar listas de espera, coordinar agenda médica, detectar casos prioritarios y consultar reportes administrativos para apoyar la gestión del sistema de salud municipal.

---

## 3. Requerimientos del sistema

### 3.1 Requerimientos funcionales

#### Rol Paciente

1. **Inicio de sesión:**
   El paciente puede iniciar sesión mediante RUT y contraseña registrados en la base de datos.

2. **Consulta de lista de espera:**
   El sistema permite al paciente consultar el estado de sus solicitudes médicas, prioridad, centro asignado y última actualización.

3. **Agenda médica:**
   El paciente puede revisar sus próximas citas médicas, horarios, lugar de atención e historial reciente.

4. **Exámenes:**
   El paciente puede consultar exámenes pendientes, en proceso o completados, incluyendo instrucciones y estado de avance.

5. **Documentos:**
   El paciente puede acceder a documentos asociados a su atención, tales como recetas, licencias médicas o resultados de exámenes.

6. **Notificaciones:**
   El sistema muestra alertas sobre cambios en listas de espera, nuevos cupos, recordatorios de exámenes y avisos relevantes.

7. **Perfil del paciente:**
   El paciente puede revisar y actualizar datos personales de contacto, como correo, teléfono, dirección y contacto de emergencia.

8. **Ayuda y orientación:**
   El paciente puede acceder a preguntas frecuentes, canales de contacto y accesos directos a secciones importantes del sistema.

#### Rol Funcionario

9. **Inicio de sesión funcionario:**
   El funcionario puede iniciar sesión mediante correo institucional y contraseña.

10. **Gestión de pacientes:**
    El funcionario puede listar pacientes, consultar información detallada y actualizar datos asociados.

11. **Gestión de listas de espera:**
    El funcionario puede visualizar solicitudes, crear nuevas solicitudes, actualizar estados, modificar prioridades y eliminar registros de prueba.

12. **Agenda administrativa:**
    El funcionario puede consultar, crear, actualizar y eliminar citas médicas.

13. **Reportes administrativos:**
    El funcionario puede consultar indicadores sobre pacientes registrados, solicitudes en espera, citas programadas, especialidades más solicitadas y centros con mayor demanda.

---

### 3.2 Requerimientos no funcionales

1. **Seguridad:**
   El sistema considera autenticación mediante JWT con validación en backend, contraseñas hasheadas con bcrypt, rate limiting, sanitización XSS, headers seguros con helmet y CORS configurado por variable de entorno.

2. **Usabilidad:**
   La interfaz debe ser clara, legible y accesible, considerando usuarios con distintos niveles de experiencia digital. Se priorizan botones grandes, textos claros y navegación simple.

3. **Rendimiento:**
   La aplicación debe cargar sus vistas principales de manera fluida y permitir una navegación rápida entre módulos.

4. **Escalabilidad:**
   La estructura del frontend y backend está organizada por módulos para facilitar la incorporación futura de nuevas funcionalidades, rutas protegidas, servicios y consumo de API.

5. **Mantenibilidad:**
   El backend separa rutas, controladores, middlewares, utilidades y configuración, permitiendo una mejor organización del código.

---

## 4. Arquitectura de navegación

La aplicación se estructura en tres grupos principales de rutas:

* Rutas públicas.
* Rutas del paciente.
* Rutas del funcionario.

### 4.1 Rutas públicas

| Ruta                    | Descripción                      |
| ----------------------- | -------------------------------- |
| `/login`                | Inicio de sesión del paciente    |
| `/crear-cuenta`         | Registro de paciente             |
| `/recuperar-contrasena` | Recuperación de contraseña       |
| `/admin/login`          | Inicio de sesión del funcionario |

### 4.2 Rutas del paciente

| Ruta              | Descripción                   |
| ----------------- | ----------------------------- |
| `/home`           | Panel principal del paciente  |
| `/solicitudes`    | Consulta de lista de espera   |
| `/agenda`         | Agenda médica del paciente    |
| `/examenes`       | Estado de exámenes            |
| `/documentos`     | Documentos médicos            |
| `/notificaciones` | Centro de notificaciones      |
| `/perfil`         | Datos personales del paciente |
| `/ayuda`          | Ayuda y orientación           |

### 4.3 Rutas del funcionario

| Ruta               | Descripción                     |
| ------------------ | ------------------------------- |
| `/admin/dashboard` | Panel principal del funcionario |
| `/admin/pacientes` | Gestión de pacientes            |
| `/admin/listas`    | Gestión de listas de espera     |
| `/admin/agenda`    | Agenda administrativa           |
| `/admin/reportes`  | Reportes administrativos        |

### 4.4 Diferenciación por roles

La aplicación contempla dos roles principales:

* **Paciente:** accede a módulos de consulta, seguimiento y autogestión.
* **Funcionario:** accede a módulos de gestión, administración y reportes.

La diferenciación por roles se implementa tanto en frontend como en backend:

* En frontend se utilizan rutas protegidas que validan el token contra el backend en cada navegación.
* En backend se utilizan middlewares de autenticación y autorización.
* Las rutas administrativas requieren rol `FUNCIONARIO` o `ADMIN`.
* Las rutas del paciente requieren rol `PACIENTE`.

---

## 5. Arquitectura técnica

El sistema se organiza en tres capas:

### Frontend

Aplicación web desarrollada con Ionic + React + TypeScript. Se encarga de presentar las vistas del sistema, administrar la navegación y consumir la API REST del backend. En producción se sirve mediante Nginx dentro de un contenedor Docker.

### Backend

API REST desarrollada con Node.js, Express y TypeScript. Se encarga de procesar solicitudes, validar datos, autenticar usuarios, aplicar reglas de autorización y comunicarse con la base de datos mediante Prisma ORM.

### Base de datos

Base de datos relacional PostgreSQL, modelada con Prisma. En el entorno Docker se levanta como un servicio independiente con volumen persistente.

---

## 6. Tecnologías utilizadas

### Frontend

* Ionic
* React
* TypeScript
* React Router
* CSS modular
* Vite
* Nginx (producción / Docker)

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
* docker-compose
* Nginx

### Herramientas de desarrollo

* Git / GitHub
* Insomnia
* Prisma Studio
* Visual Studio Code
* pgAdmin

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
      middlewares/
        auth.middleware.ts
        sanitize.middleware.ts
      routes/
        auth.routes.ts
        pacientes.routes.ts
        solicitudes.routes.ts
        citas.routes.ts
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
    components/
      AppMenu.tsx
      NotificationBell.tsx
      PatientMenu.tsx
      ProtectedRoute.tsx
    pages/
      auth/
        Login.tsx
        Register.tsx
        ForgotPassword.tsx
        AdminLogin.tsx
      patient/
        Home.tsx
        Solicitudes.tsx
        Agenda.tsx
        Examenes.tsx
        Documents.tsx
        Notifications.tsx
        Perfil.tsx
        Ayuda.tsx
      admin/
        AdminDashboard.tsx
        AdminPacientes.tsx
        AdminListas.tsx
        AdminAgenda.tsx
        AdminReportes.tsx
    services/
      api.ts
      authService.ts
    theme/
      app-theme.css
    App.tsx

  otros/
    EP1.4_Arquitectura_Navegacion_Experiencia_Usuario_MuniSalud.pdf
    EP2_Pruebas_API/
      01_health.jpeg
      ...
      19_get_misSolicitudes.png

  Dockerfile
  docker-compose.yml
  nginx.conf
  .env.example
```

---

## 8. Instalación y ejecución

### 8.1 Requisitos previos

* Git
* Node.js y npm
* PostgreSQL (ejecución local)
* Docker y Docker Compose (ejecución con Docker)
* Visual Studio Code

---

### 8.2 Clonar el repositorio

```bash
git clone https://github.com/Intiti/Proyecto-Ingenieria-Web-y-Movil-.git
cd Proyecto-Ingenieria-Web-y-Movil-
```

---

### 8.3 Ejecución local (sin Docker)

#### Frontend

```bash
npm install
npm run dev
```

Disponible en: `http://localhost:5173`

#### Backend

```bash
cd backend
npm install
```

Crear `backend/.env` basado en `backend/.env.example`:

```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/munisalud_db?schema=public"
JWT_SECRET="munisalud_secret_desarrollo"
PORT=4000
CORS_ORIGIN="http://localhost:5173"
```

```bash
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

API disponible en: `http://localhost:4000/api`

---

### 8.4 Ejecución con Docker

#### Requisitos

* Docker Desktop instalado y corriendo.

#### Pasos

Crear `.env` en la raíz del proyecto basado en `.env.example`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=munisalud_db
JWT_SECRET=munisalud_secret_desarrollo
RUN_SEED=true
VITE_API_URL=http://localhost:4000/api
CORS_ORIGIN=http://localhost:8080
```

Levantar todos los servicios:

```bash
docker-compose up --build
```

| Servicio  | URL                          |
| --------- | ---------------------------- |
| Frontend  | http://localhost:8080        |
| Backend   | http://localhost:4000/api    |
| PostgreSQL| localhost:5432               |

El backend aplica migraciones y seed automáticamente al iniciar.

Para detener:

```bash
docker-compose down
```

Para eliminar también el volumen de la base de datos:

```bash
docker-compose down -v
```

---

### 8.5 Ejecución local simultánea (sin Docker)

Terminal 1 — backend:

```bash
cd backend
npm run dev
```

Terminal 2 — frontend:

```bash
npm run dev
```

---

## 9. Credenciales de prueba

Cargadas mediante el seed de Prisma.

### Paciente

```txt
RUT: 12.345.678-9
Contraseña: paciente123
```

El RUT también puede ingresarse sin puntos ni guion: `123456789`

### Funcionario

```txt
Correo: funcionario@santodomingo.cl
Contraseña: admin123
```

---

## 10. API REST implementada

### 10.1 Autenticación

| Método | Ruta                 | Descripción                                | Acceso      |
| ------ | -------------------- | ------------------------------------------ | ----------- |
| GET    | `/api/health`        | Verifica estado de la API                  | Público     |
| POST   | `/api/auth/login`    | Inicio de sesión de paciente o funcionario | Público     |
| POST   | `/api/auth/register` | Registro de paciente                       | Público     |
| GET    | `/api/auth/me`       | Retorna usuario autenticado                | Autenticado |

### 10.2 Pacientes

| Método | Ruta                 | Descripción                 | Acceso            |
| ------ | -------------------- | --------------------------- | ----------------- |
| GET    | `/api/pacientes`     | Lista pacientes registrados | Funcionario/Admin |
| GET    | `/api/pacientes/:id` | Obtiene detalle de paciente | Autenticado       |
| PUT    | `/api/pacientes/:id` | Actualiza datos de paciente | Autenticado       |

### 10.3 Solicitudes / Listas de espera

| Método | Ruta                               | Descripción                                      | Acceso            |
| ------ | ---------------------------------- | ------------------------------------------------ | ----------------- |
| GET    | `/api/solicitudes`                 | Lista todas las solicitudes                      | Funcionario/Admin |
| GET    | `/api/solicitudes/mis-solicitudes` | Lista solicitudes del paciente autenticado       | Paciente          |
| GET    | `/api/solicitudes/:id`             | Obtiene detalle de una solicitud                 | Autenticado       |
| POST   | `/api/solicitudes`                 | Crea una solicitud médica                        | Funcionario/Admin |
| PATCH  | `/api/solicitudes/:id`             | Actualiza estado, prioridad o datos de solicitud | Funcionario/Admin |
| DELETE | `/api/solicitudes/:id`             | Elimina solicitud                                | Funcionario/Admin |

### 10.4 Citas

| Método | Ruta                   | Descripción                          | Acceso            |
| ------ | ---------------------- | ------------------------------------ | ----------------- |
| GET    | `/api/citas`           | Lista todas las citas                | Funcionario/Admin |
| GET    | `/api/citas/mis-citas` | Lista citas del paciente autenticado | Paciente          |
| GET    | `/api/citas/:id`       | Obtiene detalle de una cita          | Autenticado       |
| POST   | `/api/citas`           | Crea una cita médica                 | Funcionario/Admin |
| PATCH  | `/api/citas/:id`       | Actualiza datos de cita              | Funcionario/Admin |
| DELETE | `/api/citas/:id`       | Elimina cita                         | Funcionario/Admin |

---

## 11. Base de datos

Modelada con Prisma ORM sobre PostgreSQL.

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

* Un usuario puede tener perfil de paciente o de funcionario.
* Un paciente puede tener muchas solicitudes y muchas citas.
* Una solicitud pertenece a una especialidad y puede estar asociada a un centro de salud.
* Una cita pertenece a un paciente, centro de salud y especialidad, y puede estar asociada a una solicitud.

---

## 12. Seguridad implementada

| Mecanismo             | Descripción                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| JWT                   | Tokens con expiración de 2 horas. Validados en backend en cada ruta protegida. |
| bcrypt                | Hash de contraseñas con salt 10.                                            |
| helmet                | Cabeceras HTTP seguras (XSS protection, nosniff, frameguard, etc.).         |
| express-rate-limit    | Límite global de 100 req/15min. Límite estricto de 10 req/15min en `/auth`. |
| Sanitización XSS      | Middleware que escapa caracteres peligrosos en body y params.               |
| CORS                  | Configurado mediante variable de entorno `CORS_ORIGIN`.                     |
| Prisma ORM            | Previene inyección SQL mediante queries parametrizados.                     |
| Zod                   | Validación de schema en todos los inputs de la API.                         |
| Rutas protegidas      | Frontend valida el token contra `/api/auth/me` en cada ruta protegida.      |

---

## 13. Prototipo UI/UX

[Prototipo MuniSalud en Figma](https://www.figma.com/proto/VZNDjyapyVvHnXxJKnnw4h/MuniSalud?node-id=26-99&p=f&t=CVmV1LAhO5alpUCW-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=26%3A99)

El prototipo considera pantallas para los roles de paciente y funcionario municipal, en versión web y móvil.

---

## 14. Material complementario

```txt
otros/
  EP1.4_Arquitectura_Navegacion_Experiencia_Usuario_MuniSalud.pdf
  EP2_Pruebas_API/
    01_health.jpeg
    02_login_paciente.jpeg
    03_login_funcionario.jpeg
    04_auth_me.jpeg
    05_get_pacientes.jpeg
    06_get_paciente_ID.jpeg
    07_put_paciente.jpeg
    08_get_solicitudes.jpeg
    09_get_solicitud_ID.jpeg
    10_post_solicitud.jpeg
    11_patch_solicitud.jpeg
    12_get_citas.jpeg
    13_get_cita_ID.jpeg
    14_post_cita.jpeg
    15_patch_cita.jpeg
    16_delete_cita.jpeg
    17_delete_solicitud.jpeg
    18_get_misCitas.png
    19_get_misSolicitudes.png
```

---

## 15. Gestión del proyecto

El proyecto se gestiona mediante GitHub con las siguientes prácticas:

* Commits descriptivos.
* Ramas de trabajo por funcionalidad.
* Pull Requests para integración de cambios.
* Issues para organización de tareas.
* GitHub Projects para seguimiento del avance.

---

## 16. Estado de la entrega

* Frontend desarrollado con Ionic + React + TypeScript.
* Rutas protegidas con validación de token contra backend.
* Backend con Node.js + Express + TypeScript.
* API REST con endpoints GET, POST, PUT/PATCH y DELETE.
* Base de datos PostgreSQL con Prisma ORM.
* Migraciones y seed incluidos.
* Autenticación JWT con diferenciación por roles.
* Hash de contraseñas con bcrypt.
* Validación de inputs con Zod.
* Seguridad avanzada: helmet, rate limiting, sanitización XSS, CORS por entorno.
* Integración frontend-backend en login, lista de espera, agenda, gestión de pacientes y listas.
* Despliegue local con Docker y docker-compose (frontend + backend + PostgreSQL).
* Evidencias de pruebas con Insomnia.
* Documentación técnica actualizada.

---


