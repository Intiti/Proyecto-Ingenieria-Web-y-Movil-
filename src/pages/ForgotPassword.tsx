import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { shieldCheckmarkOutline } from "ionicons/icons";
import { useState } from "react";
import "./Login.css";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleSendCodeClick = () => {
    setStep(2);
  };

  const handleVerifyCodeClick = () => {
    setStep(3);
  };

  const handleAcceptClick = () => {
    setStep(4);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-page">
        <main className="login-shell" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <IonCard className="login-card" style={{ width: "100%", maxWidth: "480px" }}>
            <IonCardContent>
              <div className="card-title" style={{ textAlign: "center", marginBottom: "24px" }}>
                <h2>Recuperar contraseña</h2>
                {step === 1 && (
                  <p>Ingresa tu correo electrónico para restablecer el acceso al sistema.</p>
                )}
                {step === 2 && (
                  <p>Ingresa el código de verificación enviado a tu correo.</p>
                )}
                {step === 3 && (
                  <p>Ingresa tu nueva contraseña y confírmala.</p>
                )}
                {step === 4 && (
                  <p>Contraseña actualizada con éxito.</p>
                )}
              </div>

              {step === 1 && (
                <>
                  <div className="form-inputs" style={{ marginBottom: "24px" }}>
                    <div className="field-group">
                      <label className="field-label" htmlFor="email">
                        Correo electrónico
                      </label>
                      <IonInput
                        id="email"
                        className="clean-input"
                        type="email"
                        placeholder="Ej: correo@ejemplo.com"
                      />
                    </div>
                  </div>

                  <IonButton expand="block" className="btn-primary-login" onClick={handleSendCodeClick}>
                    Enviar código
                  </IonButton>

                  <p className="register-link" style={{ textAlign: "center", marginTop: "16px" }}>
                    ¿Recordaste tu contraseña? <a href="/login">Iniciar sesión</a>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <div style={{ backgroundColor: "#eef7ff", color: "#31577e", padding: "14px", borderRadius: "16px", marginBottom: "24px", textAlign: "center", fontWeight: 500, border: "1px solid #c8d3e0" }}>
                    Hemos enviado un código a tu correo electrónico.
                  </div>

                  <div className="form-inputs" style={{ marginBottom: "24px" }}>
                    <div className="field-group">
                      <label className="field-label" htmlFor="code">
                        Código de verificación
                      </label>
                      <IonInput
                        id="code"
                        className="clean-input"
                        placeholder="Ej: 123456"
                      />
                    </div>
                  </div>

                  <IonButton expand="block" className="btn-primary-login" onClick={handleVerifyCodeClick}>
                    Continuar
                  </IonButton>

                  <p className="register-link" style={{ textAlign: "center", marginTop: "16px" }}>
                    <a onClick={() => setStep(1)} style={{ cursor: "pointer", color: "#0b72d9", fontWeight: 700 }}>Volver</a>
                  </p>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="form-inputs" style={{ marginBottom: "24px" }}>
                    <div className="field-group" style={{ marginBottom: "16px" }}>
                      <label className="field-label" htmlFor="password">
                        Nueva contraseña
                      </label>
                      <IonInput
                        id="password"
                        className="clean-input"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="confirmPassword">
                        Confirmar nueva contraseña
                      </label>
                      <IonInput
                        id="confirmPassword"
                        className="clean-input"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <IonButton expand="block" className="btn-primary-login" onClick={handleAcceptClick}>
                    Aceptar
                  </IonButton>

                  <p className="register-link" style={{ textAlign: "center", marginTop: "16px" }}>
                    <a onClick={() => setStep(2)} style={{ cursor: "pointer", color: "#0b72d9", fontWeight: 700 }}>Volver</a>
                  </p>
                </>
              )}

              {step === 4 && (
                <div style={{ padding: "12px 0", textAlign: "center" }}>
                  <p style={{ color: "#172033", fontSize: "16px", marginBottom: "24px" }}>
                    Tu contraseña ha sido restablecida correctamente.
                  </p>
                  <IonButton expand="block" className="btn-primary-login" routerLink="/login">
                    Iniciar sesión
                  </IonButton>
                </div>
              )}

              <div className="security-note" style={{ marginTop: "24px" }}>
                <IonIcon icon={shieldCheckmarkOutline} />
                <span>
                  Tus datos están protegidos y encriptados según la ley de protección de datos de pacientes.
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