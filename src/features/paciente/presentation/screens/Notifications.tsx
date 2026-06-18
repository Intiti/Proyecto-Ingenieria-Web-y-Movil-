import { useEffect, useState } from "react";

import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  homeOutline,
  mailOpenOutline,
  mailUnreadOutline,
  trashOutline,
  trendingUpOutline,
  calendarOutline,
  flaskOutline,
  informationCircleOutline,
} from "ionicons/icons";

import { apiRequest } from "../../../../services/api";
import "./Notifications.css";

type Prioridad = "ALTA" | "MEDIA" | "BAJA";
type NotificationFilter = "no-leidas" | "leidas" | "todas";

type Notificacion = {
  id: string;
  titulo: string;
  mensaje: string;
  prioridad: Prioridad;
  leida: boolean;
  fecha: string;
};

type NotificacionesResponse = {
  ok: boolean;
  notificaciones: Notificacion[];
};

type NotificacionUpdateResponse = {
  ok: boolean;
  notificacion: Notificacion;
};

type DeleteResponse = {
  ok: boolean;
  message: string;
};

const prioridadLabel: Record<Prioridad, string> = {
  ALTA: "Alta",
  MEDIA: "Media",
  BAJA: "Baja",
};

const getNotificationIcon = (notificacion: Notificacion) => {
  const text = `${notificacion.titulo} ${notificacion.mensaje}`.toLowerCase();

  if (
    text.includes("cita") ||
    text.includes("cupo") ||
    text.includes("agenda")
  ) {
    return calendarOutline;
  }

  if (text.includes("examen")) {
    return flaskOutline;
  }

  if (
    text.includes("lista") ||
    text.includes("espera") ||
    text.includes("avance")
  ) {
    return trendingUpOutline;
  }

  return informationCircleOutline;
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
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const Notifications: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<NotificationFilter>("no-leidas");

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<NotificacionesResponse>(
        "/notificaciones/mis-notificaciones",
      );

      setNotificaciones(data.notificaciones);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo cargar las notificaciones.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      setActionLoadingId(id);

      const response = await apiRequest<NotificacionUpdateResponse>(
        `/notificaciones/${id}/leida`,
        {
          method: "PATCH",
          body: JSON.stringify({ leida: true }),
        },
      );

      setNotificaciones((current) =>
        current.map((notificacion) =>
          notificacion.id === id ? response.notificacion : notificacion,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo marcar la notificación como leída.",
      );

      await loadNotifications();
    } finally {
      setActionLoadingId(null);
    }
  };

  const deleteNotification = async (id: string) => {
    const previousNotifications = notificaciones;

    try {
      setActionLoadingId(id);

      setNotificaciones((current) =>
        current.filter((notificacion) => notificacion.id !== id),
      );

      await apiRequest<DeleteResponse>(`/notificaciones/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      setNotificaciones(previousNotifications);

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la notificación.",
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredList = notificaciones.filter((notificacion) => {
    if (filter === "no-leidas") {
      return !notificacion.leida;
    }

    if (filter === "leidas") {
      return notificacion.leida;
    }

    return true;
  });

  const unreadCount = notificaciones.filter(
    (notificacion) => !notificacion.leida,
  ).length;

  const readCount = notificaciones.filter(
    (notificacion) => notificacion.leida,
  ).length;

  return (
    <IonPage>
      <IonHeader className="app-header ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Notificaciones</IonTitle>

          <IonButtons slot="end">
            <IonButton
              routerLink="/home"
              fill="clear"
              className="app-header-btn"
            >
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page notifications-page">
        <main className="app-shell notifications-shell">
          <section className="app-hero notifications-hero">
            <div>
              <p className="app-eyebrow">Centro de mensajes</p>
              <h1>Notificaciones</h1>
              <p>
                Mantente informado sobre el estado de tus listas de espera,
                citas médicas, exámenes y actualizaciones del sistema.
              </p>

              {unreadCount > 0 && (
                <div className="notifications-banner-hero">
                  <IonIcon icon={mailUnreadOutline} />
                  <span>Tienes {unreadCount} mensajes nuevos</span>
                </div>
              )}
            </div>
          </section>

          <IonSegment
            value={filter}
            mode="md"
            className="notifications-segment"
            onIonChange={(event) =>
              setFilter(event.detail.value as NotificationFilter)
            }
          >
            <IonSegmentButton value="no-leidas">
              <IonLabel>
                No leídas{" "}
                {unreadCount > 0 && (
                  <IonBadge color="danger">{unreadCount}</IonBadge>
                )}
              </IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="leidas">
              <IonLabel>Leídas ({readCount})</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="todas">
              <IonLabel>Todas ({notificaciones.length})</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {loading && (
            <div className="notifications-loading">
              <IonSpinner name="crescent" />
            </div>
          )}

          {!loading && error && (
            <IonCard className="app-card">
              <IonCardContent>
                <p className="notifications-error">{error}</p>

                <IonButton
                  expand="block"
                  className="app-primary-btn"
                  onClick={loadNotifications}
                >
                  Reintentar
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}

          {!loading && !error && (
            <section className="notifications-list">
              {filteredList.length === 0 ? (
                <div className="app-card empty-state">
                  <p>No hay notificaciones para mostrar.</p>
                </div>
              ) : (
                filteredList.map((notificacion) => (
                  <article
                    key={notificacion.id}
                    className={
                      !notificacion.leida
                        ? "app-card notifications-item-card unread-border"
                        : "app-card notifications-item-card"
                    }
                  >
                    <div className="notifications-card-header">
                      <div className="icon-title-group">
                        <div
                          className={`notifications-mini-icon ${prioridadLabel[
                            notificacion.prioridad
                          ].toLowerCase()}-bg`}
                        >
                          <IonIcon icon={getNotificationIcon(notificacion)} />
                        </div>

                        <h2>{notificacion.titulo}</h2>
                      </div>

                      <span
                        className={`priority-badge badge-${prioridadLabel[
                          notificacion.prioridad
                        ].toLowerCase()}`}
                      >
                        {prioridadLabel[notificacion.prioridad]}
                      </span>
                    </div>

                    <p className="notifications-card-body">
                      {notificacion.mensaje}
                    </p>

                    <div className="notifications-card-footer">
                      <time>{formatFecha(notificacion.fecha)}</time>

                      <div className="action-buttons">
                        {!notificacion.leida && (
                          <IonButton
                            fill="clear"
                            className="notification-page-action-btn"
                            disabled={actionLoadingId === notificacion.id}
                            onClick={() => markAsRead(notificacion.id)}
                          >
                            <IonIcon icon={mailOpenOutline} slot="icon-only" />
                          </IonButton>
                        )}

                        <IonButton
                          fill="clear"
                          className="notification-page-action-btn danger"
                          disabled={actionLoadingId === notificacion.id}
                          onClick={() => deleteNotification(notificacion.id)}
                        >
                          <IonIcon icon={trashOutline} slot="icon-only" />
                        </IonButton>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;