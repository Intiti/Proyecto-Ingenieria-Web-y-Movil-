import { useEffect, useState } from "react";
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
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  calendarOutline,
  checkmarkCircleOutline,
  hourglassOutline,
  homeOutline,
} from "ionicons/icons";

import { apiRequest } from "../../../../services/api";
import "./Solicitudes.css";

type Especialidad = { id: string; nombre: string };
type CentroSalud = { id: string; nombre: string; comuna: string };

type Solicitud = {
  id: string;
  motivo: string;
  estado: "EN_ESPERA" | "AGENDADA" | "FINALIZADA" | "CANCELADA";
  prioridad: "BAJA" | "MEDIA" | "ALTA";
  diasEspera: number;
  fechaSolicitud: string;
  fechaEstimada: string | null;
  especialidad: Especialidad;
  centroSalud: CentroSalud | null;
};

type SolicitudesResponse = { ok: boolean; solicitudes: Solicitud[] };

const estadoLabel: Record<Solicitud["estado"], string> = {
  EN_ESPERA: "En espera",
  AGENDADA: "Agendada",
  FINALIZADA: "Finalizada",
  CANCELADA: "Cancelada",
};

const estadoBadgeClass: Record<Solicitud["estado"], string> = {
  EN_ESPERA: "badge-warning",
  AGENDADA: "badge-success",
  FINALIZADA: "badge-info",
  CANCELADA: "badge-danger",
};

const Solicitudes: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest<SolicitudesResponse>("/solicitudes/mis-solicitudes")
      .then((data) => setSolicitudes(data.solicitudes))
      .catch(() => setError("No se pudo cargar la lista de espera."))
      .finally(() => setLoading(false));
  }, []);

  const enEspera = solicitudes.filter((s) => s.estado === "EN_ESPERA").length;
  const agendadas = solicitudes.filter((s) => s.estado === "AGENDADA").length;
  const finalizadas = solicitudes.filter((s) => s.estado === "FINALIZADA").length;

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lista de espera</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/home" fill="clear" className="app-header-btn">
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page solicitudes-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Estado de atención</p>
              <h1>Consulta tu lista de espera</h1>
              <p>Revisa el avance de tus solicitudes médicas.</p>
            </div>
          </section>

          <section className="kpi-grid three-columns">
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={hourglassOutline} />
                <div>
                  <strong>{enEspera}</strong>
                  <span>En espera</span>
                </div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={calendarOutline} />
                <div>
                  <strong>{agendadas}</strong>
                  <span>Agendadas</span>
                </div>
              </IonCardContent>
            </IonCard>
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={checkmarkCircleOutline} />
                <div>
                  <strong>{finalizadas}</strong>
                  <span>Finalizadas</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

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

          {!loading && !error && solicitudes.length === 0 && (
            <IonCard className="app-card">
              <IonCardContent>
                <p>No tienes solicitudes registradas.</p>
              </IonCardContent>
            </IonCard>
          )}

          <section className="request-list">
            {solicitudes.map((sol) => (
              <IonCard key={sol.id} className="app-card request-card">
                <IonCardContent>
                  <div className="request-top">
                    <div>
                      <h2>{sol.especialidad.nombre}</h2>
                      <p>
                        Ingresada el{" "}
                        {new Date(sol.fechaSolicitud).toLocaleDateString("es-CL")}
                      </p>
                    </div>
                    <IonBadge className={estadoBadgeClass[sol.estado]}>
                      {estadoLabel[sol.estado]}
                    </IonBadge>
                  </div>

                  <div className="request-info">
                    <div>
                      <span>Prioridad</span>
                      <strong>{sol.prioridad}</strong>
                    </div>
                    <div>
                      <span>Centro asignado</span>
                      <strong>{sol.centroSalud?.nombre ?? "Sin asignar"}</strong>
                    </div>
                    <div>
                      <span>Días en espera</span>
                      <strong>{sol.diasEspera}</strong>
                    </div>
                  </div>

                  {sol.motivo && (
                    <p style={{ marginTop: "8px", fontSize: "14px", color: "#555" }}>
                      {sol.motivo}
                    </p>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Solicitudes;
