# Sistema de Gestión de Consultas y Lista de Espera Médica

## 1. Información del Proyecto
* **Integrantes:** - Branco Gonzalez
    - Michelle Hernández
    - Inti Liberona
* **Paralelo:** 2 
* **Framework Frontend:** Ionic + React
* **Backend:** Node.js con Express

## 2. Descripción del Problema
Los usuarios enfrentan meses de espera por falta de organización y sobredemanda. Este sistema implementa una lista de espera inteligente y triaje digital para optimizar la carga médica y reducir tiempos de atención.

## 3. Definición de Requerimientos

### Requerimientos Funcionales
| Descripción | Rol |
|-------------|-----|
| Gestión de disponibilidad: Bloques horarios, boxes y turnos médicos. | Admin |
| Reserva de citas con filtros de especialidad, centro y profesional. | Paciente |
| Lista de espera: Notificación y reasignación de cupos en tiempo real. | Paciente |
| Triaje digital: Categorización de pacientes y priorización por gravedad. | Paciente |
| Repositorio clínico: Visualización y descarga de resultados de exámenes. | Paciente |
| Cancelación dinámica: Liberación inmediata de cupos y actualización de agenda. | Paciente/Admin |
| Dashboard analítico: Identificación de áreas saturadas y horas de alta demanda. | Admin |

### Requerimientos No Funcionales
* **RNF1 (Usabilidad):** Diseño Mobile-First responsivo y coherencia visual multiplataforma.
* **RNF2 (Seguridad):** Autenticación JWT, cifrado bcrypt y protección de datos clínicos.
* **RNF3 (Rendimiento):** Consultas optimizadas con tiempos de respuesta bajo 2 segundos.

## 4. Análisis de Usuarios
* **Paciente:** Busca agilidad en el agendamiento y acceso centralizado a su información médica.
* **Administrador:** Busca optimizar la logística médica y reducir la tasa de inasistencia (no-show).

## 5. Instrucciones de Ejecución

