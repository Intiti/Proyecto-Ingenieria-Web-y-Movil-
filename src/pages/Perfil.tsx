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
} from "@ionic/react";

import {
  callOutline,
  checkmarkCircleOutline,
  homeOutline,
  idCardOutline,
  locationOutline,
  mailOutline,
  personCircleOutline,
  saveOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";

import "./Perfil.css";

const Perfil: React.FC = () => {
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

          <section className="perfil-summary">
            <IonCard className="app-card profile-card">
              <IonCardContent>
                <div className="profile-avatar">
                  <IonIcon icon={personCircleOutline} />
                </div>

                <div className="profile-info">
                  <h2>María Muñoz Pérez</h2>
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
                <strong>12.345.678-9</strong>
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
                      value="María Muñoz Pérez"
                      aria-label="Nombre completo"
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="rut">RUT</label>

                    <IonInput
                      id="rut"
                      className="perfil-input"
                      value="12.345.678-9"
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
                      value="valparaiso"
                      interface="popover"
                      aria-label="Región"
                    >
                      <IonSelectOption value="valparaiso">
                        Región de Valparaíso
                      </IonSelectOption>

                      <IonSelectOption value="metropolitana">
                        Región Metropolitana
                      </IonSelectOption>
                    </IonSelect>
                  </div>

                  <div className="field-group">
                    <label htmlFor="comuna">Comuna</label>

                    <IonSelect
                      id="comuna"
                      className="perfil-input"
                      value="santo-domingo"
                      interface="popover"
                      aria-label="Comuna"
                    >
                      <IonSelectOption value="santo-domingo">
                        Santo Domingo
                      </IonSelectOption>

                      <IonSelectOption value="san-antonio">
                        San Antonio
                      </IonSelectOption>

                      <IonSelectOption value="cartagena">
                        Cartagena
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

                    <div className="input-with-icon">
                      <IonIcon icon={mailOutline} />

                      <IonInput
                        id="correo"
                        className="perfil-input icon-input"
                        value="maria.munoz@gmail.com"
                        type="email"
                        aria-label="Correo electrónico"
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="telefono">Teléfono</label>

                    <div className="input-with-icon">
                      <IonIcon icon={callOutline} />

                      <IonInput
                        id="telefono"
                        className="perfil-input icon-input"
                        value="+56 9 8765 4321"
                        type="tel"
                        aria-label="Teléfono"
                      />
                    </div>
                  </div>

                  <div className="field-group full">
                    <label htmlFor="direccion">Dirección</label>

                    <div className="input-with-icon">
                      <IonIcon icon={locationOutline} />

                      <IonInput
                        id="direccion"
                        className="perfil-input icon-input"
                        value="Av. Litoral 1234"
                        aria-label="Dirección"
                      />
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="app-card perfil-panel emergency-panel">
              <IonCardContent>
                <div className="section-title">
                  <h2>Contacto de emergencia</h2>
                  <p>Persona a contactar en caso de requerir confirmación.</p>
                </div>

                <div className="perfil-form-grid">
                  <div className="field-group">
                    <label htmlFor="emergencia-nombre">Nombre</label>

                    <IonInput
                      id="emergencia-nombre"
                      className="perfil-input"
                      value="Carlos Muñoz"
                      aria-label="Nombre contacto de emergencia"
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="emergencia-telefono">Teléfono</label>

                    <IonInput
                      id="emergencia-telefono"
                      className="perfil-input"
                      value="+56 9 1234 5678"
                      type="tel"
                      aria-label="Teléfono contacto de emergencia"
                    />
                  </div>
                </div>

                <div className="perfil-actions">
                  <IonButton expand="block" className="app-primary-btn">
                    <IonIcon icon={saveOutline} slot="start" />
                    Guardar cambios
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
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
