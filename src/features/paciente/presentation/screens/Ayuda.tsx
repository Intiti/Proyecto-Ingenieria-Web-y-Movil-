import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  callOutline,
  chatbubbleEllipsesOutline,
  documentTextOutline,
  helpCircleOutline,
  homeOutline,
  informationCircleOutline,
  locationOutline,
  mailOutline,
  peopleOutline,
  timeOutline,
} from "ionicons/icons";

import "./Ayuda.css";

const Ayuda: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Ayuda</IonTitle>

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

      <IonContent className="app-page ayuda-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Orientación ciudadana</p>
              <h1>¿Necesitas ayuda con el sistema?</h1>
              <p>
                Encuentra orientación para revisar tus solicitudes, consultar
                tus citas médicas y resolver dudas frecuentes sobre la atención
                municipal.
              </p>
            </div>
          </section>

          <section className="help-summary">
            <IonCard className="app-card help-card-main">
              <IonCardContent>
                <div className="help-main-icon">
                  <IonIcon icon={helpCircleOutline} />
                </div>

                <div>
                  <h2>Guía rápida para pacientes</h2>

                  <p>
                    Si es tu primera vez usando MuniSalud, comienza revisando tu
                    lista de espera, luego tu agenda médica y finalmente tus
                    datos de contacto.
                  </p>

                  <div className="help-actions">
                    <IonButton
                      routerLink="/solicitudes"
                      className="app-primary-btn"
                    >
                      Ver lista de espera
                    </IonButton>

                    <IonButton
                      routerLink="/agenda"
                      fill="outline"
                      className="app-outline-btn"
                    >
                      Ver agenda médica
                    </IonButton>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="app-card contact-highlight">
              <IonCardContent>
                <IonIcon icon={callOutline} />

                <h3>Atención telefónica</h3>

                <strong>600 360 7777</strong>

                <p>Lunes a viernes de 08:30 a 17:30 hrs.</p>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="help-options">
            <IonCard className="app-card option-card">
              <IonCardContent>
                <IonIcon icon={timeOutline} />

                <h3>Lista de espera</h3>

                <p>
                  Revisa el estado de tus solicitudes médicas y la última
                  actualización registrada.
                </p>

                <IonButton
                  expand="block"
                  fill="clear"
                  routerLink="/solicitudes"
                  className="option-link-btn"
                >
                  Ir a solicitudes
                </IonButton>
              </IonCardContent>
            </IonCard>

            <IonCard className="app-card option-card">
              <IonCardContent>
                <IonIcon icon={documentTextOutline} />

                <h3>Documentos</h3>

                <p>
                  Consulta documentos asociados a tus atenciones, comprobantes o
                  antecedentes médicos.
                </p>

                <IonButton
                  expand="block"
                  fill="clear"
                  routerLink="/documentos"
                  className="option-link-btn"
                >
                  Ver documentos
                </IonButton>
              </IonCardContent>
            </IonCard>

            <IonCard className="app-card option-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />

                <h3>Datos personales</h3>

                <p>
                  Mantén actualizado tu teléfono, correo y dirección para
                  recibir avisos importantes.
                </p>

                <IonButton
                  expand="block"
                  fill="clear"
                  routerLink="/perfil"
                  className="option-link-btn"
                >
                  Actualizar perfil
                </IonButton>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="ayuda-content">
            <IonCard className="app-card faq-panel">
              <IonCardContent>
                <div className="section-title">
                  <h2>Preguntas frecuentes</h2>
                  <p>Respuestas rápidas a dudas comunes del sistema.</p>
                </div>

                <IonAccordionGroup className="faq-list">
                  <IonAccordion value="first">
                    <IonItem slot="header" lines="none">
                      <IonLabel>¿Cómo reviso mi lista de espera?</IonLabel>
                    </IonItem>

                    <div className="faq-content" slot="content">
                      <p>
                        Puedes revisar tus solicitudes, estado, prioridad y
                        última actualización directamente desde la sección de
                        lista de espera.
                      </p>

                      <IonButton
                        size="small"
                        routerLink="/solicitudes"
                        className="faq-link-btn"
                      >
                        Ir a lista de espera
                      </IonButton>
                    </div>
                  </IonAccordion>

                  <IonAccordion value="second">
                    <IonItem slot="header" lines="none">
                      <IonLabel>
                        ¿Qué hago si mis datos están incorrectos?
                      </IonLabel>
                    </IonItem>

                    <div className="faq-content" slot="content">
                      <p>
                        Si tu teléfono, correo o dirección están incorrectos,
                        puedes actualizarlos desde la sección Mi perfil.
                      </p>

                      <IonButton
                        size="small"
                        routerLink="/perfil"
                        className="faq-link-btn"
                      >
                        Ir a mi perfil
                      </IonButton>
                    </div>
                  </IonAccordion>

                  <IonAccordion value="third">
                    <IonItem slot="header" lines="none">
                      <IonLabel>¿Puedo cambiar una cita médica?</IonLabel>
                    </IonItem>

                    <div className="faq-content" slot="content">
                      <p>
                        Puedes revisar tus próximas citas, horarios y centros de
                        atención desde la agenda médica.
                      </p>

                      <IonButton
                        size="small"
                        routerLink="/agenda"
                        className="faq-link-btn"
                      >
                        Ir a agenda médica
                      </IonButton>
                    </div>
                  </IonAccordion>

                  <IonAccordion value="fourth">
                    <IonItem slot="header" lines="none">
                      <IonLabel>¿Cómo ingreso con ClaveÚnica?</IonLabel>
                    </IonItem>

                    <div className="faq-content" slot="content">
                      <p>
                        Puedes ingresar con ClaveÚnica desde la pantalla de
                        inicio de sesión, usando tu RUN y clave personal.
                      </p>

                      <IonButton
                        size="small"
                        routerLink="/login"
                        className="faq-link-btn"
                      >
                        Ir al inicio de sesión
                      </IonButton>
                    </div>
                  </IonAccordion>
                </IonAccordionGroup>
              </IonCardContent>
            </IonCard>

            <IonCard className="app-card channels-panel">
              <IonCardContent>
                <div className="section-title">
                  <h2>Canales de atención</h2>
                  <p>Medios disponibles para solicitar orientación.</p>
                </div>

                <div className="channel-list">
                  <div className="channel-item">
                    <IonIcon icon={callOutline} />
                    <div>
                      <strong>Teléfono</strong>
                      <span>600 360 7777</span>
                    </div>
                  </div>

                  <div className="channel-item">
                    <IonIcon icon={mailOutline} />
                    <div>
                      <strong>Correo electrónico</strong>
                      <span>contacto@munisalud.cl</span>
                    </div>
                  </div>

                  <div className="channel-item">
                    <IonIcon icon={locationOutline} />
                    <div>
                      <strong>Atención presencial</strong>
                      <span>Municipalidad de Santo Domingo</span>
                    </div>
                  </div>

                  <div className="channel-item">
                    <IonIcon icon={chatbubbleEllipsesOutline} />
                    <div>
                      <strong>Orientación ciudadana</strong>
                      <span>Disponible en horario municipal</span>
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="ayuda-note">
            <IonIcon icon={informationCircleOutline} />

            <p>
              Esta sección está diseñada para apoyar a pacientes y usuarios que
              requieran orientación durante el uso del sistema.
            </p>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Ayuda;
