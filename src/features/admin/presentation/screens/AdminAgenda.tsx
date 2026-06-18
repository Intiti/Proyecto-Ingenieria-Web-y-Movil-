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
  closeCircleOutline,
  homeOutline,
  locationOutline,
  peopleOutline,
  refreshOutline,
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

type Feriado = {
  fecha: string;
  nombre: string;
  nombreLocal: string;
  pais: string;
  global: boolean;
  tipos: string[];
};

type CitasResponse = { ok: boolean; citas: Cita[] };

type CitaUpdateResponse = {
  ok: boolean;
  message: string;
  cita: Cita;
};

type FeriadosResponse = {
  ok: boolean;
  source: "cache" | "external-api";
  year: number;
  feriados: Feriado[];
  proximoFeriado: Feriado | null;
};

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

type FiltroEstado =
  | "todos"
  | "PROGRAMADA"
  | "CONFIRMADA"
  | "REALIZADA"
  | "CANCELADA";

const getFechaKey = (fecha: string) => {
  return fecha.split("T")[0];
};

const formatFecha = (fecha: string) => {
  const date = new Date(fecha);

  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const AdminAgenda: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [feriados, setFeriados] = useState<Feriado[]>([]);
  const [proximoFeriado, setProximoFeriado] = useState<Feriado | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingFeriados, setLoadingFeriados] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [feriadoError, setFeriadoError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>("todos");
  const [filtroCentro, setFiltroCentro] = useState("todos");

  const loadCitas = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<CitasResponse>("/citas");
      setCitas(data.citas);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "No se pudo cargar la agenda.",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadFeriados = async () => {
    try {
      setLoadingFeriados(true);
      setFeriadoError("");

      const data = await apiRequest<FeriadosResponse>("/servicios/feriados");

      setFeriados(data.feriados);
      setProximoFeriado(data.proximoFeriado);
    } catch {
      setFeriadoError(
        "No se pudo consultar el calendario externo de feriados.",
      );
    } finally {
      setLoadingFeriados(false);
    }
  };

  useEffect(() => {
    loadCitas();
    loadFeriados();
  }, []);

  const updateEstadoCita = async (id: string, estado: EstadoCita) => {
    try {
      setActionLoadingId(id);
      setActionMessage("");
      setError("");

      const response = await apiRequest<CitaUpdateResponse>(`/citas/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ estado }),
      });

      setCitas((current) =>
        current.map((cita) => (cita.id === id ? response.cita : cita)),
      );

      setActionMessage(`Cita actualizada a estado: ${estadoLabel[estado]}.`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la cita.",
      );

      await loadCitas();
    } finally {
      setActionLoadingId(null);
    }
  };

  const centros = useMemo(() => {
    return [...new Set(citas.map((cita) => cita.centroSalud.nombre))];
  }, [citas]);

  const feriadosPorFecha = useMemo(() => {
    return new Map(feriados.map((feriado) => [feriado.fecha, feriado]));
  }, [feriados]);

  const filtradas = useMemo(() => {
    return citas.filter((cita) => {
      const okEstado = filtroEstado === "todos" || cita.estado === filtroEstado;

      const okCentro =
        filtroCentro === "todos" || cita.centroSalud.nombre === filtroCentro;

      return okEstado && okCentro;
    });
  }, [citas, filtroEstado, filtroCentro]);

  const confirmedCount = citas.filter(
    (cita) => cita.estado === "CONFIRMADA",
  ).length;

  const pendingCount = citas.filter(
    (cita) => cita.estado === "PROGRAMADA",
  ).length;

  const doneCount = citas.filter((cita) => cita.estado === "REALIZADA").length;

  const cancelledCount = citas.filter(
    (cita) => cita.estado === "CANCELADA",
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
              <h1>Agenda administrativa</h1>
              <p>
                Gestiona las citas médicas, confirma atenciones, marca
                asistencia y evita programar atención en días feriados.
              </p>
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
                <IonIcon icon={closeCircleOutline} />
                <div>
                  <strong>{cancelledCount}</strong>
                  <span>Canceladas</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <IonCard className="app-card admin-agenda-holiday-card">
            <IonCardContent>
              <div className="admin-agenda-holiday-content">
                <div className="admin-agenda-holiday-icon">
                  <IonIcon icon={alertCircleOutline} />
                </div>

                <div>
                  <h2>Calendario externo de feriados</h2>

                  {loadingFeriados && (
                    <p>Consultando servicio externo de feriados...</p>
                  )}

                  {!loadingFeriados && proximoFeriado && (
                    <p>
                      Próximo feriado:{" "}
                      <strong>{proximoFeriado.nombreLocal}</strong>, el{" "}
                      <strong>{formatFecha(proximoFeriado.fecha)}</strong>.
                      Revisa la agenda para evitar conflictos de atención.
                    </p>
                  )}

                  {!loadingFeriados && !proximoFeriado && (
                    <p>
                      {feriadoError ||
                        "No se encontraron feriados próximos para mostrar."}
                    </p>
                  )}
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard className="app-card admin-agenda-filters">
            <IonCardContent>
              <IonSelect
                value={filtroEstado}
                placeholder="Estado"
                className="admin-agenda-select"
                onIonChange={(event) =>
                  setFiltroEstado(event.detail.value as FiltroEstado)
                }
              >
                <IonSelectOption value="todos">
                  Todos los estados
                </IonSelectOption>
                <IonSelectOption value="PROGRAMADA">Pendiente</IonSelectOption>
                <IonSelectOption value="CONFIRMADA">Confirmada</IonSelectOption>
                <IonSelectOption value="REALIZADA">Realizada</IonSelectOption>
                <IonSelectOption value="CANCELADA">Cancelada</IonSelectOption>
              </IonSelect>

              <IonSelect
                value={filtroCentro}
                placeholder="Centro"
                className="admin-agenda-select"
                onIonChange={(event) =>
                  setFiltroCentro(event.detail.value as string)
                }
              >
                <IonSelectOption value="todos">
                  Todos los centros
                </IonSelectOption>

                {centros.map((centro) => (
                  <IonSelectOption key={centro} value={centro}>
                    {centro}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCardContent>
          </IonCard>

          {actionMessage && (
            <IonCard className="app-card admin-agenda-action-message">
              <IonCardContent>
                <p>{actionMessage}</p>
              </IonCardContent>
            </IonCard>
          )}

          {loading && (
            <div className="admin-agenda-loading">
              <IonSpinner name="crescent" />
            </div>
          )}

          {!loading && error && (
            <IonCard className="app-card">
              <IonCardContent>
                <p className="admin-agenda-error">{error}</p>

                <IonButton
                  expand="block"
                  className="app-primary-btn"
                  onClick={loadCitas}
                >
                  <IonIcon icon={refreshOutline} slot="start" />
                  Reintentar
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}

          {!loading && !error && (
            <section className="admin-agenda-layout">
              <div className="admin-appointments-list">
                {filtradas.length === 0 ? (
                  <IonCard className="app-card">
                    <IonCardContent>
                      <p className="admin-agenda-muted">
                        No hay citas para mostrar.
                      </p>
                    </IonCardContent>
                  </IonCard>
                ) : (
                  filtradas.map((cita) => {
                    const feriadoCita = feriadosPorFecha.get(
                      getFechaKey(cita.fecha),
                    );

                    const isActionLoading = actionLoadingId === cita.id;

                    return (
                      <IonCard
                        key={cita.id}
                        className="app-card admin-appointment-card"
                      >
                        <IonCardContent>
                          <div className="admin-appointment-top">
                            <div className="admin-appointment-date">
                              <strong>{cita.hora}</strong>
                              <span>{formatFecha(cita.fecha)}</span>
                            </div>

                            <IonBadge className={estadoBadge[cita.estado]}>
                              {estadoLabel[cita.estado]}
                            </IonBadge>
                          </div>

                          {feriadoCita && (
                            <div className="admin-appointment-warning">
                              <IonIcon icon={alertCircleOutline} />
                              <span>
                                Esta cita coincide con feriado:{" "}
                                <strong>{feriadoCita.nombreLocal}</strong>.
                              </span>
                            </div>
                          )}

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
                              <span>
                                {cita.box
                                  ? `Box ${cita.box}`
                                  : "Sin box asignado"}
                              </span>
                            </div>

                            <div>
                              <IonIcon icon={peopleOutline} />
                              <span>{cita.paciente.usuario.rut}</span>
                            </div>
                          </div>

                          <div className="admin-appointment-actions">
                            <IonButton
                              expand="block"
                              className="app-primary-btn"
                              disabled={
                                isActionLoading || cita.estado !== "PROGRAMADA"
                              }
                              onClick={() =>
                                updateEstadoCita(cita.id, "CONFIRMADA")
                              }
                            >
                              Confirmar
                            </IonButton>

                            <IonButton
                              expand="block"
                              fill="outline"
                              className="app-outline-btn"
                              disabled={
                                isActionLoading || cita.estado !== "CONFIRMADA"
                              }
                              onClick={() =>
                                updateEstadoCita(cita.id, "REALIZADA")
                              }
                            >
                              Marcar asistencia
                            </IonButton>

                            {cita.estado === "CANCELADA" ? (
                              <IonButton
                                expand="block"
                                fill="outline"
                                className="app-outline-btn"
                                disabled={isActionLoading}
                                onClick={() =>
                                  updateEstadoCita(cita.id, "PROGRAMADA")
                                }
                              >
                                Reactivar
                              </IonButton>
                            ) : (
                              <IonButton
                                expand="block"
                                fill="clear"
                                className="agenda-clear-btn danger"
                                disabled={
                                  isActionLoading || cita.estado === "REALIZADA"
                                }
                                onClick={() =>
                                  updateEstadoCita(cita.id, "CANCELADA")
                                }
                              >
                                Cancelar
                              </IonButton>
                            )}
                          </div>
                        </IonCardContent>
                      </IonCard>
                    );
                  })
                )}
              </div>

              <IonCard className="app-card admin-agenda-availability">
                <IonCardContent>
                  <div className="section-title">
                    <h2>Disponibilidad del día</h2>
                    <p>
                      Resumen operativo por centro según citas pendientes y
                      confirmadas.
                    </p>
                  </div>

                  <div className="availability-list">
                    {centros.length === 0 ? (
                      <p className="admin-agenda-muted">
                        Sin datos disponibles.
                      </p>
                    ) : (
                      centros.map((centro) => {
                        const pendientes = citas.filter(
                          (cita) =>
                            cita.centroSalud.nombre === centro &&
                            cita.estado === "PROGRAMADA",
                        ).length;

                        const confirmadas = citas.filter(
                          (cita) =>
                            cita.centroSalud.nombre === centro &&
                            cita.estado === "CONFIRMADA",
                        ).length;

                        return (
                          <div key={centro}>
                            <span>{centro}</span>
                            <strong>
                              {pendientes} pendiente
                              {pendientes !== 1 ? "s" : ""} · {confirmadas}{" "}
                              confirmada
                              {confirmadas !== 1 ? "s" : ""}
                            </strong>
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