import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";

import {
  medicalOutline,
  calendarOutline,
  shieldCheckmarkOutline,
  callOutline,
  mailOutline,
  briefcaseOutline,
  closeOutline,
  eyeOutline,
} from "ionicons/icons";

import { useEffect, useState } from "react";
import { loginRequest, logout } from "../../../../services/authService";

import "./Login.css";

const formatRut = (value: string) => {
  const cleanValue = value.replace(/[^0-9kK]/g, "").toUpperCase();

  if (cleanValue.length <= 1) {
    return cleanValue;
  }

  const body = cleanValue.slice(0, -1);
  const verifier = cleanValue.slice(-1);

  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formattedBody}-${verifier}`;
};

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    logout();
    setRut("");
    setPassword("");
    setErrorMessage("");
    setIsLoading(false);
  }, []);

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }

    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();

    const rutValue = rut.trim();
    const passwordValue = password.trim();

    if (!rutValue || !passwordValue) {
      setErrorMessage("Debes ingresar RUT y contraseña.");
      return;
    }

    try {
      setErrorMessage("");
      setIsLoading(true);

      logout();

      const response = await loginRequest({
        identificador: rutValue,
        password: passwordValue,
      });

      if (
        response.user.rol === "FUNCIONARIO" ||
        response.user.rol === "ADMIN"
      ) {
        window.location.replace("/admin/dashboard");
        return;
      }

      window.location.replace("/home");
    } catch (error) {
      logout();

      setErrorMessage(
        error instanceof Error ? error.message : "No se pudo iniciar sesión.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaveUnicaLogin = () => {
    setShowModal(false);
    window.location.replace("/home");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-page">
        <main className="login-shell">
          <header className="login-header">
            <div className="brand">
              <div className="brand-icon">
                <IonIcon icon={medicalOutline} />
              </div>

              <div>
                <h2>MuniSalud</h2>
                <p>Municipalidad de Santo Domingo</p>
              </div>
            </div>

            <IonButton
              fill="clear"
              className="staff-access"
              onClick={() => window.location.replace("/admin/login")}
            >
              <IonIcon icon={briefcaseOutline} slot="start" />
              Acceso funcionarios
            </IonButton>
          </header>

          <section className="login-hero">
            <div className="hero-copy">
              <span className="eyebrow">Sistema municipal de salud</span>

              <h1>Gestión de listas de espera y atención ciudadana</h1>

              <p>
                Consulta tu estado, revisa tus solicitudes médicas y accede a la
                información de tu atención de forma simple y segura.
              </p>

              <div className="hero-features">
                <div>
                  <IonIcon icon={calendarOutline} />
                  <span>Agenda médica</span>
                </div>

                <div>
                  <IonIcon icon={shieldCheckmarkOutline} />
                  <span>Acceso seguro</span>
                </div>
              </div>
            </div>

            <IonCard className="app-card login-card">
              <IonCardContent>
                <div className="card-title">
                  <h2>Acceso paciente</h2>
                  <p>
                    Ingresa con tu cuenta o utiliza ClaveÚnica para acceder.
                  </p>
                </div>

                <div className="form-inputs">
                  <div className="field-group">
                    <p className="field-label">RUT</p>

                    <IonInput
                      className="clean-input"
                      placeholder="Ej: 12.345.678-9"
                      value={rut}
                      inputMode="text"
                      maxlength={12}
                      aria-label="Ingrese su RUT"
                      autocomplete="username"
                      onIonInput={(event) => {
                        const value = event.detail.value ?? "";
                        setRut(formatRut(value));
                      }}
                    />

                    <p className="helper-text">
                      Puedes escribirlo sin puntos ni guion. Ejemplo: 123456789.
                    </p>
                  </div>

                  <div className="field-group">
                    <p className="field-label">Contraseña</p>

                    <IonInput
                      className="clean-input"
                      type="password"
                      placeholder="Ingrese su contraseña"
                      aria-label="Ingrese su contraseña"
                      value={password}
                      autocomplete="current-password"
                      onIonInput={(event) =>
                        setPassword(event.detail.value ?? "")
                      }
                    />
                  </div>
                </div>

                {errorMessage && <p className="login-error">{errorMessage}</p>}

                <IonButton
                  expand="block"
                  className="app-primary-btn login-main-btn"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Ingresando..." : "Ingresar"}
                </IonButton>

                <div className="login-actions">
                  <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
                </div>

                <div className="login-divider">
                  <span></span>
                  <p>o</p>
                  <span></span>
                </div>

                <IonButton
                  expand="block"
                  fill="outline"
                  className="app-outline-btn btn-claveunica"
                  onClick={() => setShowModal(true)}
                >
                  Ingresar con ClaveÚnica
                </IonButton>

                <p className="register-link">
                  ¿No tienes una cuenta?{" "}
                  <a href="/crear-cuenta">Crear cuenta</a>
                </p>

                <div className="security-note">
                  <IonIcon icon={shieldCheckmarkOutline} />

                  <span>
                    Tus datos serán validados de forma segura según el método de
                    ingreso seleccionado.
                  </span>
                </div>
              </IonCardContent>
            </IonCard>
          </section>

          <footer className="login-footer">
            <div>
              <h3>Información</h3>
              <a href="#">Acerca del sistema</a>
              <a href="#">Garantías GES</a>
            </div>

            <div>
              <h3>Legal</h3>
              <a href="#">Política de privacidad</a>
              <a href="#">Términos y condiciones</a>
            </div>

            <div>
              <h3>Contacto</h3>
              <p>
                <IonIcon icon={callOutline} />
                600 360 7777
              </p>

              <p>
                <IonIcon icon={mailOutline} />
                contacto@munisalud.cl
              </p>
            </div>
          </footer>
        </main>
      </IonContent>

      <IonModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        className="cu-modal"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle className="cu-modal-title">
              <img
                src="/Assets/ClaveUnica.png"
                alt="ClaveÚnica"
                className="cu-logo"
              />
            </IonTitle>

            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="cu-modal-content">
          <div className="cu-shell">
            <h2>Portal Ciudadano ClaveÚnica</h2>

            <div className="cu-field">
              <p className="field-label">Ingresa tu RUN</p>

              <IonInput
                placeholder="12.345.678-9"
                fill="outline"
                className="claveunica-input"
              />
            </div>

            <div className="cu-field">
              <p className="field-label">ClaveÚnica</p>

              <IonInput
                type="password"
                placeholder="••••••••"
                fill="outline"
                className="claveunica-input"
              >
                <IonIcon
                  icon={eyeOutline}
                  slot="end"
                  className="claveunica-eye-icon"
                />
              </IonInput>
            </div>

            <div className="cu-links">
              <a href="https://claveunica.gob.cl/recuperar">
                Recupera tu ClaveÚnica
              </a>

              <a href="https://claveunica.gob.cl/sucursales">
                Solicita tu ClaveÚnica
              </a>
            </div>

            <IonButton
              expand="block"
              className="app-primary-btn cu-submit-btn"
              onClick={handleClaveUnicaLogin}
            >
              INGRESA
            </IonButton>

            <div className="cu-help">
              <a href="https://claveunica.gob.cl/preguntas-frecuentes">
                ¿Necesitas ayuda?
              </a>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Login;