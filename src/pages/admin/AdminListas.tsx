import { useMemo, useState } from "react";

import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  alertCircleOutline,
  calendarOutline,
  checkmarkCircleOutline,
  homeOutline,
  medicalOutline,
  peopleOutline,
  swapHorizontalOutline,
  timeOutline,
} from "ionicons/icons";

import "./AdminListas.css";

type WaitStatus = "todos" | "en-espera" | "prioritario" | "agendado";
type PriorityStatus = "Alta" | "Media" | "Baja";

const waitlistRequests = [
  {
    id: "SOL-001",
    patient: "María Muñoz Pérez",
    rut: "12.345.678-9",
    request: "Consulta traumatología",
    specialty: "Traumatología",
    center: "CESFAM Santo Domingo",
    status: "prioritario",
    statusLabel: "Prioritario",
    priority: "Alta" as PriorityStatus,
    waitingDays: 36,
    enteredAt: "12/04/2026",
  },
  {
    id: "SOL-002",
    patient: "Carlos Rojas Díaz",
    rut: "18.456.789-0",
    request: "Evaluación cardiología",
    specialty: "Cardiología",
    center: "Centro Médico Municipal",
    status: "en-espera",
    statusLabel: "En espera",
    priority: "Alta" as PriorityStatus,
    waitingDays: 28,
    enteredAt: "19/04/2026",
  },
  {
    id: "SOL-003",
    patient: "Ana Soto Vera",
    rut: "16.234.987-1",
    request: "Examen de laboratorio",
    specialty: "Laboratorio",
    center: "Unidad de Apoyo Clínico",
    status: "agendado",
    statusLabel: "Agendado",
    priority: "Media" as PriorityStatus,
    waitingDays: 12,
    enteredAt: "04/05/2026",
  },
  {
    id: "SOL-004",
    patient: "Luis Herrera Núñez",
    rut: "14.876.222-4",
    request: "Medicina general",
    specialty: "Medicina general",
    center: "Posta Rural El Convento",
    status: "en-espera",
    statusLabel: "En espera",
    priority: "Baja" as PriorityStatus,
    waitingDays: 19,
    enteredAt: "27/04/2026",
  },
];

const AdminListas: React.FC = () => {
  const [status, setStatus] = useState<WaitStatus>("todos");
  const [priority, setPriority] = useState<"todas" | PriorityStatus>("todas");

  const filteredRequests = useMemo(() => {
    return waitlistRequests.filter((request) => {
      const matchesStatus = status === "todos" || request.status === status;
      const matchesPriority =
        priority === "todas" || request.priority === priority;

      return matchesStatus && matchesPriority;
    });
  }, [status, priority]);

  const waitingCount = waitlistRequests.filter(
    (request) => request.status === "en-espera",
  ).length;

  const priorityCount = waitlistRequests.filter(
    (request) => request.status === "prioritario",
  ).length;

  const scheduledCount = waitlistRequests.filter(
    (request) => request.status === "agendado",
  ).length;

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Listas de espera</IonTitle>

          <IonButtons slot="end">
            <IonButton
              routerLink="/admin/dashboard"
              fill="clear"
              className="app-header-btn"
            >
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page admin-listas-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Priorización clínica</p>
              <h1>Gestión de listas de espera</h1>
              <p>
                Revisa solicitudes pendientes, prioriza casos críticos y deriva
                pacientes hacia agenda o centros con disponibilidad.
              </p>
            </div>
          </section>

          <section className="kpi-grid">
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />
                <div>
                  <strong>{waitlistRequests.length}</strong>
                  <span>Total solicitudes</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={timeOutline} />
                <div>
                  <strong>{waitingCount}</strong>
                  <span>En espera</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={alertCircleOutline} />
                <div>
                  <strong>{priorityCount}</strong>
                  <span>Prioritarios</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={calendarOutline} />
                <div>
                  <strong>{scheduledCount}</strong>
                  <span>Agendados</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <IonCard className="app-card admin-listas-filters">
            <IonCardContent>
              <IonSelect
                value={status}
                interface="popover"
                label="Estado"
                labelPlacement="stacked"
                className="admin-listas-select"
                onIonChange={(event) =>
                  setStatus(event.detail.value as WaitStatus)
                }
              >
                <IonSelectOption value="todos">Todos</IonSelectOption>
                <IonSelectOption value="en-espera">En espera</IonSelectOption>
                <IonSelectOption value="prioritario">
                  Prioritario
                </IonSelectOption>
                <IonSelectOption value="agendado">Agendado</IonSelectOption>
              </IonSelect>

              <IonSelect
                value={priority}
                interface="popover"
                label="Prioridad"
                labelPlacement="stacked"
                className="admin-listas-select"
                onIonChange={(event) =>
                  setPriority(event.detail.value as "todas" | PriorityStatus)
                }
              >
                <IonSelectOption value="todas">Todas</IonSelectOption>
                <IonSelectOption value="Alta">Alta</IonSelectOption>
                <IonSelectOption value="Media">Media</IonSelectOption>
                <IonSelectOption value="Baja">Baja</IonSelectOption>
              </IonSelect>
            </IonCardContent>
          </IonCard>

          <section className="admin-listas-content">
            <div className="admin-listas-list">
              {filteredRequests.map((request) => (
                <IonCard className="app-card waitlist-card" key={request.id}>
                  <IonCardContent>
                    <div className="waitlist-top">
                      <div>
                        <span className="request-id">{request.id}</span>
                        <h2>{request.request}</h2>
                        <p>
                          {request.patient} · {request.rut}
                        </p>
                      </div>

                      <IonBadge
                        className={
                          request.status === "prioritario"
                            ? "badge-danger"
                            : request.status === "agendado"
                              ? "badge-success"
                              : "badge-warning"
                        }
                      >
                        {request.statusLabel}
                      </IonBadge>
                    </div>

                    <div className="waitlist-info">
                      <div>
                        <span>Especialidad</span>
                        <strong>{request.specialty}</strong>
                      </div>

                      <div>
                        <span>Centro actual</span>
                        <strong>{request.center}</strong>
                      </div>

                      <div>
                        <span>Días en espera</span>
                        <strong>{request.waitingDays} días</strong>
                      </div>

                      <div>
                        <span>Prioridad</span>
                        <strong>{request.priority}</strong>
                      </div>
                    </div>

                    <div className="waitlist-actions">
                      <IonButton expand="block" className="app-primary-btn">
                        <IonIcon icon={checkmarkCircleOutline} slot="start" />
                        Marcar revisado
                      </IonButton>

                      <IonButton
                        expand="block"
                        fill="outline"
                        routerLink="/admin/agenda"
                        className="app-outline-btn"
                      >
                        <IonIcon icon={calendarOutline} slot="start" />
                        Agendar
                      </IonButton>

                      <IonButton
                        expand="block"
                        fill="clear"
                        routerLink="/admin/pacientes"
                        className="waitlist-clear-btn"
                      >
                        <IonIcon icon={swapHorizontalOutline} slot="start" />
                        Reasignar
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>

            <IonCard className="app-card admin-listas-side-panel">
              <IonCardContent>
                <div className="section-title">
                  <h2>Criterios de priorización</h2>
                  <p>
                    Resumen para apoyar la toma de decisiones administrativas.
                  </p>
                </div>

                <div className="criteria-list">
                  <div>
                    <IonIcon icon={alertCircleOutline} />
                    <div>
                      <strong>Prioridad alta</strong>
                      <span>
                        Pacientes con espera prolongada o derivación crítica.
                      </span>
                    </div>
                  </div>

                  <div>
                    <IonIcon icon={timeOutline} />
                    <div>
                      <strong>Tiempo de espera</strong>
                      <span>Casos con más de 30 días deben ser revisados.</span>
                    </div>
                  </div>

                  <div>
                    <IonIcon icon={medicalOutline} />
                    <div>
                      <strong>Especialidad saturada</strong>
                      <span>
                        Revisar disponibilidad de otros centros de atención.
                      </span>
                    </div>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  routerLink="/admin/reportes"
                  className="app-primary-btn side-panel-action"
                >
                  Ver reportes de saturación
                </IonButton>
              </IonCardContent>
            </IonCard>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AdminListas;