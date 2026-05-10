# MuniSalud - Gestión de Listas de Espera

## Integrantes (Paralelo 2)
* Branco González
* Michelle Hernández
* Inti Liberona



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

## 3. Requerimientos del Sistema

### 3.1 Requerimientos Funcionales (RF)

**Rol: Paciente**

1. **Lista de Espera:** El sistema permite al paciente consultar su posición exacta, el estado actual de su trámite y la fecha estimada de atención para reducir la incertidumbre.
2. **Agenda Médica:** El paciente cuenta con un módulo para revisar sus próximas citas confirmadas y el historial de sus solicitudes de atención.
3. **Exámenes:** Acceso centralizado a la información sobre exámenes pendientes o cargados, incluyendo instrucciones de preparación y estados de avance.
4. **Notificaciones:** Sistema de alertas automáticas sobre avisos importantes, cambios en la prioridad de la lista o confirmación de nuevas citas.
5. **Documentos:** Repositorio digital para consultar y descargar documentos asociados a sus solicitudes de salud, tales como recetas, licencias o resultados.
6. **Mi Perfil:** Herramienta de autogestión para que el usuario pueda revisar y actualizar sus datos personales de contacto y antecedentes básicos.

**Rol: Administrador**
1. **Gestionar Pacientes:** El administrador supervisa el flujo de usuarios, procesa solicitudes de ingreso y aplica criterios de disponibilidad para enviar cada caso hacia la unidad de atención correspondiente.
2. **Gestionar Listas de Espera:** El administrador tiene la facultad de gestionar los cupos de atención y establecer el orden de prioridad de los pacientes basándose en criterios clínicos (triaje).
3. **Ver Reportes:** El sistema permite al administrador generar reportes detallados y analíticas sobre el estado de las listas, tiempos de espera y uso de recursos para la toma de decisiones.
4. **Revisar Agenda:** El sistema permite la coordinación técnica de citas y la gestión de disponibilidad operativa, facilitando la confirmación de atenciones y la detección temprana de horarios vacantes para optimizar la capacidad instalada.

### 3.2 Requerimientos No Funcionales (RNF)
* **Seguridad (Protección de Datos):** El sistema debe cumplir con estándares de cifrado para datos sensibles de salud (Ley 20.584), asegurando que solo el rol Admin y el dueño del RUT vean la ficha.
* **Usabilidad (Accesibilidad):** La interfaz debe cumplir con WCAG 2.1, considerando que gran parte de los usuarios del sistema público son adultos mayores (fuentes legibles, botones grandes, alto contraste).
* **Rendimiento:** El tiempo de carga de la lista de interconsultas no debe superar los 2 segundos, incluso bajo condiciones de red móvil 3G/4G.

## 4. Estructura Técnica
* **Frontend:** Ionic + React (Arquitectura modular).
* **Backend:** Node.js / Express (API RESTful).
* **Base de Datos:** Relacional (PostgreSQL/MySQL).


