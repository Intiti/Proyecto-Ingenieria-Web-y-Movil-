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
  calendarOutline,
  checkmarkCircleOutline,
  homeOutline,
  locationOutline,
  peopleOutline,
  timeOutline,
} from "ionicons/icons";

import "./AdminAgenda.css";

type AgendaStatus = "todos" | "confirmada" | "pendiente" | "realizada";

const appointments = [
  {
    patient: "María Muñoz Pérez",
    service: "Control médico general",
    date: "20 mayo 2026",
    time: "09:30",
    center: "CESFAM Santo Domingo",
    box: "Box 4",
    professional: "Dra. Carolina Pérez",
    status: "confirmada",
    statusLabel: "Confirmada",
  },
  {
    patient: "Carlos Rojas Díaz",
    service: "Evaluación cardiología",
    date: "20 mayo 2026",
    time: "10:15",
    center: "Centro Médico Municipal",
    box: "Box 2",
    professional: "Dr. Felipe Araya",
    status: "pendiente",
    statusLabel: "Pendiente",
  },
  {
    patient: "Ana Soto Vera",
    service: "Examen de laboratorio",
    date: "20 mayo 2026",
    time: "08:20",
    center: "Unidad de Apoyo Clínico",
    box: "Laboratorio",
    professional: "TENS Marcela Ruiz",
    status: "realizada",
    statusLabel: "Realizada",
  },
  {
    patient: "Luis Herrera Núñez",
    service: "Medicina general",
    date: "21 mayo 2026",
    time: "11:00",
    center: "Posta Rural El Convento",
    box: "Box 1",
    professional: "Dr. Ignacio Morales",
    status: "confirmada",
    statusLabel: "Confirmada",
  },
];

const AdminAgenda: React.FC = () => {
  const [status, setStatus] = useState<AgendaStatus>("todos");
  const [center, setCenter] = useState("todos");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesStatus = status === "todos" || appointment.status === status;
      const matchesCenter = center === "todos" || appointment.center === center;

      return matchesStatus && matchesCenter;
    });
  }, [status, center]);

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "confirmada",
  ).length;

  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "pendiente",
  ).length;

  const doneCount = appointments.filter(
    (appointment) => appointment.status === "realizada",
  ).length;

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Agenda administrativa</IonTitle>

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

      <IonContent className="app-page admin-agenda-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Coordinación diaria</p>
              <h1>Revisar agenda médica</h1>
              <p>
                Coordina citas, revisa disponibilidad, confirma atenciones y
                detecta horarios pendientes de gestión.
              </p>
            </div>
          </section>

          <section className="kpi-grid">
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={calendarOutline} />
                <div>
                  <strong>{appointments.length}</strong>
                  <span>Citas totales</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={checkmarkCircleOutline} />
                <div>
                  <strong>{confirmedCount}</strong>
                  <span>Confirmadas</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={timeOutline} />
                <div>
                  <strong>{pendingCount}</strong>
                  <span>Pendientes</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />
                <div>
                  <strong>{doneCount}</strong>
                  <span>Realizadas</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <IonCard className="app-card admin-agenda-filters">
            <IonCardContent>
              <IonSelect
                value={status}
                interface="popover"
                label="Estado"
                labelPlacement="stacked"
                className="admin-agenda-select"
                onIonChange={(event) =>
                  setStatus(event.detail.value as AgendaStatus)
                }
              >
                <IonSelectOption value="todos">Todos</IonSelectOption>
                <IonSelectOption value="confirmada">Confirmada</IonSelectOption>
                <IonSelectOption value="pendiente">Pendiente</IonSelectOption>
                <IonSelectOption value="realizada">Realizada</IonSelectOption>
              </IonSelect>

              <IonSelect
                value={center}
                interface="popover"
                label="Centro"
                labelPlacement="stacked"
                className="admin-agenda-select"
                onIonChange={(event) =>
                  setCenter(event.detail.value?.toString() ?? "todos")
                }
              >
                <IonSelectOption value="todos">Todos</IonSelectOption>
                <IonSelectOption value="CESFAM Santo Domingo">
                  CESFAM Santo Domingo
                </IonSelectOption>
                <IonSelectOption value="Centro Médico Municipal">
                  Centro Médico Municipal
                </IonSelectOption>
                <IonSelectOption value="Unidad de Apoyo Clínico">
                  Unidad de Apoyo Clínico
                </IonSelectOption>
                <IonSelectOption value="Posta Rural El Convento">
                  Posta Rural El Convento
                </IonSelectOption>
              </IonSelect>
            </IonCardContent>
          </IonCard>

          <section className="admin-agenda-layout">
            <div className="admin-agenda-list">
              {filteredAppointments.map((appointment) => (
                <IonCard
                  className="app-card admin-appointment-card"
                  key={`${appointment.patient}-${appointment.time}`}
                >
                  <IonCardContent>
                    <div className="admin-appointment-top">
                      <div className="admin-appointment-date">
                        <strong>{appointment.time}</strong>
                        <span>{appointment.date}</span>
                      </div>

                      <IonBadge
                        className={
                          appointment.status === "confirmada"
                            ? "badge-success"
                            : appointment.status === "realizada"
                              ? "badge-info"
                              : "badge-warning"
                        }
                      >
                        {appointment.statusLabel}
                      </IonBadge>
                    </div>

                    <h2>{appointment.service}</h2>

                    <p className="admin-appointment-patient">
                      {appointment.patient}
                    </p>

                    <div className="admin-appointment-info">
                      <div>
                        <IonIcon icon={locationOutline} />
                        <span>{appointment.center}</span>
                      </div>

                      <div>
                        <IonIcon icon={calendarOutline} />
                        <span>{appointment.box}</span>
                      </div>

                      <div>
                        <IonIcon icon={peopleOutline} />
                        <span>{appointment.professional}</span>
                      </div>
                    </div>

                    <div className="admin-appointment-actions">
                      <IonButton expand="block" className="app-primary-btn">
                        Confirmar
                      </IonButton>

                      <IonButton
                        expand="block"
                        fill="outline"
                        className="app-outline-btn"
                      >
                        Reagendar
                      </IonButton>

                      <IonButton
                        expand="block"
                        fill="clear"
                        className="agenda-clear-btn"
                      >
                        Marcar asistencia
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>

            <IonCard className="app-card admin-agenda-availability">
              <IonCardContent>
                <div className="section-title">
                  <h2>Disponibilidad del día</h2>
                  <p>Resumen operativo de bloques disponibles.</p>
                </div>

                <div className="availability-list">
                  <div>
                    <span>CESFAM Santo Domingo</span>
                    <strong>3 cupos libres</strong>
                  </div>

                  <div>
                    <span>Centro Médico Municipal</span>
                    <strong>1 cupo libre</strong>
                  </div>

                  <div>
                    <span>Unidad de Apoyo Clínico</span>
                    <strong>5 cupos libres</strong>
                  </div>

                  <div>
                    <span>Posta Rural El Convento</span>
                    <strong>2 cupos libres</strong>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  routerLink="/admin/listas"
                  className="app-primary-btn availability-action"
                >
                  Asignar pacientes desde lista de espera
                </IonButton>
              </IonCardContent>
            </IonCard>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AdminAgenda;