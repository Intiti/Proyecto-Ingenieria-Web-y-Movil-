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
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  calendarOutline,
  checkmarkCircleOutline,
  hourglassOutline,
  informationCircleOutline,
  homeOutline,
} from "ionicons/icons";

import "./Solicitudes.css";

const Solicitudes: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Lista de espera</IonTitle>

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

      <IonContent className="app-page solicitudes-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Estado de atención</p>
              <h1>Consulta tu lista de espera</h1>
              <p>
                Revisa el avance de tus solicitudes médicas y el estado actual
                de tu atención municipal.
              </p>
            </div>
          </section>

          <section className="kpi-grid three-columns">
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={hourglassOutline} />
                <div>
                  <strong>2</strong>
                  <span>Solicitudes en espera</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={calendarOutline} />
                <div>
                  <strong>1</strong>
                  <span>Cita programada</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={checkmarkCircleOutline} />
                <div>
                  <strong>3</strong>
                  <span>Atenciones finalizadas</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="request-list">
            <IonCard className="app-card request-card">
              <IonCardContent>
                <div className="request-top">
                  <div>
                    <h2>Consulta traumatología</h2>
                    <p>Solicitud ingresada el 12/04/2026</p>
                  </div>

                  <IonBadge className="badge-warning">En espera</IonBadge>
                </div>

                <div className="request-info">
                  <div>
                    <span>Prioridad</span>
                    <strong>Media</strong>
                  </div>

                  <div>
                    <span>Centro asignado</span>
                    <strong>CESFAM Santo Domingo</strong>
                  </div>

                  <div>
                    <span>Última actualización</span>
                    <strong>Hace 3 días</strong>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  fill="outline"
                  className="app-outline-btn"
                >
                  Ver detalle
                </IonButton>
              </IonCardContent>
            </IonCard>

            <IonCard className="app-card request-card">
              <IonCardContent>
                <div className="request-top">
                  <div>
                    <h2>Examen de laboratorio</h2>
                    <p>Solicitud ingresada el 08/04/2026</p>
                  </div>

                  <IonBadge className="badge-success">Agendada</IonBadge>
                </div>

                <div className="request-info">
                  <div>
                    <span>Fecha cita</span>
                    <strong>20/05/2026</strong>
                  </div>

                  <div>
                    <span>Hora</span>
                    <strong>09:30</strong>
                  </div>

                  <div>
                    <span>Lugar</span>
                    <strong>Centro médico municipal</strong>
                  </div>
                </div>

                <IonButton expand="block" className="app-primary-btn">
                  Ver comprobante
                </IonButton>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="info-box">
            <IonIcon icon={informationCircleOutline} />
            <p>
              La información mostrada es referencial para el prototipo. En una
              versión real, estos datos serían obtenidos desde el sistema
              municipal correspondiente.
            </p>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Solicitudes;
