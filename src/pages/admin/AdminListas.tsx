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
  alertCircleOutline,
  calendarOutline,
  checkmarkCircleOutline,
  homeOutline,
  medicalOutline,
  peopleOutline,
  swapHorizontalOutline,
  timeOutline,
} from "ionicons/icons";

import { apiRequest } from "../../services/api";
import "./AdminListas.css";

type Solicitud = {
  id: string;
  motivo: string;
  estado: "EN_ESPERA" | "AGENDADA" | "FINALIZADA" | "CANCELADA";
  prioridad: "BAJA" | "MEDIA" | "ALTA";
  diasEspera: number;
  fechaSolicitud: string;
  especialidad: { id: string; nombre: string };
  centroSalud: { id: string; nombre: string } | null;
  paciente: {
    id: string;
    usuario: { id: string; rut: string; nombre: string };
  };
};

type SolicitudesResponse = { ok: boolean; solicitudes: Solicitud[] };

type FiltroEstado = "todos" | "EN_ESPERA" | "AGENDADA" | "prioritario";

const estadoLabel: Record<Solicitud["estado"], string> = {
  EN_ESPERA: "En espera",
  AGENDADA: "Agendada",
  FINALIZADA: "Finalizada",
  CANCELADA: "Cancelada",
};

const estadoBadge: Record<Solicitud["estado"], string> = {
  EN_ESPERA: "badge-warning",
  AGENDADA: "badge-success",
  FINALIZADA: "badge-info",
  CANCELADA: "badge-danger",
};

const AdminListas: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState<FiltroEstado>("todos");

  useEffect(() => {
    apiRequest<SolicitudesResponse>("/solicitudes")
      .then((data) => setSolicitudes(data.solicitudes))
      .catch(() => setError("No se pudo cargar la lista de espera."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filtro === "todos") return solicitudes;
    if (filtro === "prioritario") return solicitudes.filter((s) => s.prioridad === "ALTA");
    return solicitudes.filter((s) => s.estado === filtro);
  }, [solicitudes, filtro]);

  const enEspera = solicitudes.filter((s) => s.estado === "EN_ESPERA").length;
  const agendadas = solicitudes.filter((s) => s.estado === "AGENDADA").length;
  const alta = solicitudes.filter((s) => s.prioridad === "ALTA").length;

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lista de espera</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/admin/dashboard" fill="clear" className="app-header-btn">
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page admin-listas-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Administración</p>
              <h1>Gestión de listas de espera</h1>
              <p>Visualiza y gestiona las solicitudes médicas activas.</p>
            </div>
          </section>

          <section className="kpi-grid">
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />
                <div><strong>{solicitudes.length}</strong><span>Total solicitudes</span></div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={timeOutline} />
                <div><strong>{enEspera}</strong><span>En espera</span></div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={checkmarkCircleOutline} />
                <div><strong>{agendadas}</strong><span>Agendadas</span></div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={alertCircleOutline} />
                <div><strong>{alta}</strong><span>Prioridad alta</span></div>
              </IonCardContent>
            </IonCard>
          </section>

          <IonCard className="app-card">
            <IonCardContent>
              <IonSelect
                value={filtro}
                interface="popover"
                label="Filtrar por"
                labelPlacement="stacked"
                onIonChange={(e) => setFiltro(e.detail.value as FiltroEstado)}
              >
                <IonSelectOption value="todos">Todos</IonSelectOption>
                <IonSelectOption value="EN_ESPERA">En espera</IonSelectOption>
                <IonSelectOption value="AGENDADA">Agendados</IonSelectOption>
                <IonSelectOption value="prioritario">Prioridad alta</IonSelectOption>
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

          <section className="admin-listas-layout">
            <div className="waitlist-column">
              {filtered.map((sol) => (
                <IonCard key={sol.id} className="app-card waitlist-card">
                  <IonCardContent>
                    <div className="waitlist-top">
                      <div>
                        <h2>{sol.especialidad.nombre}</h2>
                        <p>{sol.paciente.usuario.nombre} · {sol.paciente.usuario.rut}</p>
                      </div>
                      <IonBadge className={estadoBadge[sol.estado]}>
                        {estadoLabel[sol.estado]}
                      </IonBadge>
                    </div>

                    <div className="waitlist-info">
                      <div>
                        <span>Prioridad</span>
                        <strong
                          style={{ color: sol.prioridad === "ALTA" ? "var(--ion-color-danger)" : "inherit" }}
                        >
                          {sol.prioridad}
                        </strong>
                      </div>
                      <div>
                        <span>Centro</span>
                        <strong>{sol.centroSalud?.nombre ?? "Sin asignar"}</strong>
                      </div>
                      <div>
                        <span>Días espera</span>
                        <strong>{sol.diasEspera}</strong>
                      </div>
                      <div>
                        <span>Ingresada</span>
                        <strong>{new Date(sol.fechaSolicitud).toLocaleDateString("es-CL")}</strong>
                      </div>
                    </div>

                    <p style={{ fontSize: "14px", color: "#555", marginTop: "8px" }}>{sol.motivo}</p>

                    <div className="waitlist-actions">
                      <IonButton expand="block" fill="outline" routerLink="/admin/agenda" className="app-outline-btn">
                        <IonIcon icon={calendarOutline} slot="start" />
                        Agendar
                      </IonButton>
                      <IonButton expand="block" fill="clear" routerLink="/admin/pacientes" className="waitlist-clear-btn">
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
                  <p>Resumen para apoyar la toma de decisiones.</p>
                </div>
                <div className="criteria-list">
                  <div>
                    <IonIcon icon={alertCircleOutline} />
                    <div>
                      <strong>Prioridad alta</strong>
                      <span>Pacientes con espera prolongada o derivación crítica.</span>
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
                      <span>Revisar disponibilidad de otros centros.</span>
                    </div>
                  </div>
                </div>
                <IonButton expand="block" routerLink="/admin/reportes" className="app-primary-btn side-panel-action">
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
