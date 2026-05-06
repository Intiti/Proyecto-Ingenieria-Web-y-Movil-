import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

import {
  calendarOutline,
  documentTextOutline,
  flaskOutline,
  notificationsOutline,
  personCircleOutline,
  timeOutline,
  logOutOutline,
  helpCircleOutline,
} from "ionicons/icons";

import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="home-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>MuniSalud</IonTitle>

          <IonButtons slot="end">
            <IonButton
              routerLink="/ayuda"
              fill="clear"
              className="header-help-btn"
            >
              <IonIcon icon={helpCircleOutline} slot="icon-only" />
            </IonButton>

            <IonButton fill="clear" routerLink="/login">
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-page">
        <main className="home-shell">
          <section className="home-welcome">
            <div>
              <p className="home-eyebrow">Portal paciente</p>
              <h1>Bienvenido/a</h1>
              <p>
                Revisa tus solicitudes médicas, próximas atenciones y el estado
                de tus listas de espera.
              </p>
            </div>

            <div className="home-user-card">
              <IonIcon icon={personCircleOutline} />
              <div>
                <strong>Paciente</strong>
                <span>Acceso ciudadano</span>
              </div>
            </div>
          </section>

          <IonGrid className="home-grid">
            <IonRow>
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardContent>
                    <div className="feature-icon">
                      <IonIcon icon={timeOutline} />
                    </div>

                    <h2>Lista de espera</h2>

                    <p>
                      Consulta tu posición, estado y fecha estimada de atención.
                    </p>

                    <IonButton expand="block" routerLink="/solicitudes">
                      Ver estado
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardContent>
                    <div className="feature-icon">
                      <IonIcon icon={calendarOutline} />
                    </div>

                    <h2>Agenda médica</h2>

                    <p>Revisa tus próximas citas y solicitudes de atención.</p>

                    <IonButton expand="block" routerLink="/agenda">
                      Ver agenda
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardContent>
                    <div className="feature-icon">
                      <IonIcon icon={flaskOutline} />
                    </div>

                    <h2>Exámenes</h2>

                    <p>
                      Accede a información sobre exámenes pendientes o cargados.
                    </p>

                    <IonButton expand="block" routerLink="/examenes">
                      Ver exámenes
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardContent>
                    <div className="feature-icon">
                      <IonIcon icon={notificationsOutline} />
                    </div>

                    <h2>Notificaciones</h2>

                    <p>
                      Revisa avisos importantes sobre cambios o nuevas citas.
                    </p>

                    <IonButton expand="block" routerLink="/notificaciones">
                      Ver avisos
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardContent>
                    <div className="feature-icon">
                      <IonIcon icon={documentTextOutline} />
                    </div>

                    <h2>Documentos</h2>

                    <p>
                      Consulta documentos asociados a tus solicitudes de salud.
                    </p>

                    <IonButton expand="block" routerLink="/documentos">
                      Ver documentos
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardContent>
                    <div className="feature-icon">
                      <IonIcon icon={personCircleOutline} />
                    </div>

                    <h2>Mi perfil</h2>

                    <p>Revisa y actualiza tus datos personales de contacto.</p>

                    <IonButton expand="block" routerLink="/perfil">
                      Ver perfil
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card help-feature-card">
                  <IonCardContent>
                    <div className="feature-icon">
                      <IonIcon icon={helpCircleOutline} />
                    </div>

                    <h2>Ayuda y orientación</h2>

                    <p>
                      Encuentra respuestas rápidas y canales de contacto si
                      necesitas apoyo para usar el sistema.
                    </p>

                    <IonButton expand="block" routerLink="/ayuda">
                      Necesito ayuda
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Home;
