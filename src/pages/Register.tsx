import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
} from "@ionic/react";

import {
  medicalOutline,
  shieldCheckmarkOutline,
  personAddOutline,
} from "ionicons/icons";

import { useState } from "react";
import "./Login.css";
import "./Register.css";

const Register: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("");

  const regiones = [
    { id: "coquimbo", name: "Región de Coquimbo" },
    { id: "valparaiso", name: "Región de Valparaíso" },
    { id: "metropolitana", name: "Región Metropolitana" },
    { id: "biobio", name: "Región del Biobío" },
    { id: "araucania", name: "Región de La Araucanía" },
  ];

  const comunasPorRegion: Record<string, string[]> = {
    coquimbo: ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
    valparaiso: [
      "Valparaíso",
      "Viña del Mar",
      "Quilpué",
      "Villa Alemana",
      "Concón",
      "San Antonio",
    ],
    metropolitana: [
      "Santiago",
      "Puente Alto",
      "Maipú",
      "La Florida",
      "Providencia",
      "Las Condes",
    ],
    biobio: ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de la Paz"],
    araucania: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
  };

  return (
    <IonPage>
      <IonContent className="login-page" fullscreen>
        <div className="login-shell">
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
              routerLink="/login"
              className="staff-access"
            >
              Volver al inicio
            </IonButton>
          </header>

          <main className="login-hero register-hero">
            <div className="hero-copy">
              <span className="eyebrow">Registro de pacientes</span>

              <h1>Únete a MuniSalud</h1>

              <p>
                Crea tu cuenta para acceder a los servicios de salud municipal,
                agenda citas y gestiona tus exámenes médicos de forma rápida y
                segura.
              </p>

              <div className="register-hero-note">
                <IonIcon icon={personAddOutline} />
                <span>Registro ciudadano seguro</span>
              </div>
            </div>

            <IonCard className="app-card login-card register-card">
              <IonCardContent>
                <div className="card-title">
                  <h2>Crear cuenta</h2>
                  <p>Ingresa tus datos para registrarte en el sistema.</p>
                </div>

                <div className="register-form-grid">
                  <div className="field-group">
                    <label className="field-label" htmlFor="username">
                      Nombre de usuario
                    </label>

                    <IonInput
                      id="username"
                      className="clean-input"
                      placeholder="Ej: juanperez"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label" htmlFor="rut">
                      RUT
                    </label>

                    <IonInput
                      id="rut"
                      className="clean-input"
                      placeholder="12.345.678-9"
                    />
                  </div>

                  <div className="field-group field-full">
                    <label className="field-label" htmlFor="email">
                      Correo electrónico
                    </label>

                    <IonInput
                      id="email"
                      className="clean-input"
                      type="email"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label" htmlFor="region">
                      Región
                    </label>

                    <select
                      id="region"
                      className="native-select"
                      value={selectedRegion}
                      onChange={(event) =>
                        setSelectedRegion(event.target.value)
                      }
                    >
                      <option value="" disabled>
                        Seleccione región
                      </option>

                      {regiones.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="field-label" htmlFor="comuna">
                      Comuna
                    </label>

                    <select
                      id="comuna"
                      className="native-select"
                      defaultValue=""
                      disabled={!selectedRegion}
                    >
                      <option value="" disabled>
                        Seleccione comuna
                      </option>

                      {selectedRegion &&
                        comunasPorRegion[selectedRegion].map((comuna) => (
                          <option key={comuna} value={comuna}>
                            {comuna}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="field-label" htmlFor="password">
                      Contraseña
                    </label>

                    <IonInput
                      id="password"
                      className="clean-input"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label" htmlFor="confirm-password">
                      Confirmar contraseña
                    </label>

                    <IonInput
                      id="confirm-password"
                      className="clean-input"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="terms-row field-full">
                    <IonCheckbox mode="md" />
                    <span>Acepto los términos y condiciones</span>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  className="app-primary-btn register-main-btn"
                >
                  Registrarse
                </IonButton>

                <div className="security-note register-security-note">
                  <IonIcon icon={shieldCheckmarkOutline} />
                  <span>
                    Tus datos están protegidos y encriptados según la ley de
                    protección de datos de pacientes.
                  </span>
                </div>

                <p className="register-link">
                  ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
                </p>
              </IonCardContent>
            </IonCard>
          </main>

          <footer className="login-footer">
            <div>
              <h3>Información</h3>
              <p>Acerca del sistema</p>
              <p>Garantías GES</p>
            </div>

            <div>
              <h3>Legal</h3>
              <p>Política de privacidad</p>
              <p>Términos y condiciones</p>
            </div>

            <div>
              <h3>Contacto</h3>
              <p>600 360 7777</p>
              <p>contacto@munisalud.cl</p>
            </div>
          </footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;