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
  homeOutline,
  locationOutline,
  medicalOutline,
  timeOutline,
  alertCircleOutline,
} from "ionicons/icons";

import "./Agenda.css";

const Agenda: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="agenda-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Agenda médica</IonTitle>

          <IonButtons slot="end">
            <IonButton
              routerLink="/home"
              fill="clear"
              className="agenda-home-btn"
            >
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="agenda-page">
        <main className="agenda-shell">
          <section className="agenda-hero">
            <div>
              <p className="agenda-eyebrow">Atenciones programadas</p>
              <h1>Revisa tus próximas citas médicas</h1>
              <p>
                Consulta fecha, hora, lugar y estado de tus atenciones
                programadas en la red municipal de salud.
              </p>
            </div>
          </section>

          <section className="next-appointment">
            <IonCard className="next-card">
              <IonCardContent>
                <div className="next-card-header">
                  <div className="next-icon">
                    <IonIcon icon={calendarOutline} />
                  </div>

                  <div>
                    <IonBadge color="primary">Próxima cita</IonBadge>
                    <h2>Control médico general</h2>
                    <p>Centro de Salud Familiar Santo Domingo</p>
                  </div>
                </div>

                <div className="next-details">
                  <div>
                    <IonIcon icon={calendarOutline} />
                    <span>Fecha</span>
                    <strong>20 mayo 2026</strong>
                  </div>

                  <div>
                    <IonIcon icon={timeOutline} />
                    <span>Hora</span>
                    <strong>09:30</strong>
                  </div>

                  <div>
                    <IonIcon icon={locationOutline} />
                    <span>Lugar</span>
                    <strong>Box 4, CESFAM</strong>
                  </div>
                </div>

                <div className="next-actions">
                  <IonButton expand="block">Ver indicaciones</IonButton>
                  <IonButton expand="block" fill="outline">
                    Reagendar
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="reminder-card">
              <IonCardContent>
                <IonIcon icon={alertCircleOutline} />
                <h3>Recuerda llegar 15 minutos antes</h3>
                <p>
                  Lleva tu cédula de identidad y llega con anticipación para
                  confirmar tu atención.
                </p>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="agenda-summary">
            <IonCard className="agenda-summary-card">
              <IonCardContent>
                <IonIcon icon={calendarOutline} />
                <div>
                  <strong>3</strong>
                  <span>Citas próximas</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="agenda-summary-card">
              <IonCardContent>
                <IonIcon icon={checkmarkCircleOutline} />
                <div>
                  <strong>5</strong>
                  <span>Citas realizadas</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="agenda-summary-card">
              <IonCardContent>
                <IonIcon icon={medicalOutline} />
                <div>
                  <strong>1</strong>
                  <span>Cita por confirmar</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="agenda-content">
            <div className="agenda-panel">
              <div className="section-title">
                <h2>Próximas atenciones</h2>
                <p>Citas programadas asociadas a tu atención municipal.</p>
              </div>

              <div className="appointment-list">
                <article className="appointment-item">
                  <div className="appointment-date">
                    <strong>20</strong>
                    <span>MAY</span>
                  </div>

                  <div className="appointment-info">
                    <div className="appointment-top">
                      <h3>Control médico general</h3>
                      <IonBadge className="badge-success">Confirmada</IonBadge>
                    </div>

                    <p>
                      <IonIcon icon={timeOutline} />
                      09:30 hrs · CESFAM Santo Domingo
                    </p>
                  </div>
                </article>

                <article className="appointment-item">
                  <div className="appointment-date">
                    <strong>24</strong>
                    <span>MAY</span>
                  </div>

                  <div className="appointment-info">
                    <div className="appointment-top">
                      <h3>Examen de laboratorio</h3>
                      <IonBadge className="badge-warning">
                        Por confirmar
                      </IonBadge>
                    </div>

                    <p>
                      <IonIcon icon={timeOutline} />
                      08:15 hrs · Centro médico municipal
                    </p>
                  </div>
                </article>

                <article className="appointment-item">
                  <div className="appointment-date">
                    <strong>02</strong>
                    <span>JUN</span>
                  </div>

                  <div className="appointment-info">
                    <div className="appointment-top">
                      <h3>Consulta traumatología</h3>
                      <IonBadge className="badge-review">En revisión</IonBadge>
                    </div>

                    <p>
                      <IonIcon icon={timeOutline} />
                      Horario por definir · Derivación pendiente
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <div className="agenda-panel">
              <div className="section-title">
                <h2>Historial reciente</h2>
                <p>Últimas atenciones registradas en el sistema.</p>
              </div>

              <div className="history-list">
                <div className="history-item">
                  <IonIcon icon={checkmarkCircleOutline} />
                  <div>
                    <strong>Atención medicina general</strong>
                    <span>Realizada el 10/04/2026</span>
                  </div>
                </div>

                <div className="history-item">
                  <IonIcon icon={checkmarkCircleOutline} />
                  <div>
                    <strong>Toma de muestra</strong>
                    <span>Realizada el 03/04/2026</span>
                  </div>
                </div>

                <div className="history-item">
                  <IonIcon icon={checkmarkCircleOutline} />
                  <div>
                    <strong>Control preventivo</strong>
                    <span>Realizado el 18/03/2026</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Agenda;
