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
  shieldCheckmarkOutline,
} from "ionicons/icons";

import { useState } from "react";
import "./AdminLogin.css";

const ADMIN_EMAIL = "funcionario@santodomingo.cl";
const ADMIN_PASSWORD = "admin123";

const AdminLogin: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdminLogin = () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setErrorMessage("Debes ingresar correo y contraseña.");
      return;
    }

    if (cleanEmail !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setErrorMessage("Credenciales de funcionario inválidas.");
      return;
    }

    setErrorMessage("");
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

          <IonCard className="app-card admin-login-card">
            <IonCardContent>
              <div className="admin-card-title">
                <h2>Ingreso funcionario</h2>
                <p>Utiliza tu correo institucional y contraseña.</p>
              </div>

              <div className="admin-form">
                <div className="admin-field-group">
                  <label htmlFor="admin-email">Correo institucional</label>

                  <IonInput
                    id="admin-email"
                    className="admin-input"
                    type="email"
                    placeholder="micorreo@gmail.cl"
                    value={email}
                    aria-label="Correo institucional"
                    onIonInput={(event) => setEmail(event.detail.value ?? "")}
                  />
                </div>

                <div className="admin-field-group">
                  <label htmlFor="admin-password">Contraseña</label>

                  <IonInput
                    id="admin-password"
                    className="admin-input"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    aria-label="Contraseña funcionario"
                    onIonInput={(event) =>
                      setPassword(event.detail.value ?? "")
                    }
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="admin-login-error">{errorMessage}</p>
              )}

              <IonButton
                expand="block"
                className="app-primary-btn admin-login-btn"
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
