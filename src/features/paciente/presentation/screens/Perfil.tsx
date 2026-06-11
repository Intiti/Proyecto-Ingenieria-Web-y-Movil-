import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import {
  checkmarkCircleOutline,
  homeOutline,
  idCardOutline,
  personCircleOutline,
  saveOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";

import { useState } from "react";

import { apiRequest } from "../../../../services/api";
import { meRequest } from "../../../../services/authService";

import "./Perfil.css";

type PacientePerfil = {
  id: string;
  telefono?: string | null;
  region?: string | null;
  comuna?: string | null;
  direccion?: string | null;
  contactoEmergenciaNombre?: string | null;
  contactoEmergenciaTelefono?: string | null;
};

type UsuarioPerfil = {
  id: string;
  rut: string;
  nombre: string;
  correo: string;
  rol: "PACIENTE" | "FUNCIONARIO" | "ADMIN";
  paciente?: PacientePerfil | null;
};

type UpdatePacienteResponse = {
  ok: boolean;
  message: string;
  paciente: PacientePerfil;
};

const Perfil: React.FC = () => {
  const [user, setUser] = useState<UsuarioPerfil | null>(null);

  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [emergenciaNombre, setEmergenciaNombre] = useState("");
  const [emergenciaTelefono, setEmergenciaTelefono] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadPerfil = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await meRequest();
      const currentUser = response.user as UsuarioPerfil;
      const paciente = currentUser.paciente ?? null;

      setUser(currentUser);

      setNombre(currentUser.nombre ?? "");
      setRut(currentUser.rut ?? "");
      setCorreo(currentUser.correo ?? "");

      setTelefono(paciente?.telefono ?? "");
      setRegion(paciente?.region ?? "");
      setComuna(paciente?.comuna ?? "");
      setDireccion(paciente?.direccion ?? "");
      setEmergenciaNombre(paciente?.contactoEmergenciaNombre ?? "");
      setEmergenciaTelefono(paciente?.contactoEmergenciaTelefono ?? "");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo cargar la información del perfil.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadPerfil();
  });

  const handleGuardarCambios = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      if (!user?.paciente?.id) {
        setErrorMessage("No se encontró el perfil de paciente asociado.");
        return;
      }

      setIsSaving(true);

      const response = await apiRequest<UpdatePacienteResponse>(
        `/pacientes/${user.paciente.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            telefono,
            region,
            comuna,
            direccion,
            contactoEmergenciaNombre: emergenciaNombre,
            contactoEmergenciaTelefono: emergenciaTelefono,
          }),
        },
      );

      setUser((prevUser) => {
        if (!prevUser) {
          return prevUser;
        }

        return {
          ...prevUser,
          paciente: {
            ...(prevUser.paciente ?? { id: user.paciente!.id }),
            ...response.paciente,
          },
        };
      });

      setSuccessMessage("Perfil actualizado correctamente.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el perfil.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Mi perfil</IonTitle>

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

      <IonContent className="app-page perfil-page">
        <main className="app-shell">
          <section className="app-hero">
            <div>
              <p className="app-eyebrow">Datos del paciente</p>
              <h1>Revisa y actualiza tu información personal</h1>
              <p>
                Mantén tus datos de contacto actualizados para recibir avisos
                sobre citas, exámenes y listas de espera.
              </p>
            </div>
          </section>

          {isLoading ? (
            <IonCard className="app-card perfil-panel">
              <IonCardContent>
                <p>Cargando información del perfil...</p>
              </IonCardContent>
            </IonCard>
          ) : (
            <>
              <section className="perfil-summary">
                <IonCard className="app-card profile-card">
                  <IonCardContent>
                    <div className="profile-avatar">
                      <IonIcon icon={personCircleOutline} />
                    </div>

                    <div className="profile-info">
                      <h2>{nombre || "Paciente"}</h2>
                      <p>Paciente registrado en MuniSalud</p>

                      <div className="profile-badges">
                        <span>
                          <IonIcon icon={shieldCheckmarkOutline} />
                          Identidad verificada
                        </span>

                        <span>
                          <IonIcon icon={checkmarkCircleOutline} />
                          Datos activos
                        </span>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="app-card profile-status-card">
                  <IonCardContent>
                    <IonIcon icon={idCardOutline} />
                    <h3>RUT registrado</h3>
                    <strong>{rut || "Sin RUT"}</strong>
                    <p>Validado mediante registro municipal.</p>
                  </IonCardContent>
                </IonCard>
              </section>

              <section className="perfil-content">
                <IonCard className="app-card perfil-panel">
                  <IonCardContent>
                    <div className="section-title">
                      <h2>Datos personales</h2>
                      <p>Información básica asociada a tu cuenta.</p>
                    </div>

                    <div className="perfil-form-grid">
                      <div className="field-group">
                        <label htmlFor="nombre">Nombre completo</label>

                        <IonInput
                          id="nombre"
                          className="perfil-input"
                          value={nombre}
                          readonly
                          aria-label="Nombre completo"
                        />
                      </div>

                      <div className="field-group">
                        <label htmlFor="rut">RUT</label>

                        <IonInput
                          id="rut"
                          className="perfil-input"
                          value={rut}
                          readonly
                          aria-label="RUT"
                        />

                        <p>El RUT no puede modificarse desde esta pantalla.</p>
                      </div>

                      <div className="field-group">
                        <label htmlFor="region">Región</label>

                        <IonSelect
                          id="region"
                          className="perfil-input"
                          value={region}
                          interface="popover"
                          aria-label="Región"
                          onIonChange={(event) =>
                            setRegion(event.detail.value ?? "")
                          }
                        >
                          <IonSelectOption value="Región de Valparaíso">
                            Región de Valparaíso
                          </IonSelectOption>

                          <IonSelectOption value="Región Metropolitana">
                            Región Metropolitana
                          </IonSelectOption>

                          <IonSelectOption value="Región de Coquimbo">
                            Región de Coquimbo
                          </IonSelectOption>

                          <IonSelectOption value="Región del Biobío">
                            Región del Biobío
                          </IonSelectOption>

                          <IonSelectOption value="Región de La Araucanía">
                            Región de La Araucanía
                          </IonSelectOption>
                        </IonSelect>
                      </div>

                      <div className="field-group">
                        <label htmlFor="comuna">Comuna</label>

                        <IonSelect
                          id="comuna"
                          className="perfil-input"
                          value={comuna}
                          interface="popover"
                          aria-label="Comuna"
                          onIonChange={(event) =>
                            setComuna(event.detail.value ?? "")
                          }
                        >
                          <IonSelectOption value="Santo Domingo">
                            Santo Domingo
                          </IonSelectOption>

                          <IonSelectOption value="San Antonio">
                            San Antonio
                          </IonSelectOption>

                          <IonSelectOption value="Cartagena">
                            Cartagena
                          </IonSelectOption>

                          <IonSelectOption value="Valparaíso">
                            Valparaíso
                          </IonSelectOption>

                          <IonSelectOption value="Viña del Mar">
                            Viña del Mar
                          </IonSelectOption>

                          <IonSelectOption value="Quilpué">
                            Quilpué
                          </IonSelectOption>
                        </IonSelect>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="app-card perfil-panel">
                  <IonCardContent>
                    <div className="section-title">
                      <h2>Contacto</h2>
                      <p>
                        Estos datos se usan para notificaciones y recordatorios.
                      </p>
                    </div>

                    <div className="perfil-form-grid">
                      <div className="field-group">
                        <label htmlFor="correo">Correo electrónico</label>

                        <IonInput
                          id="correo"
                          className="perfil-input"
                          value={correo}
                          readonly
                          type="email"
                          aria-label="Correo electrónico"
                        />
                      </div>

                      <div className="field-group">
                        <label htmlFor="telefono">Teléfono</label>

                        <IonInput
                          id="telefono"
                          className="perfil-input"
                          value={telefono}
                          type="tel"
                          aria-label="Teléfono"
                          placeholder="+56 9 1234 5678"
                          onIonInput={(event) =>
                            setTelefono(event.detail.value ?? "")
                          }
                        />
                      </div>

                      <div className="field-group full">
                        <label htmlFor="direccion">Dirección</label>

                        <IonInput
                          id="direccion"
                          className="perfil-input"
                          value={direccion}
                          aria-label="Dirección"
                          placeholder="Ej: Av. Litoral 1234"
                          onIonInput={(event) =>
                            setDireccion(event.detail.value ?? "")
                          }
                        />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="app-card perfil-panel emergency-panel">
                  <IonCardContent>
                    <div className="section-title">
                      <h2>Contacto de emergencia</h2>
                      <p>
                        Persona a contactar en caso de requerir confirmación.
                      </p>
                    </div>

                    <div className="perfil-form-grid">
                      <div className="field-group">
                        <label htmlFor="emergencia-nombre">Nombre</label>

                        <IonInput
                          id="emergencia-nombre"
                          className="perfil-input"
                          value={emergenciaNombre}
                          aria-label="Nombre contacto de emergencia"
                          placeholder="Ej: Ana Pérez"
                          onIonInput={(event) =>
                            setEmergenciaNombre(event.detail.value ?? "")
                          }
                        />
                      </div>

                      <div className="field-group">
                        <label htmlFor="emergencia-telefono">Teléfono</label>

                        <IonInput
                          id="emergencia-telefono"
                          className="perfil-input"
                          value={emergenciaTelefono}
                          type="tel"
                          aria-label="Teléfono contacto de emergencia"
                          placeholder="+56 9 1234 5678"
                          onIonInput={(event) =>
                            setEmergenciaTelefono(event.detail.value ?? "")
                          }
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <p className="perfil-error">{errorMessage}</p>
                    )}

                    {successMessage && (
                      <p className="perfil-success">{successMessage}</p>
                    )}

                    <div className="perfil-actions">
                      <IonButton
                        expand="block"
                        className="app-primary-btn"
                        onClick={handleGuardarCambios}
                        disabled={isSaving}
                      >
                        <IonIcon icon={saveOutline} slot="start" />
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                      </IonButton>

                      <IonButton
                        expand="block"
                        fill="outline"
                        routerLink="/home"
                        className="app-outline-btn"
                      >
                        Volver al inicio
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              </section>
            </>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;