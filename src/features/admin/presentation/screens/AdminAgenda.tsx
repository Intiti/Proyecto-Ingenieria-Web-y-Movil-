import { useEffect, useMemo, useState } from "react";

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
  IonSpinner,
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

import { apiRequest } from "../../../../services/api";
import "./AdminAgenda.css";

type EstadoCita = "PROGRAMADA" | "CONFIRMADA" | "REALIZADA" | "CANCELADA";

type Cita = {
  id: string;
  fecha: string;
  hora: string;
  box: string | null;
  estado: EstadoCita;
  centroSalud: { id: string; nombre: string; comuna: string };
  especialidad: { id: string; nombre: string };
  paciente: {
    id: string;
    usuario: { id: string; nombre: string; rut: string };
  };
};

type CitasResponse = { ok: boolean; citas: Cita[] };

const estadoLabel: Record<EstadoCita, string> = {
  PROGRAMADA: "Pendiente",
  CONFIRMADA: "Confirmada",
  REALIZADA: "Realizada",
  CANCELADA: "Cancelada",
};

const estadoBadge: Record<EstadoCita, string> = {
  PROGRAMADA: "badge-warning",
  CONFIRMADA: "badge-success",
  REALIZADA: "badge-info",
  CANCELADA: "badge-danger",
};

type FiltroEstado = "todos" | "PROGRAMADA" | "CONFIRMADA" | "REALIZADA";

const AdminAgenda: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>("todos");
  const [filtroCentro, setFiltroCentro] = useState("todos");

  useEffect(() => {
    apiRequest<CitasResponse>("/citas")
      .then((data) => setCitas(data.citas))
      .catch(() => setError("No se pudo cargar la agenda."))
      .finally(() => setLoading(false));
  }, []);

  const centros = useMemo(() => {
    const nombres = [...new Set(citas.map((c) => c.centroSalud.nombre))];
    return nombres;
  }, [citas]);

  const filtradas = useMemo(() => {
    return citas.filter((c) => {
      const okEstado = filtroEstado === "todos" || c.estado === filtroEstado;
      const okCentro = filtroCentro === "todos" || c.centroSalud.nombre === filtroCentro;
      return okEstado && okCentro;
    });
  }, [citas, filtroEstado, filtroCentro]);

  const confirmedCount = citas.filter((c) => c.estado === "CONFIRMADA").length;
  const pendingCount = citas.filter((c) => c.estado === "PROGRAMADA").length;
  const doneCount = citas.filter((c) => c.estado === "REALIZADA").length;

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Agenda administrativa</IonTitle>

          <IonButtons slot="end">
            <IonButton routerLink="/admin/dashboard" fill="clear" className="app-header-btn">
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
              <h1>Agenda administrativa</h1>
              <p>Gestiona las citas médicas del día, confirma asistencias y coordina disponibilidad.</p>
            </div>
          </section>

          <section className="kpi-grid">
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
                <IonIcon icon={calendarOutline} />
                <div>
                  <strong>{doneCount}</strong>
                  <span>Realizadas</span>
                </div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />
                <div>
                  <strong>{citas.length}</strong>
                  <span>Total citas</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <IonCard className="app-card admin-agenda-filters">
            <IonCardContent>
              <IonSelect
                value={filtroEstado}
                placeholder="Estado"
                className="admin-agenda-select"
                onIonChange={(e) => setFiltroEstado(e.detail.value)}
              >
                <IonSelectOption value="todos">Todos los estados</IonSelectOption>
                <IonSelectOption value="PROGRAMADA">Pendiente</IonSelectOption>
                <IonSelectOption value="CONFIRMADA">Confirmada</IonSelectOption>
                <IonSelectOption value="REALIZADA">Realizada</IonSelectOption>
              </IonSelect>

              <IonSelect
                value={filtroCentro}
                placeholder="Centro"
                className="admin-agenda-select"
                onIonChange={(e) => setFiltroCentro(e.detail.value)}
              >
                <IonSelectOption value="todos">Todos los centros</IonSelectOption>
                {centros.map((c) => (
                  <IonSelectOption key={c} value={c}>{c}</IonSelectOption>
                ))}
              </IonSelect>
            </IonCardContent>
          </IonCard>

          {loading && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <IonSpinner name="crescent" />
            </div>
          )}

          {error && (
            <IonCard className="app-card">
              <IonCardContent>
                <p style={{ color: "var(--ion-color-danger)" }}>{error}</p>
              </IonCardContent>
            </IonCard>
          )}

          {!loading && !error && (
            <section className="admin-agenda-layout">
              <div className="admin-appointments-list">
                {filtradas.length === 0 ? (
                  <IonCard className="app-card">
                    <IonCardContent>
                      <p style={{ color: "#777" }}>No hay citas para mostrar.</p>
                    </IonCardContent>
                  </IonCard>
                ) : (
                  filtradas.map((cita) => (
                    <IonCard key={cita.id} className="app-card admin-appointment-card">
                      <IonCardContent>
                        <div className="admin-appointment-top">
                          <div className="admin-appointment-date">
                            <strong>{cita.hora}</strong>
                            <span>{new Date(cita.fecha).toLocaleDateString("es-CL")}</span>
                          </div>

                          <IonBadge className={estadoBadge[cita.estado]}>
                            {estadoLabel[cita.estado]}
                          </IonBadge>
                        </div>

                        <h2>{cita.especialidad.nombre}</h2>

                        <p className="admin-appointment-patient">
                          {cita.paciente.usuario.nombre}
                        </p>

                        <div className="admin-appointment-info">
                          <div>
                            <IonIcon icon={locationOutline} />
                            <span>{cita.centroSalud.nombre}</span>
                          </div>
                          <div>
                            <IonIcon icon={calendarOutline} />
                            <span>{cita.box ? `Box ${cita.box}` : "Sin box asignado"}</span>
                          </div>
                          <div>
                            <IonIcon icon={peopleOutline} />
                            <span>{cita.paciente.usuario.rut}</span>
                          </div>
                        </div>

                        <div className="admin-appointment-actions">
                          <IonButton expand="block" className="app-primary-btn">
                            Confirmar
                          </IonButton>
                          <IonButton expand="block" fill="outline" className="app-outline-btn">
                            Reagendar
                          </IonButton>
                          <IonButton expand="block" fill="clear" className="agenda-clear-btn">
                            Marcar asistencia
                          </IonButton>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  ))
                )}
              </div>

              <IonCard className="app-card admin-agenda-availability">
                <IonCardContent>
                  <div className="section-title">
                    <h2>Disponibilidad del día</h2>
                    <p>Resumen operativo de bloques disponibles.</p>
                  </div>

                  <div className="availability-list">
                    {centros.length === 0 ? (
                      <p style={{ color: "#777" }}>Sin datos disponibles.</p>
                    ) : (
                      centros.map((centro) => {
                        const libres = citas.filter(
                          (c) => c.centroSalud.nombre === centro && c.estado === "PROGRAMADA"
                        ).length;
                        return (
                          <div key={centro}>
                            <span>{centro}</span>
                            <strong>{libres} cita{libres !== 1 ? "s" : ""} pendiente{libres !== 1 ? "s" : ""}</strong>
                          </div>
                        );
                      })
                    )}
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
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AdminAgenda;