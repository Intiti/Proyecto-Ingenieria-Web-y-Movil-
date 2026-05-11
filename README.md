# MuniSalud - Gestión de Listas de Espera

## Integrantes

- Branco González
- Michelle Hernández
- Inti Liberona

**Asignatura:** Ingeniería Web y Móvil  
**Paralelo:** 2  
**Entrega:** Entrega Parcial 1 - Diseño y estructura inicial

<<<<<<< HEAD
---

## Descripción de la entrega
=======
## 1. Justificación y Problema
En el sistema de salud pública chileno, la gestión de la demanda excede constantemente la oferta disponible, lo que genera listas de espera que se han convertido en un problema crítico de salud pública. Actualmente, el flujo de información es unidireccional y fragmentado: una vez que se emite una interconsulta, el rastro administrativo se vuelve complejo para el ciudadano, generando incertidumbre en el paciente. Este es un dilema que viene desde un problema mucho más profundo y que tiene relación no solo con la falta de especialistas, sino también de la ineficiencia en la comunicación y gestión de datos.

En este caso, no es solo el paciente quien se ve afectado por la falta de información y de comunicación, sino que también los funcionarios se ven sobrepasados por un sistema que se colapsa por la mala gestión de los pacientes y por el exceso de carga administrativa.

## 2. Análisis del Usuario Objetivo
### 2.1. Perfil del Paciente (Usuario Final)
Representa al ciudadano de la comuna que accede a los servicios de salud pública. Su interacción con el sistema busca reducir la incertidumbre y eliminar la presencialidad innecesaria en los centros de salud.

Necesidades Clave:

* **Transparencia:** Conocer de forma real y actualizada su posición en las listas de espera.

* **Autogestión:** Capacidad de solicitar, confirmar o cancelar citas sin depender de llamadas telefónicas o trámites presenciales.

* **Oportunidad:** Recibir alertas inmediatas ante la liberación de cupos o cambios en su atención.

Puntos de Dolor: Largos tiempos de espera, falta de información sobre el estado de sus solicitudes y dificultad para comunicarse con los centros de salud.

Valor Agregado: Otorgarle autonomía al paciente sobre su propia salud y así reducir la brecha digital en el acceso a servicios públicos.

### 2.2 Perfil del Administrador (Gestor Municipal / Funcionario)
Personal técnico y administrativo encargado de la operatividad del sistema. Su enfoque está en la eficiencia de los recursos y la correcta categorización de la demanda.

Necesidades Clave:

* **Optimización de Recursos:** Identificar horarios vacantes y redistribuir la carga de atención de manera dinámica.

* **Soporte a la Decisión:** Acceso a datos centralizados y analíticas en tiempo real para proyectar necesidades de insumos o personal.

* **Estandarización del Triaje:** Aplicar criterios clínicos uniformes para asignar prioridades de atención (Urgente, Prioritario, Rutinario).

Puntos de Dolor: Saturación de las listas de espera, procesos manuales propensos a errores en la asignación de horas y falta de visibilidad estadística del rendimiento del centro.

Valor Agregado: Automatización de tareas logísticas, mejora en los indicadores de gestión municipal y reducción de los cupos no utilizados mediante el sistema de confirmaciones automáticas.
>>>>>>> 42fb921260f4906d73b3f70761304bb5524ac249

Esta entrega corresponde a la primera etapa del proyecto **MuniSalud**, una aplicación orientada a mejorar la gestión de listas de espera y la comunicación entre pacientes y funcionarios municipales de salud.

<<<<<<< HEAD
En esta etapa se presenta:
=======
### 3.1 Requerimientos Funcionales (RF)
>>>>>>> 42fb921260f4906d73b3f70761304bb5524ac249

- Definición del problema.
- Análisis de usuarios objetivo.
- Requerimientos funcionales y no funcionales.
- Arquitectura de navegación.
- Estructura inicial del frontend en Ionic + React.
- Pantallas navegables para rol paciente y rol funcionario.
- Prototipo UI/UX asociado al flujo de navegación.
- Organización modular del código fuente.

---

<<<<<<< HEAD
## 1. Justificación y problema

En Chile, las listas de espera en el área de salud representan un problema estructural del sistema público. En muchos casos, el paciente recibe una interconsulta o solicitud médica y luego pierde visibilidad sobre el estado de su proceso, su prioridad, los tiempos estimados o la disponibilidad de atención.

El proyecto **MuniSalud** busca reducir esa incertidumbre mediante una plataforma que permita al paciente consultar su estado de atención, revisar su agenda médica, recibir notificaciones, acceder a documentos y mantener actualizados sus datos personales.
=======
**Rol: Administrador**
1. **Gestionar Pacientes:** El administrador supervisa el flujo de usuarios, procesa solicitudes de ingreso y aplica criterios de disponibilidad para enviar cada caso hacia la unidad de atención correspondiente.
2. **Gestionar Listas de Espera:** El administrador tiene la facultad de gestionar los cupos de atención y establecer el orden de prioridad de los pacientes basándose en criterios clínicos (triaje).
3. **Ver Reportes:** El sistema permite al administrador generar reportes detallados y analíticas sobre el estado de las listas, tiempos de espera y uso de recursos para la toma de decisiones.
4. **Revisar Agenda:** El sistema permite la coordinación técnica de citas y la gestión de disponibilidad operativa, facilitando la confirmación de atenciones y la detección temprana de horarios vacantes para optimizar la capacidad instalada.

### 3.2 Requerimientos No Funcionales (RNF)
* **Seguridad (Protección de Datos):** El sistema debe cumplir con estándares de cifrado para datos sensibles de salud (Ley 20.584), asegurando que solo el rol Admin y el dueño del RUT vean la ficha.
* **Usabilidad (Accesibilidad):** La interfaz debe cumplir con WCAG 2.1, considerando que gran parte de los usuarios del sistema público son adultos mayores (fuentes legibles, botones grandes, alto contraste).
* **Rendimiento:** El tiempo de carga de la lista de interconsultas no debe superar los 2 segundos, incluso bajo condiciones de red móvil 3G/4G.
>>>>>>> 42fb921260f4906d73b3f70761304bb5524ac249

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

---

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

---

## 8. Instalación y ejecución
Requisitos previos

Para ejecutar el proyecto se requiere tener instalado:

Node.js
npm
Git
Pasos para ejecutar el proyecto
Clonar el repositorio: