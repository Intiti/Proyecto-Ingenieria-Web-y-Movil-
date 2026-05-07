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
  alertCircleOutline,
  analyticsOutline,
  calendarOutline,
  checkmarkCircleOutline,
  documentTextOutline,
  logOutOutline,
  peopleOutline,
  pulseOutline,
  timeOutline,
} from "ionicons/icons";

import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Panel funcionario</IonTitle>

          <IonButtons slot="end">
            <IonButton
              routerLink="/login"
              fill="clear"
              className="app-header-btn"
            >
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Gestión municipal</p>
              <h1>Panel de control para funcionarios</h1>
              <p>
                Administra solicitudes, pacientes y listas de espera del sistema
                municipal de salud.
              </p>
            </div>
          </section>

          <section className="kpi-grid">
            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={peopleOutline} />
                <div>
                  <strong>128</strong>
                  <span>Pacientes registrados</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={timeOutline} />
                <div>
                  <strong>42</strong>
                  <span>Solicitudes en espera</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={calendarOutline} />
                <div>
                  <strong>18</strong>
                  <span>Citas programadas</span>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="kpi-card">
              <IonCardContent>
                <IonIcon icon={alertCircleOutline} />
                <div>
                  <strong>7</strong>
                  <span>Casos prioritarios</span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="admin-content">
            <IonCard className="app-card admin-panel">
              <IonCardContent>
                <div className="section-title">
                  <h2>Solicitudes recientes</h2>
                  <p>Últimos movimientos registrados en el sistema.</p>
                </div>

                <div className="admin-request-list">
                  <article className="admin-request-item">
                    <div className="admin-request-icon">
                      <IonIcon icon={pulseOutline} />
                    </div>

                    <div className="admin-request-info">
                      <div className="admin-request-top">
                        <h3>Consulta traumatología</h3>
                        <IonBadge className="badge-warning">En espera</IonBadge>
                      </div>

                      <p>Paciente: María Muñoz · Prioridad media</p>
                    </div>
                  </article>

                  <article className="admin-request-item">
                    <div className="admin-request-icon">
                      <IonIcon icon={documentTextOutline} />
                    </div>

                    <div className="admin-request-info">
                      <div className="admin-request-top">
                        <h3>Examen de laboratorio</h3>
                        <IonBadge className="badge-success">Agendada</IonBadge>
                      </div>

                      <p>Paciente: Carlos Rojas · Atención 20/05/2026</p>
                    </div>
                  </article>

                  <article className="admin-request-item">
                    <div className="admin-request-icon">
                      <IonIcon icon={alertCircleOutline} />
                    </div>

                    <div className="admin-request-info">
                      <div className="admin-request-top">
                        <h3>Evaluación prioritaria</h3>
                        <IonBadge className="badge-danger">Urgente</IonBadge>
                      </div>

                      <p>Paciente: Ana Soto · Requiere revisión municipal</p>
                    </div>
                  </article>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="app-card admin-panel">
              <IonCardContent>
                <div className="section-title">
                  <h2>Acciones rápidas</h2>
                  <p>Funciones principales del rol funcionario.</p>
                </div>

                <div className="admin-actions">
                  <IonButton
                    expand="block"
                    routerLink="/admin/pacientes"
                    className="app-primary-btn"
                  >
                    <IonIcon icon={peopleOutline} slot="start" />
                    Gestionar pacientes
                  </IonButton>

                  <IonButton
                    expand="block"
                    routerLink="/admin/listas"
                    className="app-primary-btn"
                  >
                    <IonIcon icon={timeOutline} slot="start" />
                    Gestionar listas de espera
                  </IonButton>

                  <IonButton
                    expand="block"
                    routerLink="/admin/reportes"
                    className="app-primary-btn"
                  >
                    <IonIcon icon={analyticsOutline} slot="start" />
                    Ver reportes
                  </IonButton>

                  <IonButton
                    expand="block"
                    routerLink="/admin/agenda"
                    className="app-primary-btn"
                  >
                    <IonIcon icon={calendarOutline} slot="start" />
                    Revisar agenda
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="admin-note">
            <IonIcon icon={checkmarkCircleOutline} />
            <p>
              Vista administrativa de prototipo. En una versión real, estas
              métricas se obtendrían desde la base de datos municipal.
            </p>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
