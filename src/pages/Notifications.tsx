import React, { useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonBadge,
  IonIcon,
} from "@ionic/react";
import { 
  mailOpenOutline, 
  trashOutline, 
  trendingUpOutline, 
  calendarOutline,
  mailUnreadOutline,
  informationCircleOutline,
  flaskOutline
} from "ionicons/icons";

import "./Notifications.css";

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState('no-leidas');

  // Estado inicial con los datos de tus capturas
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'Avance en Lista de Espera', 
      description: 'Has avanzado 3 posiciones en la lista de espera de Cardiología. Posición actual: 8 de 45.',
      status: 'unread', 
      priority: 'Alta', 
      icon: trendingUpOutline,
      date: '2 de mayo de 2026, 08:00 p. m.' 
    },
    { 
      id: 2, 
      title: 'Nuevo Cupo Disponible', 
      description: 'Se ha liberado un cupo para Cardiología el 20 de Junio a las 10:30. Confirma tu asistencia.',
      status: 'unread', 
      priority: 'Alta', 
      icon: calendarOutline,
      date: '1 de mayo de 2026, 08:00 p. m.' 
    },
    { 
      id: 3, 
      title: 'Recordatorio de Examen', 
      description: 'Tienes un Electrocardiograma programado para el 15 de Mayo a las 09:00.',
      status: 'read', 
      priority: 'Media', 
      icon: flaskOutline,
      date: '30 de abril de 2026, 08:00 p. m.' 
    },
    { 
      id: 4, 
      title: 'Actualización del Sistema', 
      description: 'El sistema estará en mantenimiento el próximo domingo de 02:00 a 06:00 hrs.',
      status: 'read', 
      priority: 'Baja', 
      icon: informationCircleOutline,
      date: '27 de abril de 2026, 08:00 p. m.' 
    },
  ]);

  // Lógica de Filtrado: Esto es lo que hace que las secciones cambien
  const filteredList = notifications.filter(n => {
    if (filter === 'no-leidas') return n.status === 'unread';
    if (filter === 'leidas') return n.status === 'read';
    return true; 
  });

  // Funciones de acción
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, status: 'read' } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <IonPage>
      <IonHeader className="notifications-header ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>MuniSalud</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="notifications-page">
        <main className="notifications-shell">
          
          <section className="notifications-hero">
            <p className="notifications-eyebrow">CENTRO DE MENSAJES</p>
            <h1>Notificaciones</h1>
            <p>Mantente informado sobre el estado de tus listas de espera y actualizaciones de salud.</p>
  
            {unreadCount > 0 && (
                <div className="notifications-banner-hero">
                    <IonIcon icon={mailUnreadOutline} />
                    <span>Tienes {unreadCount} mensajes nuevos</span>
                </div>
            )}
          </section>
          <IonSegment 
            value={filter} 
            mode="md" 
            className="notifications-segment"
            onIonChange={(e) => setFilter(e.detail.value as string)}
          >
            <IonSegmentButton value="no-leidas">
              <IonLabel>NO LEÍDAS {unreadCount > 0 && <IonBadge color="danger">{unreadCount}</IonBadge>}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="leidas">
              <IonLabel>LEÍDAS ({notifications.filter(n => n.status === 'read').length})</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="todas">
              <IonLabel>TODAS ({notifications.length})</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <div className="notifications-list">
            {filteredList.map((notif) => (
              <article 
                key={notif.id} 
                className={`notifications-item-card ${notif.status === 'unread' ? 'unread-border' : ''}`}
              >
                <div className="notifications-card-header">
                  <div className="icon-title-group">
                    <div className={`notifications-mini-icon ${notif.priority.toLowerCase()}-bg`}>
                      <IonIcon icon={notif.icon} />
                    </div>
                    <h2>{notif.title}</h2>
                  </div>
                  <span className={`priority-badge badge-${notif.priority.toLowerCase()}`}>
                    {notif.priority}
                  </span>
                </div>
                
                <p className="notifications-card-body">{notif.description}</p>
                
                <div className="notifications-card-footer">
                  <time>{notif.date}</time>
                  <div className="action-buttons">
                    {notif.status === 'unread' && (
                      <IonIcon 
                        icon={mailOpenOutline} 
                        className="act-icon blue" 
                        onClick={() => markAsRead(notif.id)}
                      />
                    )}
                    <IonIcon 
                      icon={trashOutline} 
                      className="act-icon red" 
                      onClick={() => deleteNotification(notif.id)}
                    />
                  </div>
                </div>
              </article>
            ))}

            {filteredList.length === 0 && (
              <div className="empty-state">
                <p>No hay notificaciones para mostrar.</p>
              </div>
            )}
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;