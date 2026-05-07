import { useState } from "react";

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

import "./NotificationBell.css";

type NotificationPriority = "Alta" | "Media" | "Baja";
type NotificationStatus = "unread" | "read";

type AppNotification = {
  id: number;
  title: string;
  description: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  icon: string;
  date: string;
};

const initialNotifications: AppNotification[] = [
  {
    id: 1,
    title: "Avance en Lista de Espera",
    description:
      "Has avanzado 3 posiciones en la lista de espera de Cardiología. Posición actual: 8 de 45.",
    status: "unread",
    priority: "Alta",
    icon: trendingUpOutline,
    date: "2 mayo 2026",
  },
  {
    id: 2,
    title: "Nuevo Cupo Disponible",
    description:
      "Se ha liberado un cupo para Cardiología el 20 de Junio a las 10:30.",
    status: "unread",
    priority: "Alta",
    icon: calendarOutline,
    date: "1 mayo 2026",
  },
  {
    id: 3,
    title: "Recordatorio de Examen",
    description: "Tienes un Electrocardiograma programado para el 15 de Mayo.",
    status: "read",
    priority: "Media",
    icon: flaskOutline,
    date: "30 abril 2026",
  },
  {
    id: 4,
    title: "Actualización del Sistema",
    description:
      "El sistema estará en mantenimiento el próximo domingo de 02:00 a 06:00 hrs.",
    status: "read",
    priority: "Baja",
    icon: informationCircleOutline,
    date: "27 abril 2026",
  },
];

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] =
    useState<AppNotification[]>(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => notification.status === "unread",
  ).length;

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" }
          : notification,
      ),
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  };

  return (
    <>
      <IonButton
        id="notification-trigger"
        fill="clear"
        className="notification-bell-btn app-header-btn"
      >
        <IonIcon icon={notificationsOutline} slot="icon-only" />

        {unreadCount > 0 && (
          <IonBadge color="danger" className="notification-bell-badge">
            {unreadCount}
          </IonBadge>
        )}
      </IonButton>

      <IonPopover
        trigger="notification-trigger"
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
              {notifications.slice(0, 4).map((notification) => (
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
                            <IonIcon icon={mailOpenOutline} slot="icon-only" />
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

              {notifications.length === 0 && (
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
