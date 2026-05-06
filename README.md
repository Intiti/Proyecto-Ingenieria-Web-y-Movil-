# MuniSalud - Gestión de Listas de Espera

## Integrantes (Paralelo 2)
* Inti Liberona
* Michelle Hernández
* Branco González

## 1. Justificación y Problema
En Chile, las listas de espera en el área de salud son un problema estructural del sistema. El paciente sale de un centro de salud con una interconsulta en la mano y pierde el rastro de su proceso. Esta aplicación busca eliminar la incertidumbre, permitiendo que el paciente tenga una participación activa en cuanto a su propia salud y que se pueda optimizar el uso de los box de atención además del tiempo de pacientes y especialistas dentro de los hospitales.

## 2. Análisis del Usuario Objetivo
* **Paciente:** Usuario que requiere solicitar horas, consultar su lugar en la lista de espera, recibir notificaciones de disponibilidad y gestionar sus cancelaciones de forma autónoma.
* **Administrador (Municipalidad/CESFAM):** Personal encargado de la logística que debe gestionar listas, asignar horas según prioridad (triaje), y analizar estadísticas para la toma de decisiones.

## 3. Requerimientos del Sistema

### Requerimientos Funcionales (RF)

**Rol de Usuario:**
1. **Carga y Seguimiento de Interconsultas:** El Paciente debe poder visualizar sus interconsultas activas derivadas por el médico general, incluyendo el estado (Pendiente, Asignada, Realizada).
2. **Agendamiento de Especialista por Cupo:** El Paciente podrá seleccionar fecha y hora entre los cupos disponibles liberados por el hospital para su especialidad derivada.
3. **Confirmación y Gestión de Exámenes:** El Paciente debe poder confirmar su asistencia a exámenes programados o solicitar una reprogramación justificada (sujeto a disponibilidad).
4. **Sistema de Notificaciones de Avance:** Envío automático de alertas (Push/In-app) cuando una lista de espera se mueva o cuando el paciente suba en la prioridad de atención.
5. **Validación de Identidad con ClaveÚnica/RUT:** Integración (simulada) para asegurar que el usuario accede a su historial clínico personal y legal.

**Rol de Administrador:**

6. **Generar Reportes:** El Administrador podrá generar reportes y analíticas.
7. **Panel de Control de Disponibilidad:** El Administrador podrá visualizar la demanda en tiempo real por especialidad y cargar nuevos bloques de atención para reducir los cuellos de botella.
8. **Reportabilidad de Tiempos de Espera:** Visualización de gráficos comparativos entre hospitales de la red para redistribuir pacientes de zonas saturadas a zonas con mayor vacancia.

### Requerimientos No Funcionales (RNF)
* **Seguridad (Protección de Datos):** El sistema debe cumplir con estándares de cifrado para datos sensibles de salud (Ley 20.584), asegurando que solo el rol Admin y el dueño del RUT vean la ficha.
* **Usabilidad (Accesibilidad):** La interfaz debe cumplir con WCAG 2.1, considerando que gran parte de los usuarios del sistema público son adultos mayores (fuentes legibles, botones grandes, alto contraste).
* **Rendimiento:** El tiempo de carga de la lista de interconsultas no debe superar los 2 segundos, incluso bajo condiciones de red móvil 3G/4G.

## 4. Estructura Técnica
* **Frontend:** Ionic + React (Arquitectura modular).
* **Backend:** Node.js / Express (API RESTful).
* **Base de Datos:** Relacional (PostgreSQL/MySQL).
