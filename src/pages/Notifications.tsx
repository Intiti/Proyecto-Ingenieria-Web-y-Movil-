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
  mailUnreadOutline
} from "ionicons/icons";

import "./Notifications.css";

const Notifications: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="notifications-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>MuniSalud</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="notifications-page">
        <main className="notifications-shell">
          
          {/* Bloque superior: Copia exacta de tu estructura placeholder-card */}
          <section className="notifications-main-card">
            <h1>Notificaciones</h1>
            <p>Mantente informado sobre el estado de tus listas de espera</p>
            
            <div className="notifications-banner-inline">
              <IonIcon icon={mailUnreadOutline} />
              <span>Tienes 2 notificaciones sin leer</span>
            </div>
          </section>

          {/* Selector de pestañas */}
          <IonSegment value="no-leidas" mode="md" className="notifications-segment">
            <IonSegmentButton value="no-leidas">
              <IonLabel>NO LEÍDAS <IonBadge color="danger">2</IonBadge></IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="leidas">
              <IonLabel>LEÍDAS (2)</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="todas">
              <IonLabel>TODAS (4)</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Lista de alertas: Cada una es una copia estructural de tu placeholder-card */}
          <div className="notifications-list">
            
            <article className="notifications-item-card unread-border">
              <div className="notifications-card-header">
                <div className="icon-title-group">
                  <div className="notifications-mini-icon green-bg">
                    <IonIcon icon={trendingUpOutline} />
                  </div>
                  <h2>Avance en Lista de Espera</h2>
                </div>
                <span className="badge-alta">Alta</span>
              </div>
              
              <p className="notifications-card-body">
                Has avanzado 3 posiciones en la lista de espera de Cardiología. Posición actual: 8 de 45.
              </p>
              
              <div className="notifications-card-footer">
                <time>2 de mayo de 2026, 08:00 p. m.</time>
                <div className="action-buttons">
                  <IonIcon icon={mailOpenOutline} className="act-icon blue" />
                  <IonIcon icon={trashOutline} className="act-icon red" />
                </div>
              </div>
            </article>

            <article className="notifications-item-card unread-border">
              <div className="notifications-card-header">
                <div className="icon-title-group">
                  <div className="notifications-mini-icon blue-bg">
                    <IonIcon icon={calendarOutline} />
                  </div>
                  <h2>Nuevo Cupo Disponible</h2>
                </div>
                <span className="badge-alta">Alta</span>
              </div>
              
              <p className="notifications-card-body">
                Se ha liberado un cupo para Cardiología el 20 de Junio a las 10:30. Confirma tu asistencia.
              </p>
              
              <div className="notifications-card-footer">
                <time>1 de mayo de 2026, 08:00 p. m.</time>
                <div className="action-buttons">
                  <IonIcon icon={mailOpenOutline} className="act-icon blue" />
                  <IonIcon icon={trashOutline} className="act-icon red" />
                </div>
              </div>
            </article>

          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;