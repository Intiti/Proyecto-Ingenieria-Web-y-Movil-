# MuniSalud - Gestión de Listas de Espera

## Integrantes (Paralelo 2)
* Inti Liberona
* Michelle Hernández
* Branco González

## 1. Justificación y Problema
Los centros de salud municipal presentan esperas de meses debido a la sobredemanda, mala gestión de agendas y falta de comunicación.
* **Impacto:** Pérdida de horas médicas por inasistencia e ineficiencia del sistema público.
* **Solución:** Implementación de una plataforma web/móvil para la transformación digital municipal que optimice tiempos y mejore la satisfacción ciudadana.

## 2. Análisis del Usuario Objetivo
* **Paciente:** Usuario que requiere solicitar horas, consultar su lugar en la lista de espera, recibir notificaciones de disponibilidad y gestionar sus cancelaciones de forma autónoma.
* **Administrador (Municipalidad/CESFAM):** Personal encargado de la logística que debe gestionar listas, asignar horas según prioridad (triaje), y analizar estadísticas para la toma de decisiones.

## 3. Requerimientos del Sistema

### Requerimientos Funcionales (RF)

1. **Solicitud de Hora Médica:** Selección de especialidad, profesional y centro de salud por parte del paciente.
2. **Gestión de Lista de Espera:** Registro y visualización del estado y posición del paciente en la fila de espera.
3. **Priorización de Pacientes:** Herramienta para que el Admin asigne niveles de urgencia a los pacientes en lista.
4. **Asignación Automática:** Algoritmo que vincula cupos liberados con pacientes en lista de espera según su prioridad.
5. **Notificaciones de Atención:** Envío de alertas automáticas al paciente cuando se libera un cupo o se aproxima su cita.
6. **Cancelación de Hora:** Función para liberar cupos médicos inmediatamente, actualizando la agenda global.
7. **Panel de Control Administrativo:** Gestión integral de la disponibilidad médica y visualización de reportes de atención.

### Requerimientos No Funcionales (RNF)
* **Seguridad:** Encriptación de datos personales y clínicos bajo protocolos de seguridad vigentes.
* **Rendimiento:** Tiempos de respuesta del sistema inferiores a 2 segundos en todas las consultas.
* **Disponibilidad/Usabilidad:** Aplicación responsiva (Web y Móvil) con diseño centrado en el usuario (UX/UI).

## 4. Estructura Técnica
* **Frontend:** Ionic + React (Arquitectura modular).
* **Backend:** Node.js / Express (API RESTful).
* **Base de Datos:** Relacional (PostgreSQL/MySQL).
