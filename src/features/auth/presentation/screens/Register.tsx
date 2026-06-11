import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  medicalOutline,
  shieldCheckmarkOutline,
  personAddOutline,
} from "ionicons/icons";

import { useState } from "react";

import { registerRequest, logout } from "../../../../services/authService";

import "./Login.css";
import "./Register.css";

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

const Register: React.FC = () => {
  const router = useIonRouter();

  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedComuna, setSelectedComuna] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRegister = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);

      logout();

      const regionName =
        regiones.find((region) => region.id === selectedRegion)?.name ?? "";

      if (
        !nombre.trim() ||
        !rut.trim() ||
        !correo.trim() ||
        !selectedRegion ||
        !selectedComuna ||
        !password ||
        !confirmPassword
      ) {
        setErrorMessage("Debes completar todos los campos obligatorios.");
        return;
      }

      if (!acceptTerms) {
        setErrorMessage("Debes aceptar los términos y condiciones.");
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

      await registerRequest({
        nombre: nombre.trim(),
        rut: rut.trim(),
        correo: correo.trim(),
        password,
        region: regionName,
        comuna: selectedComuna,
      });

      router.push("/home", "root", "replace");
    } catch (error) {
      logout();

      setErrorMessage(
        error instanceof Error ? error.message : "No se pudo crear la cuenta.",
      );
    } finally {
      setIsLoading(false);
    }
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
              routerDirection="root"
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
                    <p className="field-label">Nombre de usuario</p>

                    <IonInput
                      className="clean-input"
                      placeholder="Ej: Juan Pérez"
                      value={nombre}
                      aria-label="Nombre de usuario"
                      autocomplete="name"
                      onIonInput={(event) =>
                        setNombre(event.detail.value ?? "")
                      }
                    />
                  </div>

                  <div className="field-group">
                    <p className="field-label">RUT</p>

                    <IonInput
                      className="clean-input"
                      placeholder="12.345.678-9"
                      value={rut}
                      maxlength={12}
                      inputMode="text"
                      aria-label="RUT"
                      autocomplete="username"
                      onIonInput={(event) => {
                        const value = event.detail.value ?? "";
                        setRut(formatRut(value));
                      }}
                    />
                  </div>

                  <div className="field-group field-full">
                    <p className="field-label">Correo electrónico</p>

                    <IonInput
                      className="clean-input"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={correo}
                      aria-label="Correo electrónico"
                      autocomplete="email"
                      onIonInput={(event) =>
                        setCorreo(event.detail.value ?? "")
                      }
                    />
                  </div>

                  <div className="field-group">
                    <p className="field-label">Región</p>

                    <select
                      className="native-select"
                      value={selectedRegion}
                      onChange={(event) => {
                        setSelectedRegion(event.target.value);
                        setSelectedComuna("");
                      }}
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
                    <p className="field-label">Comuna</p>

                    <select
                      className="native-select"
                      value={selectedComuna}
                      disabled={!selectedRegion}
                      onChange={(event) =>
                        setSelectedComuna(event.target.value)
                      }
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
                    <p className="field-label">Contraseña</p>

                    <IonInput
                      className="clean-input"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      aria-label="Contraseña"
                      autocomplete="new-password"
                      onIonInput={(event) =>
                        setPassword(event.detail.value ?? "")
                      }
                    />
                  </div>

                  <div className="field-group">
                    <p className="field-label">Confirmar contraseña</p>

                    <IonInput
                      className="clean-input"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      aria-label="Confirmar contraseña"
                      autocomplete="new-password"
                      onIonInput={(event) =>
                        setConfirmPassword(event.detail.value ?? "")
                      }
                    />
                  </div>

                  <div className="terms-row field-full">
                    <IonCheckbox
                      mode="md"
                      checked={acceptTerms}
                      onIonChange={(event) =>
                        setAcceptTerms(event.detail.checked)
                      }
                    />
                    <span>Acepto los términos y condiciones</span>
                  </div>
                </div>

                {errorMessage && (
                  <p className="register-error">{errorMessage}</p>
                )}

                <IonButton
                  expand="block"
                  className="app-primary-btn register-main-btn"
                  onClick={handleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Registrarse"}
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