# MuniSalud - Gestión de Listas de Espera

## Integrantes

* Branco González
* Michelle Hernández
* Inti Liberona

**Asignatura:** Ingeniería Web y Móvil
**Paralelo:** 2
**Entrega:** Entrega Parcial 2 - Backend, API REST e integración inicial

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
* [12. Prototipo UI/UX](#12-prototipo-uiux)
* [13. Material complementario](#13-material-complementario)
* [14. Gestión del proyecto](#14-gestión-del-proyecto)
* [15. Estado de la entrega](#15-estado-de-la-entrega)
* [16. Consideraciones y trabajo futuro](#16-consideraciones-y-trabajo-futuro)

---

## Descripción de la entrega

Esta entrega corresponde a la segunda etapa del proyecto **MuniSalud**, una aplicación orientada a mejorar la gestión de listas de espera y la comunicación entre pacientes y funcionarios municipales de salud.

En esta Entrega Parcial 2 se mantiene el frontend navegable construido en Ionic + React y se incorpora un backend funcional con Node.js, Express, TypeScript, PostgreSQL y Prisma ORM.

En esta etapa se presenta:

* Frontend navegable para paciente y funcionario.
* Backend con API REST.
* Base de datos relacional en PostgreSQL.
* Modelado de entidades con Prisma.
* Migraciones de base de datos.
* Seed con datos iniciales de prueba.
* Autenticación real mediante JWT.
* Hash de contraseñas con bcrypt.
* Validación de datos con Zod.
* Middleware de autenticación.
* Middleware de autorización por roles.
* Endpoints protegidos para pacientes, solicitudes y citas.
* Integración frontend-backend para inicio de sesión, lista de espera, agenda, gestión de pacientes y gestión de listas de espera.
* Evidencias de pruebas realizadas con Insomnia.

---

## 1. Justificación y problema

En Chile, las listas de espera en el área de salud representan un problema estructural del sistema público. En muchos casos, el paciente recibe una interconsulta o solicitud médica y luego pierde visibilidad sobre el estado de su proceso, su prioridad, los tiempos estimados o la disponibilidad de atención.

El proyecto **MuniSalud** busca reducir esa incertidumbre mediante una plataforma que permita al paciente consultar su estado de atención, revisar su agenda médica, recibir notificaciones, acceder a documentos y mantener actualizados sus datos personales.

Desde el punto de vista administrativo, la aplicación busca apoyar a funcionarios municipales o de centros de salud en la gestión de pacientes, listas de espera, agenda médica y reportes para la toma de decisiones.

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
   El sistema considera autenticación mediante JWT, contraseñas hasheadas con bcrypt y acceso diferenciado por roles.

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

En esta entrega, la diferenciación por roles se implementa tanto en frontend como en backend:

* En frontend se utilizan rutas protegidas mediante validación del token y rol guardado.
* En backend se utilizan middlewares de autenticación y autorización.
* Las rutas administrativas requieren rol `FUNCIONARIO` o `ADMIN`.
* Las rutas del paciente requieren rol `PACIENTE`.

---

## 5. Arquitectura técnica

El sistema se organiza en dos capas principales:

### Frontend

Aplicación web desarrollada con Ionic + React + TypeScript. Se encarga de presentar las vistas del sistema, administrar la navegación y consumir la API REST del backend.

### Backend

API REST desarrollada con Node.js, Express y TypeScript. Se encarga de procesar solicitudes, validar datos, autenticar usuarios, aplicar reglas de autorización y comunicarse con la base de datos mediante Prisma ORM.

### Base de datos

Base de datos relacional PostgreSQL, modelada con Prisma. Permite almacenar usuarios, pacientes, funcionarios, centros de salud, especialidades, solicitudes, citas, exámenes, documentos y notificaciones.

---

## 6. Tecnologías utilizadas

### Frontend

* Ionic
* React
* TypeScript
* React Router
* CSS modular
* Vite
* LocalStorage para persistencia temporal del token

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* bcrypt
* Zod
* CORS
* dotenv

### Herramientas de desarrollo

* Git
* GitHub
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

    .env.example
    package.json
    tsconfig.json

  src/
    components/
      AppMenu.tsx
      AppMenu.css
      NotificationBell.tsx
      NotificationBell.css
      PatientMenu.tsx
      PatientMenu.css
      ProtectedRoute.tsx

    pages/
      auth/
        Login.tsx
        Login.css
        Register.tsx
        Register.css
        ForgotPassword.tsx
        ForgotPassword.css
        AdminLogin.tsx
        AdminLogin.css

      patient/
        Home.tsx
        Home.css
        Solicitudes.tsx
        Solicitudes.css
        Agenda.tsx
        Agenda.css
        Examenes.tsx
        Examenes.css
        Documents.tsx
        Documents.css
        Notifications.tsx
        Notifications.css
        Perfil.tsx
        Perfil.css
        Ayuda.tsx
        Ayuda.css

      admin/
        AdminDashboard.tsx
        AdminDashboard.css
        AdminPacientes.tsx
        AdminPacientes.css
        AdminListas.tsx
        AdminListas.css
        AdminAgenda.tsx
        AdminAgenda.css
        AdminReportes.tsx
        AdminReportes.css

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

## 8. Instalación y ejecución

Esta sección describe el procedimiento completo para descargar, instalar y ejecutar el proyecto **MuniSalud** en un entorno local.

### 8.1 Requisitos previos

Para ejecutar el proyecto correctamente, se debe contar con las siguientes herramientas instaladas:

* Git
* Node.js
* npm
* PostgreSQL
* pgAdmin o herramienta equivalente para administrar PostgreSQL
* Visual Studio Code

Para verificar Node.js y npm:

```bash
node -v
npm -v
```

---

### 8.2 Clonar el repositorio

```bash
git clone https://github.com/Intiti/Proyecto-Ingenieria-Web-y-Movil-.git
```

Ingresar a la carpeta del proyecto:

```bash
cd Proyecto-Ingenieria-Web-y-Movil-
```

---

### 8.3 Instalación del frontend

Desde la raíz del proyecto:

```bash
npm install
```

Ejecutar frontend:

```bash
npm run dev
```

La aplicación queda disponible en:

```txt
http://localhost:5173
```

Compilar frontend:

```bash
npm run build
```

---

### 8.4 Instalación del backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` tomando como referencia `.env.example`:

```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/munisalud_db?schema=public"
JWT_SECRET="munisalud_secret_desarrollo"
PORT=4000
```

Reemplazar `TU_PASSWORD` por la contraseña de PostgreSQL configurada en la instalación local.

Ejecutar migraciones de Prisma:

```bash
npx prisma migrate dev
```

Ejecutar seed con datos iniciales:

```bash
npm run prisma:seed
```

Ejecutar backend:

```bash
npm run dev
```

La API queda disponible en:

```txt
http://localhost:4000/api
```

Compilar backend:

```bash
npm run build
```

---

### 8.5 Ejecución simultánea

Para ejecutar el sistema completo se deben utilizar dos terminales.

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend

```bash
npm run dev
```

---

## 9. Credenciales de prueba

Las credenciales se encuentran cargadas mediante el seed de Prisma.

### Paciente

```txt
RUT: 12.345.678-9
Contraseña: paciente123
```

También se puede ingresar el RUT sin puntos ni guion:

```txt
123456789
```

El sistema lo formatea automáticamente como:

```txt
12.345.678-9
```

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

| Método | Ruta                                | Descripción                                      | Acceso            |
| ------ | ----------------------------------- | ------------------------------------------------ | ----------------- |
| GET    | `/api/solicitudes`                  | Lista todas las solicitudes médicas              | Funcionario/Admin |
| GET    | `/api/solicitudes/mis-solicitudes`  | Lista solicitudes del paciente autenticado       | Paciente          |
| GET    | `/api/solicitudes/:id`              | Obtiene detalle de una solicitud                 | Autenticado       |
| POST   | `/api/solicitudes`                  | Crea una solicitud médica                        | Funcionario/Admin |
| PATCH  | `/api/solicitudes/:id`              | Actualiza estado, prioridad o datos de solicitud | Funcionario/Admin |
| DELETE | `/api/solicitudes/:id`              | Elimina solicitud de prueba                      | Funcionario/Admin |

### 10.4 Citas

| Método | Ruta                  | Descripción                             | Acceso            |
| ------ | --------------------- | --------------------------------------- | ----------------- |
| GET    | `/api/citas`          | Lista todas las citas médicas           | Funcionario/Admin |
| GET    | `/api/citas/mis-citas`| Lista citas del paciente autenticado    | Paciente          |
| GET    | `/api/citas/:id`      | Obtiene detalle de una cita             | Autenticado       |
| POST   | `/api/citas`          | Crea una cita médica                    | Funcionario/Admin |
| PATCH  | `/api/citas/:id`      | Actualiza datos de cita                 | Funcionario/Admin |
| DELETE | `/api/citas/:id`      | Elimina cita de prueba                  | Funcionario/Admin |

---

## 11. Base de datos

La base de datos fue modelada con Prisma ORM y PostgreSQL.

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

* Un usuario puede tener perfil de paciente.
* Un usuario puede tener perfil de funcionario.
* Un paciente puede tener muchas solicitudes.
* Un paciente puede tener muchas citas.
* Una solicitud pertenece a una especialidad.
* Una solicitud puede estar asociada a un centro de salud.
* Una cita pertenece a un paciente, centro de salud y especialidad.
* Una cita puede estar asociada a una solicitud.

---

## 12. Prototipo UI/UX

El prototipo UI/UX del proyecto se encuentra disponible en Figma:

[Prototipo MuniSalud en Figma](https://www.figma.com/proto/VZNDjyapyVvHnXxJKnnw4h/MuniSalud?node-id=26-99&p=f&t=CVmV1LAhO5alpUCW-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=26%3A99)

El prototipo considera pantallas para los roles de paciente y funcionario municipal, contemplando vistas en formato web y móvil. Las pantallas fueron diseñadas considerando jerarquía visual, navegación clara, componentes de interacción y coherencia entre las funcionalidades principales del sistema.

---

## 13. Material complementario

Los documentos y evidencias complementarias se encuentran en la carpeta `/otros`.

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

La carpeta `EP2_Pruebas_API` contiene evidencias de pruebas realizadas con Insomnia para validar los endpoints de la API REST, incluyendo los endpoints de solicitudes y citas filtrados por paciente autenticado.

---

## 14. Gestión del proyecto

El proyecto se gestiona mediante GitHub, aplicando buenas prácticas de control de versiones y organización del trabajo colaborativo.

Durante el desarrollo se utilizaron las siguientes prácticas:

* Commits descriptivos.
* Ramas de trabajo para funcionalidades y refactorizaciones.
* Pull Requests para revisión e integración de cambios.
* Issues para organización de tareas.
* GitHub Projects para seguimiento del avance.
* Separación de frontend y backend.
* Evidencias de pruebas en carpeta complementaria.

---

## 15. Estado de la entrega

En esta Entrega Parcial 2 se incluye:

* Frontend desarrollado con Ionic + React.
* Aplicación navegable mediante React Router.
* Separación de rutas según rol de usuario.
* Rutas protegidas en frontend.
* Backend desarrollado con Node.js + Express + TypeScript.
* API REST funcional.
* Base de datos PostgreSQL.
* Modelos relacionales con Prisma.
* Migraciones de base de datos.
* Seed con datos de prueba.
* Autenticación con JWT.
* Hash de contraseñas con bcrypt.
* Validación de datos con Zod.
* Middleware de autenticación.
* Middleware de autorización por roles.
* Endpoints para autenticación.
* Endpoints para pacientes.
* Endpoints para solicitudes/listas de espera (incluyendo filtrado por paciente autenticado).
* Endpoints para citas (incluyendo filtrado por paciente autenticado).
* Integración frontend-backend para inicio de sesión, lista de espera, agenda médica, gestión de pacientes y gestión de listas de espera.
* Evidencias de pruebas con Insomnia.
* Build exitoso de frontend.
* Build exitoso de backend.
* Documentación técnica actualizada.

---

## 16. Consideraciones y trabajo futuro

Aunque la Entrega Parcial 2 incorpora backend, base de datos, autenticación real e integración de las vistas principales, aún existen funcionalidades que pueden fortalecerse en futuras entregas:

* Conectar las pantallas de exámenes, documentos y notificaciones a datos reales del backend.
* Implementar refresco o expiración controlada de sesión.
* Mejorar la gestión de errores visuales en formularios.
* Agregar validación avanzada de RUT chileno.
* Implementar recuperación real de contraseña.
* Agregar carga real de documentos médicos.
* Implementar reportes administrativos con datos dinámicos.
* Mejorar accesibilidad en formularios y navegación.
* Desplegar frontend y backend en un entorno de producción.
* Incorporar pruebas automatizadas.