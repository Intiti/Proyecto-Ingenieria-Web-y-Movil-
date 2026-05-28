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

import { briefcaseOutline, shieldCheckmarkOutline } from "ionicons/icons";

import { useState } from "react";
import { loginRequest, logout } from "../../services/authService";

import "./AdminLogin.css";

const AdminLogin: React.FC = () => {
  const router = useIonRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdminLogin = async () => {
    try {
      setErrorMessage("");

      logout();

      if (!correo || !password) {
        setErrorMessage("Debes ingresar correo y contraseña.");
        return;
      }

      const response = await loginRequest({
        identificador: correo,
        password,
      });

      if (
        response.user.rol !== "FUNCIONARIO" &&
        response.user.rol !== "ADMIN"
      ) {
        logout();
        setErrorMessage("No tienes permisos de funcionario.");
        return;
      }

      router.push("/admin/dashboard", "root", "replace");
    } catch (error) {
      logout();

      setErrorMessage(
        error instanceof Error ? error.message : "No se pudo iniciar sesión.",
      );
    }
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
                  <p className="admin-field-label">Correo institucional</p>

                  <IonInput
                    className="admin-input"
                    type="email"
                    placeholder="funcionario@santodomingo.cl"
                    aria-label="Correo institucional"
                    autocomplete="email"
                    value={correo}
                    onIonInput={(event) => setCorreo(event.detail.value ?? "")}
                  />
                </div>

                <div className="admin-field-group">
                  <p className="admin-field-label">Contraseña</p>

                  <IonInput
                    className="admin-input"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    aria-label="Contraseña funcionario"
                    autocomplete="current-password"
                    value={password}
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
