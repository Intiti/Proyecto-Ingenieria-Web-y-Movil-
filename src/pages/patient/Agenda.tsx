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
  homeOutline,
  locationOutline,
  medicalOutline,
  timeOutline,
  alertCircleOutline,
} from "ionicons/icons";

import { apiRequest } from "../../services/api";
import "./Agenda.css";

type Cita = {
  id: string;
  fecha: string;
  hora: string;
  box: string | null;
  estado: "PROGRAMADA" | "CONFIRMADA" | "REALIZADA" | "CANCELADA";
  centroSalud: { id: string; nombre: string; comuna: string };
  especialidad: { id: string; nombre: string };
};

type CitasResponse = { ok: boolean; citas: Cita[] };

const estadoLabel: Record<Cita["estado"], string> = {
  PROGRAMADA: "Programada",
  CONFIRMADA: "Confirmada",
  REALIZADA: "Realizada",
  CANCELADA: "Cancelada",
};

const estadoBadgeClass: Record<Cita["estado"], string> = {
  PROGRAMADA: "badge-warning",
  CONFIRMADA: "badge-success",
  REALIZADA: "badge-info",
  CANCELADA: "badge-danger",
};

const MESES = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];

const Agenda: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest<CitasResponse>("/citas/mis-citas")
      .then((data) => setCitas(data.citas))
      .catch(() => setError("No se pudo cargar la agenda médica."))
      .finally(() => setLoading(false));
  }, []);

  const proximas = citas.filter((c) => c.estado === "PROGRAMADA" || c.estado === "CONFIRMADA");
  const historial = citas.filter((c) => c.estado === "REALIZADA");
  const proximaCita = proximas[0] ?? null;

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Agenda médica</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/home" fill="clear" className="app-header-btn">
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page agenda-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Atenciones programadas</p>
              <h1>Revisa tus próximas citas médicas</h1>
              <p>Consulta fecha, hora y lugar de tus atenciones en la red municipal.</p>
            </div>
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

          {!loading && !error && (
            <>
              {proximaCita && (
                <section className="next-appointment">
                  <IonCard className="app-card next-card">
                    <IonCardContent>
                      <div className="next-card-header">
                        <div className="next-icon">
                          <IonIcon icon={calendarOutline} />
                        </div>
                        <div>
                          <IonBadge className="badge-info">Próxima cita</IonBadge>
                          <h2>{proximaCita.especialidad.nombre}</h2>
                          <p>{proximaCita.centroSalud.nombre}</p>
                        </div>
                      </div>
                      <div className="next-details">
                        <div>
                          <IonIcon icon={calendarOutline} />
                          <span>Fecha</span>
                          <strong>
                            {new Date(proximaCita.fecha).toLocaleDateString("es-CL")}
                          </strong>
                        </div>
                        <div>
                          <IonIcon icon={timeOutline} />
                          <span>Hora</span>
                          <strong>{proximaCita.hora}</strong>
                        </div>
                        <div>
                          <IonIcon icon={locationOutline} />
                          <span>Lugar</span>
                          <strong>
                            {proximaCita.box ? `Box ${proximaCita.box}` : proximaCita.centroSalud.comuna}
                          </strong>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>

                  <IonCard className="app-card reminder-card">
                    <IonCardContent>
                      <IonIcon icon={alertCircleOutline} />
                      <h3>Recuerda llegar 15 minutos antes</h3>
                      <p>Lleva tu cédula de identidad y llega con anticipación.</p>
                    </IonCardContent>
                  </IonCard>
                </section>
              )}

              <section className="kpi-grid three-columns">
                <IonCard className="kpi-card">
                  <IonCardContent>
                    <IonIcon icon={calendarOutline} />
                    <div>
                      <strong>{proximas.length}</strong>
                      <span>Citas próximas</span>
                    </div>
                  </IonCardContent>
                </IonCard>
                <IonCard className="kpi-card">
                  <IonCardContent>
                    <IonIcon icon={checkmarkCircleOutline} />
                    <div>
                      <strong>{historial.length}</strong>
                      <span>Citas realizadas</span>
                    </div>
                  </IonCardContent>
                </IonCard>
                <IonCard className="kpi-card">
                  <IonCardContent>
                    <IonIcon icon={medicalOutline} />
                    <div>
                      <strong>{citas.length}</strong>
                      <span>Total citas</span>
                    </div>
                  </IonCardContent>
                </IonCard>
              </section>

              <section className="agenda-content">
                <div className="app-card agenda-panel">
                  <div className="section-title">
                    <h2>Próximas atenciones</h2>
                    <p>Citas programadas asociadas a tu atención municipal.</p>
                  </div>

                  {proximas.length === 0 ? (
                    <p style={{ padding: "16px", color: "#777" }}>No tienes citas próximas.</p>
                  ) : (
                    <div className="appointment-list">
                      {proximas.map((cita) => {
                        const fecha = new Date(cita.fecha);
                        return (
                          <article key={cita.id} className="appointment-item">
                            <div className="appointment-date">
                              <strong>{fecha.getDate()}</strong>
                              <span>{MESES[fecha.getMonth()]}</span>
                            </div>
                            <div className="appointment-info">
                              <div className="appointment-top">
                                <h3>{cita.especialidad.nombre}</h3>
                                <IonBadge className={estadoBadgeClass[cita.estado]}>
                                  {estadoLabel[cita.estado]}
                                </IonBadge>
                              </div>
                              <p>
                                <IonIcon icon={timeOutline} />
                                {cita.hora} · {cita.centroSalud.nombre}
                              </p>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>

                {historial.length > 0 && (
                  <div className="app-card agenda-panel">
                    <div className="section-title">
                      <h2>Historial reciente</h2>
                      <p>Últimas atenciones registradas en el sistema.</p>
                    </div>
                    <div className="history-list">
                      {historial.map((cita) => (
                        <div key={cita.id} className="history-item">
                          <IonIcon icon={checkmarkCircleOutline} />
                          <div>
                            <strong>{cita.especialidad.nombre}</strong>
                            <span>
                              Realizada el{" "}
                              {new Date(cita.fecha).toLocaleDateString("es-CL")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Agenda;
