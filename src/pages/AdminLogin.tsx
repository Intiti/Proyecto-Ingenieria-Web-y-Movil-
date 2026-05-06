import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  briefcaseOutline,
  lockClosedOutline,
  mailOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";

import "./AdminLogin.css";

const AdminLogin: React.FC = () => {
  const router = useIonRouter();

  const handleAdminLogin = () => {
    router.push("/admin/dashboard", "forward", "push");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="admin-login-page">
        <main className="admin-login-shell">
          <section className="admin-login-info">
            <div className="admin-brand">
              <div className="admin-brand-icon">
                <IonIcon icon={briefcaseOutline} />
              </div>

              <div>
                <h2>MuniSalud</h2>
                <p>Acceso funcionarios</p>
              </div>
            </div>

            <h1>Panel de gestión municipal</h1>

            <p>
              Acceso reservado para funcionarios autorizados de la Municipalidad
              de Santo Domingo.
            </p>

            <div className="admin-security-note">
              <IonIcon icon={shieldCheckmarkOutline} />
              <span>
                Este acceso permite gestionar pacientes, listas de espera,
                atenciones y reportes administrativos.
              </span>
            </div>
          </section>

          <IonCard className="admin-login-card">
            <IonCardContent>
              <div className="admin-card-title">
                <h2>Ingreso funcionario</h2>
                <p>Utiliza tu correo institucional y contraseña.</p>
              </div>

              <div className="admin-form">
                <div className="admin-field-group">
                  <label htmlFor="admin-email">Correo institucional</label>

                  <div className="admin-input-with-icon">
                    <IonIcon icon={mailOutline} />
                    <IonInput
                      id="admin-email"
                      className="admin-input icon-input"
                      type="email"
                      placeholder="funcionario@santodomingo.cl"
                      aria-label="Correo institucional"
                    />
                  </div>
                </div>

                <div className="admin-field-group">
                  <label htmlFor="admin-password">Contraseña</label>

                  <div className="admin-input-with-icon">
                    <IonIcon icon={lockClosedOutline} />
                    <IonInput
                      id="admin-password"
                      className="admin-input icon-input"
                      type="password"
                      placeholder="Ingrese su contraseña"
                      aria-label="Contraseña funcionario"
                    />
                  </div>
                </div>
              </div>

              <IonButton
                expand="block"
                className="admin-login-btn"
                onClick={handleAdminLogin}
              >
                Ingresar al panel
              </IonButton>

              <p className="admin-back-link">
                ¿Eres paciente? <a href="/login">Volver al acceso paciente</a>
              </p>
            </IonCardContent>
          </IonCard>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AdminLogin;
