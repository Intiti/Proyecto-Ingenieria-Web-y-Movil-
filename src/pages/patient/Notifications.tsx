import { useState } from "react";

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
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  calendarOutline,
  flaskOutline,
  homeOutline,
  informationCircleOutline,
  mailOpenOutline,
  mailUnreadOutline,
  trashOutline,
  trendingUpOutline,
} from "ionicons/icons";

import "./Notifications.css";

type NotificationStatus = "unread" | "read";
type NotificationPriority = "Alta" | "Media" | "Baja";
type NotificationFilter = "no-leidas" | "leidas" | "todas";

type PatientNotification = {
  id: number;
  title: string;
  description: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  icon: string;
  date: string;
};

const initialNotifications: PatientNotification[] = [
  {
    id: 1,
    title: "Avance en Lista de Espera",
    description:
      "Has avanzado 3 posiciones en la lista de espera de Cardiología. Posición actual: 8 de 45.",
    status: "unread",
    priority: "Alta",
    icon: trendingUpOutline,
    date: "2 de mayo de 2026, 08:00 p. m.",
  },
  {
    id: 2,
    title: "Nuevo Cupo Disponible",
    description:
      "Se ha liberado un cupo para Cardiología el 20 de Junio a las 10:30. Confirma tu asistencia.",
    status: "unread",
    priority: "Alta",
    icon: calendarOutline,
    date: "1 de mayo de 2026, 08:00 p. m.",
  },
  {
    id: 3,
    title: "Recordatorio de Examen",
    description:
      "Tienes un Electrocardiograma programado para el 15 de Mayo a las 09:00.",
    status: "read",
    priority: "Media",
    icon: flaskOutline,
    date: "30 de abril de 2026, 08:00 p. m.",
  },
  {
    id: 4,
    title: "Actualización del Sistema",
    description:
      "El sistema estará en mantenimiento el próximo domingo de 02:00 a 06:00 hrs.",
    status: "read",
    priority: "Baja",
    icon: informationCircleOutline,
    date: "27 de abril de 2026, 08:00 p. m.",
  },
];

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<NotificationFilter>("no-leidas");
  const [notifications, setNotifications] =
    useState<PatientNotification[]>(initialNotifications);

  const filteredList = notifications.filter((notification) => {
    if (filter === "no-leidas") return notification.status === "unread";
    if (filter === "leidas") return notification.status === "read";
    return true;
  });

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

  const unreadCount = notifications.filter(
    (notification) => notification.status === "unread",
  ).length;

  const readCount = notifications.filter(
    (notification) => notification.status === "read",
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
              <IonLabel>Todas ({notifications.length})</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <section className="notifications-list">
            {filteredList.map((notification) => (
              <article
                key={notification.id}
                className={
                  notification.status === "unread"
                    ? "app-card notifications-item-card unread-border"
                    : "app-card notifications-item-card"
                }
              >
                <div className="notifications-card-header">
                  <div className="icon-title-group">
                    <div
                      className={`notifications-mini-icon ${notification.priority.toLowerCase()}-bg`}
                    >
                      <IonIcon icon={notification.icon} />
                    </div>

                    <h2>{notification.title}</h2>
                  </div>

                  <span
                    className={`priority-badge badge-${notification.priority.toLowerCase()}`}
                  >
                    {notification.priority}
                  </span>
                </div>

                <p className="notifications-card-body">
                  {notification.description}
                </p>

                <div className="notifications-card-footer">
                  <time>{notification.date}</time>

                  <div className="action-buttons">
                    {notification.status === "unread" && (
                      <IonButton
                        fill="clear"
                        className="notification-page-action-btn"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <IonIcon icon={mailOpenOutline} slot="icon-only" />
                      </IonButton>
                    )}

                    <IonButton
                      fill="clear"
                      className="notification-page-action-btn danger"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <IonIcon icon={trashOutline} slot="icon-only" />
                    </IonButton>
                  </div>
                </div>
              </article>
            ))}

            {filteredList.length === 0 && (
              <div className="app-card empty-state">
                <p>No hay notificaciones para mostrar.</p>
              </div>
            )}
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;