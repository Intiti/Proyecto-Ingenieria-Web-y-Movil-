# MuniSalud - Gestión de Listas de Espera

## Integrantes (Paralelo 2)
* Branco González
* Michelle Hernández
* Inti Liberona



## 1. Justificación y Problema
En Chile, las listas de espera en el área de salud son un problema estructural del sistema. El paciente sale de un centro de salud con una interconsulta en la mano y pierde el rastro de su proceso. Esta aplicación busca eliminar la incertidumbre, permitiendo que el paciente tenga una participación activa en cuanto a su propia salud y que se pueda optimizar el uso de los box de atención además del tiempo de pacientes y especialistas dentro de los hospitales.

## 2. Análisis del Usuario Objetivo
* **Paciente:** Usuario que requiere solicitar horas, consultar su lugar en la lista de espera, recibir notificaciones de disponibilidad y gestionar sus cancelaciones de forma autónoma.
* **Administrador (Municipalidad/CESFAM):** Personal encargado de la logística que debe gestionar listas, asignar horas según prioridad (triaje), y analizar estadísticas para la toma de decisiones.

## 3. Requerimientos del Sistema

### Requerimientos Funcionales (RF)

**Rol: Paciente**

1. **Lista de Espera:** El sistema permite al paciente consultar su posición exacta, el estado actual de su trámite y la fecha estimada de atención para reducir la incertidumbre.
2. **Agenda Médica:** El paciente cuenta con un módulo para revisar sus próximas citas confirmadas y el historial de sus solicitudes de atención.
3. **Exámenes:** Acceso centralizado a la información sobre exámenes pendientes o cargados, incluyendo instrucciones de preparación y estados de avance.
4. **Notificaciones:** Sistema de alertas automáticas sobre avisos importantes, cambios en la prioridad de la lista o confirmación de nuevas citas.
5. **Documentos:** Repositorio digital para consultar y descargar documentos asociados a sus solicitudes de salud, tales como recetas, licencias o resultados.
6. **Mi Perfil:** Herramienta de autogestión para que el usuario pueda revisar y actualizar sus datos personales de contacto y antecedentes básicos.

**Rol: Administrador**

7. **Gestión y Priorización de Listas:** El administrador tiene la facultad de gestionar los cupos de atención y establecer el orden de prioridad de los pacientes basándose en criterios clínicos (triaje).
8. **Generación de Reportes:** El sistema permite al administrador generar reportes detallados y analíticas sobre el estado de las listas, tiempos de espera y uso de recursos para la toma de decisiones.

### Requerimientos No Funcionales (RNF)
* **Seguridad (Protección de Datos):** El sistema debe cumplir con estándares de cifrado para datos sensibles de salud (Ley 20.584), asegurando que solo el rol Admin y el dueño del RUT vean la ficha.
* **Usabilidad (Accesibilidad):** La interfaz debe cumplir con WCAG 2.1, considerando que gran parte de los usuarios del sistema público son adultos mayores (fuentes legibles, botones grandes, alto contraste).
* **Rendimiento:** El tiempo de carga de la lista de interconsultas no debe superar los 2 segundos, incluso bajo condiciones de red móvil 3G/4G.

## 4. Estructura Técnica
* **Frontend:** Ionic + React (Arquitectura modular).
* **Backend:** Node.js / Express (API RESTful).
* **Base de Datos:** Relacional (PostgreSQL/MySQL).

## 5. Arquitectura de navegación y experiencia de usuario

### (a) Rutas Principales y Secundarias
* **Principales:** `/login`, `/home`,  `/admin`
* **Secundarias:** `/forgot-password`, `/registro`, `/solicitudes`, `/agenda`, `/examenes`, `/documentos`, `/perfil`..

### (b) Relaciones Jerárquicas
La estructura es de árbol con un nodo central:
1. **Acceso:** Login / Registro.
2. **Núcleo:** Home (Dashboard).
3. **Servicios:** Secciones funcionales individuales.

### (c) Flujo de Navegación
Navegación híbrida: Radial desde el Home y Lineal mediante menú lateral (PatientMenu), permitiendo cambios de contexto rápidos sin pérdida de estado.

### (d) Diferenciación de Roles
* **Paciente:** Rutas de consulta y descarga de información personal.
* **Administrador:** Acceso restringido a `/admin/*` para gestión de listas y analíticas.

### (e) Task Flow: Consulta de Resultados
1. Usuario accede a `Home`.
2. Selecciona `Exámenes`.
3. Identifica examen `Completado`.
4. Acciona botón `Ver en documentos`.
5. El sistema redirige a `Documentos` filtrando el resultado.

### (f) Puntos Críticos de Interacción
* Proceso de autenticación inicial.
* Tiempo de respuesta en la carga de archivos PDF.
* Claridad en los estados de la lista de espera (Pendiente/Agendada).

### (g) Coherencia entre Dispositivos
Uso de **Ionic Grid System**. En móviles, las tarjetas ocupan el 100% del ancho (`size="12"`); en tablets y escritorio, se redistribuyen en columnas (`sizeMd="6"`, `sizeLg="4"`) para optimizar el espacio visual.

### (h) Justificación Técnica
La arquitectura se basa en **React Router** por su capacidad de manejar estados complejos y escalabilidad. Se priorizó la usabilidad mediante componentes atómicos de Ionic, asegurando una experiencia nativa en web y móvil.
