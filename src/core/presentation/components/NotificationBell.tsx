import { useEffect, useState } from "react";

import {
  IonBadge,
  IonButton,
  IonIcon,
  IonPopover,
  IonContent,
} from "@ionic/react";

import {
  notificationsOutline,
  mailOpenOutline,
  trashOutline,
  trendingUpOutline,
  calendarOutline,
  informationCircleOutline,
  flaskOutline,
} from "ionicons/icons";

import { apiRequest } from "../../../services/api";

import "./NotificationBell.css";

type ApiNotificationPriority = "ALTA" | "MEDIA" | "BAJA";

type ApiNotification = {
  id: string;
  titulo: string;
  mensaje: string;
  prioridad: ApiNotificationPriority;
  leida: boolean;
  fecha: string;
};

type NotificationPriority = "Alta" | "Media" | "Baja";
type NotificationStatus = "unread" | "read";

type AppNotification = {
  id: string;
  title: string;
  description: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  icon: string;
  date: string;
};

type NotificationsResponse = {
  ok: boolean;
  notificaciones: ApiNotification[];
};

const priorityLabel: Record<ApiNotificationPriority, NotificationPriority> = {
  ALTA: "Alta",
  MEDIA: "Media",
  BAJA: "Baja",
};

const getNotificationIcon = (notification: ApiNotification) => {
  const text = `${notification.titulo} ${notification.mensaje}`.toLowerCase();

  if (text.includes("cita") || text.includes("cupo")) {
    return calendarOutline;
  }

  if (text.includes("examen")) {
    return flaskOutline;
  }

  if (text.includes("lista") || text.includes("espera")) {
    return trendingUpOutline;
  }

  return informationCircleOutline;
};

const formatNotificationDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const mapNotification = (notification: ApiNotification): AppNotification => {
  return {
    id: notification.id,
    title: notification.titulo,
    description: notification.mensaje,
    status: notification.leida ? "read" : "unread",
    priority: priorityLabel[notification.prioridad],
    icon: getNotificationIcon(notification),
    date: formatNotificationDate(notification.fecha),
  };
};

const NotificationBell: React.FC = () => {
  const [triggerId] = useState(
    () => `notification-trigger-${Math.random().toString(36).slice(2)}`,
  );

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const unreadCount = notifications.filter(
    (notification) => notification.status === "unread",
  ).length;

  const loadNotifications = async () => {
    try {
      const token = localStorage.getItem("munisalud_token");

      if (!token) {
        setNotifications([]);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      const response = await apiRequest<NotificationsResponse>(
        "/notificaciones/mis-notificaciones",
      );

      setNotifications(response.notificaciones.map(mapNotification));
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar las notificaciones.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, status: "read" }
            : notification,
        ),
      );

      await apiRequest(`/notificaciones/${id}/leida`, {
        method: "PATCH",
      });
    } catch {
      await loadNotifications();
    }
  };

  const deleteNotification = async (id: string) => {
    const previousNotifications = notifications;

    try {
      setNotifications((current) =>
        current.filter((notification) => notification.id !== id),
      );

      await apiRequest(`/notificaciones/${id}`, {
        method: "DELETE",
      });
    } catch {
      setNotifications(previousNotifications);
    }
  };

  return (
    <>
      <IonButton
        id={triggerId}
        fill="clear"
        className="notification-bell-btn app-header-btn"
        onClick={loadNotifications}
      >
        <IonIcon icon={notificationsOutline} slot="icon-only" />

        {unreadCount > 0 && (
          <IonBadge color="danger" className="notification-bell-badge">
            {unreadCount}
          </IonBadge>
        )}
      </IonButton>

      <IonPopover
        trigger={triggerId}
        triggerAction="click"
        className="notification-popover"
      >
        <IonContent>
          <section className="notification-panel">
            <div className="notification-panel-header">
              <div>
                <div className="notification-title-row">
                  <h2>Notificaciones</h2>

                  {unreadCount > 0 && (
                    <IonBadge
                      color="danger"
                      className="notification-count-badge"
                    >
                      {unreadCount}
                    </IonBadge>
                  )}
                </div>

                <p>
                  {unreadCount > 0
                    ? `${unreadCount} mensaje(s) sin leer`
                    : "No tienes mensajes pendientes"}
                </p>
              </div>
            </div>

            <div className="notification-panel-list">
              {isLoading && (
                <div className="notification-empty">
                  <p>Cargando notificaciones...</p>
                </div>
              )}

              {!isLoading && errorMessage && (
                <div className="notification-empty">
                  <p>{errorMessage}</p>
                </div>
              )}

              {!isLoading &&
                !errorMessage &&
                notifications.slice(0, 4).map((notification) => (
                  <article
                    key={notification.id}
                    className={
                      notification.status === "unread"
                        ? "notification-panel-item unread"
                        : "notification-panel-item"
                    }
                  >
                    <div
                      className={`notification-panel-icon ${notification.priority.toLowerCase()}`}
                    >
                      <IonIcon icon={notification.icon} />
                    </div>

                    <div className="notification-panel-body">
                      <div className="notification-panel-top">
                        <h3>{notification.title}</h3>

                        <span
                          className={`notification-priority ${notification.priority.toLowerCase()}`}
                        >
                          {notification.priority}
                        </span>
                      </div>

                      <p>{notification.description}</p>

                      <div className="notification-panel-footer">
                        <time>{notification.date}</time>

                        <div>
                          {notification.status === "unread" && (
                            <IonButton
                              fill="clear"
                              className="notification-action-btn"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <IonIcon
                                icon={mailOpenOutline}
                                slot="icon-only"
                              />
                            </IonButton>
                          )}

                          <IonButton
                            fill="clear"
                            className="notification-action-btn danger"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <IonIcon icon={trashOutline} slot="icon-only" />
                          </IonButton>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}

              {!isLoading && !errorMessage && notifications.length === 0 && (
                <div className="notification-empty">
                  <p>No hay notificaciones para mostrar.</p>
                </div>
              )}
            </div>

            <IonButton
              routerLink="/notificaciones"
              expand="block"
              className="app-primary-btn notification-panel-link"
            >
              Ver centro de mensajes
            </IonButton>
          </section>
        </IonContent>
      </IonPopover>
    </>
  );
};

export default NotificationBell;