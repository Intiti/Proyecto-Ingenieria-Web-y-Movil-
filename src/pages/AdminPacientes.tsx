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
  IonInput,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  callOutline,
  documentTextOutline,
  homeOutline,
  mailOutline,
  peopleOutline,
  searchOutline,
  swapHorizontalOutline,
  timeOutline,
} from "ionicons/icons";

import "./AdminPacientes.css";

type PatientStatus = "todos" | "en-espera" | "agendado" | "prioritario";

const patients = [
  {
    name: "María Muñoz Pérez",
    rut: "12.345.678-9",
    phone: "+56 9 8765 4321",
    email: "maria.munoz@email.com",
    commune: "Santo Domingo",
    request: "Consulta traumatología",
    status: "prioritario",
    statusLabel: "Prioritario",
    waitingDays: 36,
    center: "CESFAM Santo Domingo",
  },
  {
    name: "Carlos Rojas Díaz",
    rut: "18.456.789-0",
    phone: "+56 9 2222 3344",
    email: "carlos.rojas@email.com",
    commune: "San Antonio",
    request: "Evaluación cardiología",
    status: "en-espera",
    statusLabel: "En espera",
    waitingDays: 28,
    center: "Centro Médico Municipal",
  },
  {
    name: "Ana Soto Vera",
    rut: "16.234.987-1",
    phone: "+56 9 1111 2233",
    email: "ana.soto@email.com",
    commune: "Santo Domingo",
    request: "Examen de laboratorio",
    status: "agendado",
    statusLabel: "Agendado",
    waitingDays: 12,
    center: "Unidad de Apoyo Clínico",
  },
  {
    name: "Luis Herrera Núñez",
    rut: "14.876.222-4",
    phone: "+56 9 5555 6677",
    email: "luis.herrera@email.com",
    commune: "Santo Domingo",
    request: "Medicina general",
    status: "en-espera",
    statusLabel: "En espera",
    waitingDays: 19,
    center: "Posta Rural El Convento",
  },
];

const AdminPacientes: React.FC = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PatientStatus>("todos");

  const filteredPatients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(normalizedSearch) ||
        patient.rut.toLowerCase().includes(normalizedSearch) ||
        patient.request.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "todos" || patient.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const priorityCount = patients.filter(
    (patient) => patient.status === "prioritario",
  ).length;

  const waitingCount = patients.filter(
    (patient) => patient.status === "en-espera",
  ).length;

  const scheduledCount = patients.filter(
    (patient) => patient.status === "agendado",
  ).length;

  return (
    <IonPage>
      <IonHeader className="admin-patients-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Gestión de pacientes</IonTitle>

          <IonButtons slot="end">
            <IonButton
              routerLink="/admin/dashboard"
              fill="clear"
              className="admin-patients-home-btn"
            >
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="admin-patients-page">
        <main className="admin-patients-shell">
          <section className="admin-patients-hero">
            <div>
              <p className="admin-patients-eyebrow">Administración</p>
              <h1>Gestionar pacientes</h1>
              <p>
                Busca pacientes, revisa solicitudes, detecta prioridades y
                deriva casos según disponibilidad de atención.
              </p>
            </div>
          </section>

          <section className="admin-patients-summary">
            <IonCard className="admin-patients-summary-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />
                <div>
                  <strong>{patients.length}</strong>
                  <span>Total pacientes</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="admin-patients-summary-card">
              <IonCardContent>
                <IonIcon icon={timeOutline} />
                <div>
                  <strong>{waitingCount}</strong>
                  <span>En espera</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="admin-patients-summary-card">
              <IonCardContent>
                <IonIcon icon={documentTextOutline} />
                <div>
                  <strong>{scheduledCount}</strong>
                  <span>Agendados</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="admin-patients-summary-card">
              <IonCardContent>
                <IonIcon icon={swapHorizontalOutline} />
                <div>
                  <strong>{priorityCount}</strong>
                  <span>Prioritarios</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <IonCard className="admin-patients-filters">
            <IonCardContent>
              <div className="admin-patients-search">
                <IonIcon icon={searchOutline} />
                <IonInput
                  value={search}
                  placeholder="Buscar por nombre, RUT o solicitud"
                  aria-label="Buscar paciente"
                  onIonInput={(event) =>
                    setSearch(event.detail.value?.toString() ?? "")
                  }
                />
              </div>

              <IonSelect
                value={status}
                interface="popover"
                label="Estado"
                labelPlacement="stacked"
                className="admin-patients-select"
                onIonChange={(event) =>
                  setStatus(event.detail.value as PatientStatus)
                }
              >
                <IonSelectOption value="todos">Todos</IonSelectOption>
                <IonSelectOption value="en-espera">En espera</IonSelectOption>
                <IonSelectOption value="agendado">Agendado</IonSelectOption>
                <IonSelectOption value="prioritario">
                  Prioritario
                </IonSelectOption>
              </IonSelect>
            </IonCardContent>
          </IonCard>

          <section className="admin-patients-list">
            {filteredPatients.map((patient) => (
              <IonCard className="admin-patient-card" key={patient.rut}>
                <IonCardContent>
                  <div className="admin-patient-top">
                    <div>
                      <h2>{patient.name}</h2>
                      <p>{patient.rut}</p>
                    </div>

                    <IonBadge
                      className={
                        patient.status === "prioritario"
                          ? "badge-danger"
                          : patient.status === "agendado"
                            ? "badge-success"
                            : "badge-warning"
                      }
                    >
                      {patient.statusLabel}
                    </IonBadge>
                  </div>

                  <div className="admin-patient-info">
                    <div>
                      <span>Solicitud</span>
                      <strong>{patient.request}</strong>
                    </div>

                    <div>
                      <span>Centro asignado</span>
                      <strong>{patient.center}</strong>
                    </div>

                    <div>
                      <span>Días en espera</span>
                      <strong>{patient.waitingDays} días</strong>
                    </div>

                    <div>
                      <span>Comuna</span>
                      <strong>{patient.commune}</strong>
                    </div>
                  </div>

                  <div className="admin-patient-contact">
                    <p>
                      <IonIcon icon={callOutline} />
                      {patient.phone}
                    </p>

                    <p>
                      <IonIcon icon={mailOutline} />
                      {patient.email}
                    </p>
                  </div>

                  <div className="admin-patient-actions">
                    <IonButton expand="block" routerLink="/admin/listas">
                      Revisar solicitud
                    </IonButton>

                    <IonButton
                      expand="block"
                      fill="outline"
                      routerLink="/admin/agenda"
                    >
                      Reasignar / agendar
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AdminPacientes;