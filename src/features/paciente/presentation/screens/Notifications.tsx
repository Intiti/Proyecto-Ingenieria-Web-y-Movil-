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

type NotificacionesResponse = { ok: boolean; notificaciones: Notificacion[] };

const prioridadLabel: Record<Prioridad, string> = {
  ALTA: "Alta",
  MEDIA: "Media",
  BAJA: "Baja",
};

const prioridadIcon: Record<Prioridad, string> = {
  ALTA: trendingUpOutline,
  MEDIA: calendarOutline,
  BAJA: informationCircleOutline,
};

const Notifications: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<NotificationFilter>("no-leidas");

  useEffect(() => {
    apiRequest<NotificacionesResponse>("/notificaciones/mis-notificaciones")
      .then((data) => setNotificaciones(data.notificaciones))
      .catch(() => setError("No se pudo cargar las notificaciones."))
      .finally(() => setLoading(false));
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await apiRequest(`/notificaciones/${id}/leida`, {
        method: "PATCH",
        body: JSON.stringify({ leida: true }),
      });
      setNotificaciones((current) =>
        current.map((n) => (n.id === id ? { ...n, leida: true } : n))
      );
    } catch {
    }
  };

  const deleteLocal = (id: string) => {
    setNotificaciones((current) => current.filter((n) => n.id !== id));
  };

  const filteredList = notificaciones.filter((n) => {
    if (filter === "no-leidas") return !n.leida;
    if (filter === "leidas") return n.leida;
    return true;
  });

  const unreadCount = notificaciones.filter((n) => !n.leida).length;
  const readCount = notificaciones.filter((n) => n.leida).length;

  return (
    <IonPage>
      <IonHeader className="app-header ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Notificaciones</IonTitle>

          <IonButtons slot="end">
            <IonButton routerLink="/home" fill="clear" className="app-header-btn">
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
            onIonChange={(e) => setFilter(e.detail.value as NotificationFilter)}
          >
            <IonSegmentButton value="no-leidas">
              <IonLabel>
                No leídas{" "}
                {unreadCount > 0 && <IonBadge color="danger">{unreadCount}</IonBadge>}
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
            <section className="notifications-list">
              {filteredList.length === 0 ? (
                <div className="app-card empty-state">
                  <p>No hay notificaciones para mostrar.</p>
                </div>
              ) : (
                filteredList.map((n) => (
                  <article
                    key={n.id}
                    className={
                      !n.leida
                        ? "app-card notifications-item-card unread-border"
                        : "app-card notifications-item-card"
                    }
                  >
                    <div className="notifications-card-header">
                      <div className="icon-title-group">
                        <div className={`notifications-mini-icon ${prioridadLabel[n.prioridad].toLowerCase()}-bg`}>
                          <IonIcon icon={prioridadIcon[n.prioridad]} />
                        </div>
                        <h2>{n.titulo}</h2>
                      </div>
                      <span className={`priority-badge badge-${prioridadLabel[n.prioridad].toLowerCase()}`}>
                        {prioridadLabel[n.prioridad]}
                      </span>
                    </div>

                    <p className="notifications-card-body">{n.mensaje}</p>

                    <div className="notifications-card-footer">
                      <time>{new Date(n.fecha).toLocaleString("es-CL")}</time>

                      <div className="action-buttons">
                        {!n.leida && (
                          <IonButton
                            fill="clear"
                            className="notification-page-action-btn"
                            onClick={() => markAsRead(n.id)}
                          >
                            <IonIcon icon={mailOpenOutline} slot="icon-only" />
                          </IonButton>
                        )}
                        <IonButton
                          fill="clear"
                          className="notification-page-action-btn danger"
                          onClick={() => deleteLocal(n.id)}
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