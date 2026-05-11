# MuniSalud - Gestión de Listas de Espera

## Integrantes

- Branco González
- Michelle Hernández
- Inti Liberona

**Asignatura:** Ingeniería Web y Móvil  
**Paralelo:** 2  
**Entrega:** Entrega Parcial 1 - Diseño y estructura inicial

---

## Índice

- [Descripción de la entrega](#descripción-de-la-entrega)
- [1. Justificación y problema](#1-justificación-y-problema)
- [2. Análisis del usuario objetivo](#2-análisis-del-usuario-objetivo)
  - [Paciente](#paciente)
  - [Funcionario municipal / administrador](#funcionario-municipal--administrador)
- [3. Requerimientos del sistema](#3-requerimientos-del-sistema)
  - [3.1 Requerimientos funcionales](#31-requerimientos-funcionales)
  - [3.2 Requerimientos no funcionales](#32-requerimientos-no-funcionales)
- [4. Arquitectura de navegación](#4-arquitectura-de-navegación)
  - [4.1 Rutas públicas](#41-rutas-públicas)
  - [4.2 Rutas del paciente](#42-rutas-del-paciente)
  - [4.3 Rutas del funcionario](#43-rutas-del-funcionario)
  - [4.4 Diferenciación por roles](#44-diferenciación-por-roles)
- [5. Credenciales de prueba](#5-credenciales-de-prueba)
- [6. Tecnologías utilizadas](#6-tecnologías-utilizadas)
- [7. Estructura del proyecto](#7-estructura-del-proyecto)
- [8. Instalación y ejecución](#8-instalación-y-ejecución)
  - [8.1 Requisitos previos](#81-requisitos-previos)
  - [8.2 Clonar el repositorio](#82-clonar-el-repositorio)
  - [8.3 Instalar dependencias](#83-instalar-dependencias)
  - [8.4 Ejecutar la aplicación](#84-ejecutar-la-aplicación)
  - [8.5 Rutas principales para revisar](#85-rutas-principales-para-revisar)
  - [8.6 Credenciales de prueba](#86-credenciales-de-prueba)
  - [8.7 Consideraciones de esta entrega](#87-consideraciones-de-esta-entrega)
- [9. Prototipo UI/UX](#9-prototipo-uiux)
- [10. Material complementario](#10-material-complementario)
- [11. Gestión del proyecto](#11-gestión-del-proyecto)
- [12. Estado de la entrega](#12-estado-de-la-entrega)

---
## Descripción de la entrega

Esta entrega corresponde a la primera etapa del proyecto **MuniSalud**, una aplicación orientada a mejorar la gestión de listas de espera y la comunicación entre pacientes y funcionarios municipales de salud.

En esta etapa se presenta:

- Definición del problema.
- Análisis de usuarios objetivo.
- Requerimientos funcionales y no funcionales.
- Arquitectura de navegación.
- Estructura inicial del frontend en Ionic + React.
- Pantallas navegables para rol paciente y rol funcionario.
- Prototipo UI/UX asociado al flujo de navegación.
- Organización modular del código fuente.

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

1. **Consulta de lista de espera:**  
   El sistema permite al paciente consultar el estado de sus solicitudes médicas, prioridad, centro asignado y última actualización.

2. **Agenda médica:**  
   El paciente puede revisar sus próximas citas médicas, horarios, lugar de atención e historial reciente.

3. **Exámenes:**  
   El paciente puede consultar exámenes pendientes, en proceso o completados, incluyendo instrucciones y estado de avance.

4. **Documentos:**  
   El paciente puede acceder a documentos asociados a su atención, tales como recetas, licencias médicas o resultados de exámenes.

5. **Notificaciones:**  
   El sistema muestra alertas sobre cambios en listas de espera, nuevos cupos, recordatorios de exámenes y avisos relevantes.

6. **Perfil del paciente:**  
   El paciente puede revisar y actualizar datos personales de contacto, como correo, teléfono, dirección y contacto de emergencia.

7. **Ayuda y orientación:**  
   El paciente puede acceder a preguntas frecuentes, canales de contacto y accesos directos a secciones importantes del sistema.

#### Rol Funcionario

8. **Gestión de pacientes:**  
   El funcionario puede buscar pacientes, revisar solicitudes, detectar casos prioritarios y acceder a acciones de gestión.

9. **Gestión de listas de espera:**  
   El funcionario puede visualizar solicitudes, revisar prioridades y administrar estados relacionados con listas de espera.

10. **Agenda administrativa:**  
   El funcionario puede revisar citas programadas, disponibilidad y coordinación de atenciones.

11. **Reportes administrativos:**  
   El funcionario puede consultar indicadores sobre pacientes registrados, solicitudes en espera, citas programadas, especialidades más solicitadas y centros con mayor demanda.

### 3.2 Requerimientos no funcionales

1. **Seguridad:**  
   El sistema debe considerar acceso diferenciado por roles, protegiendo la información sensible de pacientes y limitando las vistas administrativas al rol funcionario.

2. **Usabilidad:**  
   La interfaz debe ser clara, legible y accesible, considerando usuarios con distintos niveles de experiencia digital. Se priorizan botones grandes, textos claros y navegación simple.

3. **Rendimiento:**  
   La aplicación debe cargar sus vistas principales de manera fluida y permitir una navegación rápida entre módulos.

4. **Escalabilidad:**  
   La estructura del frontend debe estar organizada por módulos para facilitar la incorporación futura de backend, autenticación real, rutas protegidas y consumo de API REST.

---

## 4. Arquitectura de navegación

La aplicación se estructura en tres grupos principales de rutas:

- Rutas públicas.
- Rutas del paciente.
- Rutas del funcionario.

### 4.1 Rutas públicas

| Ruta | Descripción |
|---|---|
| `/login` | Inicio de sesión del paciente |
| `/crear-cuenta` | Registro de paciente |
| `/recuperar-contrasena` | Recuperación de contraseña |
| `/admin/login` | Inicio de sesión del funcionario |

### 4.2 Rutas del paciente

| Ruta | Descripción |
|---|---|
| `/home` | Panel principal del paciente |
| `/solicitudes` | Consulta de lista de espera |
| `/agenda` | Agenda médica del paciente |
| `/examenes` | Estado de exámenes |
| `/documentos` | Documentos médicos |
| `/notificaciones` | Centro de notificaciones |
| `/perfil` | Datos personales del paciente |
| `/ayuda` | Ayuda y orientación |

### 4.3 Rutas del funcionario

| Ruta | Descripción |
|---|---|
| `/admin/dashboard` | Panel principal del funcionario |
| `/admin/pacientes` | Gestión de pacientes |
| `/admin/listas` | Gestión de listas de espera |
| `/admin/agenda` | Agenda administrativa |
| `/admin/reportes` | Reportes administrativos |

### 4.4 Diferenciación por roles

La aplicación contempla dos roles principales:

- **Paciente:** accede a módulos de consulta, seguimiento y autogestión.
- **Funcionario:** accede a módulos de gestión, administración y reportes.

En esta entrega, la diferenciación se implementa a nivel de navegación y pantallas. La autenticación real con backend y tokens queda planificada para etapas posteriores.

---

## 5. Credenciales de prueba

Como esta entrega corresponde al frontend inicial, se utilizan credenciales ficticias para simular el acceso.

### Paciente

- **RUT:** `12.345.678-9`
- **Contraseña:** `paciente123`

### Funcionario

- **Correo:** `funcionario@santodomingo.cl`
- **Contraseña:** `admin123`

---

## 6. Tecnologías utilizadas

### Implementado en esta entrega

- Ionic
- React
- TypeScript
- React Router
- CSS modular
- Git y GitHub

### Planificado para próximas entregas

- Backend con Node.js + Express
- API RESTful
- Base de datos relacional PostgreSQL o MySQL
- Autenticación con JWT
- Validación de usuarios
- Integración frontend + backend

---

## 7. Estructura del proyecto

```txt
src/
  components/
    AppMenu.tsx
    AppMenu.css
    NotificationBell.tsx
    NotificationBell.css

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

  theme/
    app-theme.css

  App.tsx

```
---

## 8. Instalación y ejecución

Esta sección describe el procedimiento completo para descargar, instalar y ejecutar el proyecto **MuniSalud** en un entorno local.

### 8.1 Requisitos previos

Para ejecutar el proyecto correctamente, se debe contar con las siguientes herramientas instaladas en el equipo:

- **Git:** necesario para clonar el repositorio desde GitHub.
- **Node.js:** entorno de ejecución requerido para trabajar con proyectos basados en React, Ionic y Vite.
- **npm:** gestor de paquetes utilizado para instalar las dependencias del proyecto.
- **Visual Studio Code:** editor recomendado para revisar, modificar y ejecutar el código fuente.

Para verificar que Node.js y npm estén instalados correctamente, se pueden ejecutar los siguientes comandos en la terminal:

```bash
node -v
npm -v
```

Si ambos comandos muestran una versión instalada, el entorno está preparado para continuar con la instalación del proyecto.

### 8.2 Clonar el repositorio

Primero se debe clonar el repositorio oficial del proyecto desde GitHub:

```bash
git clone https://github.com/Intiti/Proyecto-Ingenieria-Web-y-Movil-.git
```

Luego, se debe ingresar a la carpeta generada por el repositorio:

```bash
cd Proyecto-Ingenieria-Web-y-Movil-
```

### 8.3 Instalar dependencias

Una vez dentro de la carpeta principal del proyecto, se deben instalar las dependencias necesarias mediante npm:

```bash
npm install
```

Este comando descarga e instala las librerías requeridas para ejecutar la aplicación, incluyendo Ionic, React, TypeScript, React Router y las dependencias utilizadas por el entorno de desarrollo.

### 8.4 Ejecutar la aplicación

Para iniciar el servidor de desarrollo local, se debe ejecutar el siguiente comando:

```bash
npm run dev
```

Al ejecutar este comando, la terminal mostrará una dirección local similar a la siguiente:

```txt
http://localhost:5173
```

La aplicación debe abrirse desde el navegador ingresando a esa dirección.

### 8.5 Rutas principales para revisar

Una vez ejecutada la aplicación, se pueden revisar las siguientes rutas principales del sistema.

#### Rutas públicas

- `/login`: inicio de sesión del paciente.
- `/crear-cuenta`: registro de paciente.
- `/recuperar-contrasena`: recuperación de contraseña.
- `/admin/login`: inicio de sesión del funcionario.

#### Rutas del paciente

- `/home`: panel principal del paciente.
- `/solicitudes`: consulta de lista de espera.
- `/agenda`: agenda médica del paciente.
- `/examenes`: estado de exámenes.
- `/documentos`: documentos médicos.
- `/notificaciones`: centro de notificaciones.
- `/perfil`: datos personales del paciente.
- `/ayuda`: ayuda y orientación.

#### Rutas del funcionario

- `/admin/dashboard`: panel principal del funcionario.
- `/admin/pacientes`: gestión de pacientes.
- `/admin/listas`: gestión de listas de espera.
- `/admin/agenda`: agenda administrativa.
- `/admin/reportes`: reportes administrativos.

### 8.6 Credenciales de prueba

Como esta entrega corresponde a la estructura inicial del frontend, el sistema utiliza credenciales ficticias para simular el acceso de usuarios.

#### Paciente

```txt
RUT: 12.345.678-9
Contraseña: paciente123
```

También se puede escribir el RUT sin puntos ni guion:

```txt
123456789
```

El sistema lo formatea automáticamente como:

```txt
12.345.678-9
```

#### Funcionario

```txt
Correo: funcionario@santodomingo.cl
Contraseña: admin123
```

### 8.7 Consideraciones de esta entrega

En esta **Entrega Parcial 1**, la aplicación funciona como un prototipo navegable del frontend. Por lo tanto:

- Las credenciales son simuladas.
- No existe conexión real a una base de datos.
- No existe autenticación real mediante JWT.
- No existe backend implementado todavía.
- Las vistas muestran datos de ejemplo para representar el flujo esperado del sistema.
- La integración con backend, API REST, base de datos y autenticación real queda planificada para la **Entrega Parcial 2**.

---

## 9. Prototipo UI/UX

El prototipo UI/UX del proyecto se encuentra disponible en Figma.

[https://www.figma.com/design/VZNDjyapyVvHnXxJKnnw4h/MuniSalud?node-id=0-1&t=h0QVlP000InmznrO-1](https://www.figma.com/proto/VZNDjyapyVvHnXxJKnnw4h/MuniSalud?node-id=26-99&p=f&t=CVmV1LAhO5alpUCW-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=26%3A99)

El prototipo considera pantallas para los roles de paciente y funcionario municipal, contemplando vistas en formato web y móvil. Las pantallas fueron diseñadas considerando jerarquía visual, navegación clara, componentes de interacción y coherencia entre las funcionalidades principales del sistema.

---
## 10. Material complementario

Los documentos complementarios de la entrega se encuentran en la carpeta /otros, ubicada en la raíz del proyecto.

otros/
  EP1.4_Arquitectura_Navegacion_Experiencia_Usuario_MuniSalud.pdf

Este documento contiene la definición de la arquitectura de navegación y experiencia de usuario, incluyendo rutas principales y secundarias, jerarquía de vistas, flujo de navegación, diferenciación por roles, task flow, puntos críticos de interacción y justificación técnica de las decisiones adoptadas.

---
## 11. Gestión del proyecto

El proyecto se gestiona mediante GitHub, aplicando buenas prácticas de control de versiones y organización del trabajo colaborativo.

Durante el desarrollo se utilizaron las siguientes prácticas:

- **Commits descriptivos:** para registrar avances y cambios relevantes del proyecto.
- **Ramas de trabajo:** para separar funcionalidades, refactorizaciones y ajustes importantes.
- **Pull Requests:** para revisar e integrar cambios antes de incorporarlos a la rama principal.
- **Issues:** para organizar tareas, funcionalidades pendientes y correcciones.
- **GitHub Projects:** para visualizar el avance general del proyecto y distribuir el trabajo del equipo.

El repositorio contiene el código fuente del frontend, la documentación técnica inicial y el material complementario correspondiente a la Entrega Parcial 1.

---

## 12. Estado de la entrega

En esta Entrega Parcial 1 se incluye:

- Frontend inicial desarrollado con **Ionic + React**.
- Aplicación navegable mediante **React Router**.
- Separación de rutas según rol de usuario.
- Flujo de navegación para **paciente**.
- Flujo de navegación para **funcionario municipal**.
- Pantallas principales implementadas con componentes de Ionic.
- Uso de componentes como `IonPage`, `IonHeader`, `IonContent`, `IonMenu`, `IonCard`, `IonButton` e `IonInput`.
- Estructura modular del código en carpetas `auth`, `patient`, `admin`, `components` y `theme`.
- Simulación de credenciales de acceso para paciente y funcionario.
- Prototipo UI/UX en Figma.
- Documentación técnica inicial en `README.md`.
- Material complementario en la carpeta `/otros`.

La implementación de backend, base de datos, autenticación real, API REST, JWT, validación persistente de usuarios e integración frontend-backend queda planificada para la **Entrega Parcial 2**.
