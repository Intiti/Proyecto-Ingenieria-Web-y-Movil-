import { useEffect, useState } from "react";

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
} from "@ionic/react";

import {
  flaskOutline,
  timeOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  documentTextOutline,
  homeOutline,
} from "ionicons/icons";

import { apiRequest } from "../../../../services/api";
import "./Examenes.css";

type EstadoExamen = "PENDIENTE" | "EN_PROCESO" | "COMPLETADO";

type Examen = {
  id: string;
  nombre: string;
  estado: EstadoExamen;
  fecha: string | null;
  instrucciones: string | null;
};

type ExamenesResponse = { ok: boolean; examenes: Examen[] };

const estadoLabel: Record<EstadoExamen, string> = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  COMPLETADO: "Completado",
};

const estadoVariant: Record<EstadoExamen, string> = {
  PENDIENTE: "orange",
  EN_PROCESO: "blue",
  COMPLETADO: "green",
};

const estadoIcon: Record<EstadoExamen, string> = {
  PENDIENTE: alertCircleOutline,
  EN_PROCESO: timeOutline,
  COMPLETADO: checkmarkCircleOutline,
};

type FiltroExamen = "Todos" | "Pendiente" | "En proceso" | "Completado";

const Examenes: React.FC = () => {
  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FiltroExamen>("Todos");

  useEffect(() => {
    apiRequest<ExamenesResponse>("/examenes/mis-examenes")
      .then((data) => setExamenes(data.examenes))
      .catch(() => setError("No se pudo cargar los exámenes."))
      .finally(() => setLoading(false));
  }, []);

  const filteredList = examenes.filter((e) => {
    if (filter === "Todos") return true;
    return estadoLabel[e.estado] === filter;
  });

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Exámenes</IonTitle>

          <IonButtons slot="end">
            <IonButton routerLink="/home" fill="clear" className="app-header-btn">
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page examenes-page">
        <main className="app-shell">
          <section className="app-hero examenes-hero">
            <div>
              <p className="app-eyebrow">Resultados e indicaciones</p>
              <h1>Exámenes</h1>
              <p>
                Revisa el estado de tus exámenes, indicaciones previas, lugar
                asignado y disponibilidad de resultados.
              </p>
            </div>

            <div className="examenes-hero-icon">
              <IonIcon icon={flaskOutline} />
            </div>
          </section>

          <section className="examenes-filters">
            {(["Todos", "Pendiente", "En proceso", "Completado"] as FiltroExamen[]).map((f) => (
              <IonButton
                key={f}
                fill={filter === f ? "solid" : "outline"}
                className={filter === f ? "examenes-filter-btn active" : "examenes-filter-btn"}
                onClick={() => setFilter(f)}
              >
                {f === "Todos" ? "Todos" : f + "s"}
              </IonButton>
            ))}
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
            <IonGrid className="examenes-grid">
              <IonRow>
                {filteredList.length === 0 ? (
                  <IonCol size="12">
                    <IonCard className="app-card">
                      <IonCardContent>
                        <p style={{ color: "#777" }}>No hay exámenes para mostrar.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ) : (
                  filteredList.map((examen) => {
                    const variant = estadoVariant[examen.estado];
                    return (
                      <IonCol size="12" sizeMd="6" sizeLg="4" key={examen.id}>
                        <IonCard className="app-card examen-card">
                          <IonCardContent>
                            <div className="examen-card-header">
                              <div className={`examen-icon ${variant}`}>
                                <IonIcon icon={estadoIcon[examen.estado]} />
                              </div>

                              <div>
                                <span className={`examen-status ${variant}`}>
                                  {estadoLabel[examen.estado]}
                                </span>
                                <h2>{examen.nombre}</h2>
                              </div>
                            </div>

                            <div className="examen-meta">
                              {examen.fecha && (
                                <p>
                                  <strong>Fecha:</strong>{" "}
                                  {new Date(examen.fecha).toLocaleDateString("es-CL")}
                                </p>
                              )}
                              {examen.instrucciones && (
                                <p>
                                  <strong>Indicaciones:</strong> {examen.instrucciones}
                                </p>
                              )}
                            </div>

                            <div className="examen-actions">
                              {examen.estado === "COMPLETADO" ? (
                                <IonButton
                                  expand="block"
                                  routerLink="/documentos"
                                  className="app-primary-btn examen-action-btn"
                                >
                                  <IonIcon icon={documentTextOutline} slot="start" />
                                  Ver en documentos
                                </IonButton>
                              ) : (
                                <IonButton
                                  expand="block"
                                  disabled
                                  className="examen-disabled-btn"
                                >
                                  Resultados pendientes
                                </IonButton>
                              )}
                            </div>
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    );
                  })
                )}
              </IonRow>
            </IonGrid>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Examenes;