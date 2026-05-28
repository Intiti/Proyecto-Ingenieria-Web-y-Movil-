import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonIcon,
} from "@ionic/react";

import {
  shieldCheckmarkOutline,
  mailOutline,
  arrowBackOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";

import { useState } from "react";

import "./ForgotPassword.css";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSendCodeClick = () => {
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Debes ingresar tu correo electrónico.");
      return;
    }

    setStep(2);
  };

  const handleVerifyCodeClick = () => {
    setErrorMessage("");

    if (!code.trim()) {
      setErrorMessage("Debes ingresar el código de verificación.");
      return;
    }

    setStep(3);
  };

  const handleAcceptClick = () => {
    setErrorMessage("");

    if (!password || !confirmPassword) {
      setErrorMessage("Debes ingresar y confirmar tu nueva contraseña.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setStep(4);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="forgot-page">
        <main className="forgot-shell">
          <IonCard className="app-card forgot-card">
            <IonCardContent>
              <div className="forgot-title">
                <div className="forgot-title-icon">
                  {step === 4 ? (
                    <IonIcon icon={checkmarkCircleOutline} />
                  ) : (
                    <IonIcon icon={mailOutline} />
                  )}
                </div>

                <h2>Recuperar contraseña</h2>

                {step === 1 && (
                  <p>
                    Ingresa tu correo electrónico para restablecer el acceso al
                    sistema.
                  </p>
                )}

                {step === 2 && (
                  <p>Ingresa el código de verificación enviado a tu correo.</p>
                )}

                {step === 3 && <p>Ingresa tu nueva contraseña y confírmala.</p>}

                {step === 4 && <p>Contraseña actualizada con éxito.</p>}
              </div>

              <div className="forgot-steps">
                <span
                  className={step >= 1 ? "forgot-step active" : "forgot-step"}
                />
                <span
                  className={step >= 2 ? "forgot-step active" : "forgot-step"}
                />
                <span
                  className={step >= 3 ? "forgot-step active" : "forgot-step"}
                />
                <span
                  className={step >= 4 ? "forgot-step active" : "forgot-step"}
                />
              </div>

              {step === 1 && (
                <>
                  <div className="forgot-form">
                    <div className="forgot-field-group">
                      <p className="forgot-field-label">Correo electrónico</p>

                      <IonInput
                        className="forgot-input"
                        type="email"
                        placeholder="Ej: correo@ejemplo.com"
                        value={email}
                        aria-label="Correo electrónico"
                        autocomplete="email"
                        onIonInput={(event) =>
                          setEmail(event.detail.value ?? "")
                        }
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="forgot-error">{errorMessage}</p>
                  )}

                  <IonButton
                    expand="block"
                    className="app-primary-btn forgot-main-btn"
                    onClick={handleSendCodeClick}
                  >
                    Enviar código
                  </IonButton>

                  <p className="forgot-link">
                    ¿Recordaste tu contraseña?{" "}
                    <a href="/login">Iniciar sesión</a>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="forgot-info-box">
                    Hemos enviado un código a tu correo electrónico.
                  </div>

                  <div className="forgot-form">
                    <div className="forgot-field-group">
                      <p className="forgot-field-label">
                        Código de verificación
                      </p>

                      <IonInput
                        className="forgot-input"
                        placeholder="Ej: 123456"
                        value={code}
                        inputMode="numeric"
                        aria-label="Código de verificación"
                        onIonInput={(event) =>
                          setCode(event.detail.value ?? "")
                        }
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="forgot-error">{errorMessage}</p>
                  )}

                  <IonButton
                    expand="block"
                    className="app-primary-btn forgot-main-btn"
                    onClick={handleVerifyCodeClick}
                  >
                    Continuar
                  </IonButton>

                  <button
                    type="button"
                    className="forgot-back-btn"
                    onClick={() => {
                      setErrorMessage("");
                      setStep(1);
                    }}
                  >
                    <IonIcon icon={arrowBackOutline} />
                    Volver
                  </button>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="forgot-form">
                    <div className="forgot-field-group">
                      <p className="forgot-field-label">Nueva contraseña</p>

                      <IonInput
                        className="forgot-input"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        aria-label="Nueva contraseña"
                        autocomplete="new-password"
                        onIonInput={(event) =>
                          setPassword(event.detail.value ?? "")
                        }
                      />
                    </div>

                    <div className="forgot-field-group">
                      <p className="forgot-field-label">
                        Confirmar nueva contraseña
                      </p>

                      <IonInput
                        className="forgot-input"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        aria-label="Confirmar nueva contraseña"
                        autocomplete="new-password"
                        onIonInput={(event) =>
                          setConfirmPassword(event.detail.value ?? "")
                        }
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="forgot-error">{errorMessage}</p>
                  )}

                  <IonButton
                    expand="block"
                    className="app-primary-btn forgot-main-btn"
                    onClick={handleAcceptClick}
                  >
                    Actualizar contraseña
                  </IonButton>

                  <button
                    type="button"
                    className="forgot-back-btn"
                    onClick={() => {
                      setErrorMessage("");
                      setStep(2);
                    }}
                  >
                    <IonIcon icon={arrowBackOutline} />
                    Volver
                  </button>
                </>
              )}

              {step === 4 && (
                <div className="forgot-success">
                  <p>Tu contraseña ha sido restablecida correctamente.</p>

                  <IonButton
                    expand="block"
                    className="app-primary-btn forgot-main-btn"
                    routerLink="/login"
                    routerDirection="root"
                  >
                    Iniciar sesión
                  </IonButton>
                </div>
              )}

              <div className="forgot-security-note">
                <IonIcon icon={shieldCheckmarkOutline} />
                <span>
                  Tus datos están protegidos y encriptados según la ley de
                  protección de datos de pacientes.
                </span>
              </div>
            </IonCardContent>
          </IonCard>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;