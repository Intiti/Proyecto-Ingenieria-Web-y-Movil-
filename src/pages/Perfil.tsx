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
  lockClosedOutline,
  personCircleOutline,
  saveOutline,
  shieldCheckmarkOutline,
  mapOutline,
  businessOutline,
  personOutline,
  mailOutline,
} from "ionicons/icons";
import { useState } from "react";
import "./Perfil.css";

const Perfil: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("valparaiso");
  const [selectedComuna, setSelectedComuna] = useState("Valparaíso");
  const [userDireccion, setUserDireccion] = useState("Av. Litoral 1234");
  const [userTelefono, setUserTelefono] = useState("+56 9 8765 4321");
  const [emergenciaNombre, setEmergenciaNombre] = useState("Carlos Muñoz");
  const [emergenciaTelefono, setEmergenciaTelefono] = useState("+56 9 1234 5678");

  const regiones = [
    { id: "coquimbo", name: "Región de Coquimbo" },
    { id: "valparaiso", name: "Región de Valparaíso" },
    { id: "metropolitana", name: "Región Metropolitana" },
    { id: "biobio", name: "Región del Biobío" },
    { id: "araucania", name: "Región de La Araucanía" },
  ];

  const comunasPorRegion: Record<string, string[]> = {
    coquimbo: ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
    valparaiso: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "San Antonio"],
    metropolitana: ["Santiago", "Puente Alto", "Maipú", "La Florida", "Providencia", "Las Condes"],
    biobio: ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de la Paz"],
    araucania: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
  };

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    setSelectedComuna("");
  };

  const handleGuardar = () => {
    const profileData = {
      region: selectedRegion,
      comuna: selectedComuna,
      direccion: userDireccion,
      telefono: userTelefono,
      contactoEmergencia: {
        nombre: emergenciaNombre,
        telefono: emergenciaTelefono
      }
    };
    console.log("Datos guardados:", profileData);
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
            <IonButton routerLink="/home" fill="clear" className="app-header-btn">
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
                Mantén tus datos de contacto actualizados para recibir avisos sobre citas, exámenes y listas de espera.
              </p>
            </div>
          </section>

          <section className="perfil-summary">
            <IonCard className="app-card profile-card">
              <IonCardContent className="profile-main-content">
                <div className="profile-avatar-large">
                  <IonIcon icon={personCircleOutline} />
                </div>
                <div className="profile-info-large">
                  <span className="profile-eyebrow-text">Paciente registrado en MuniSalud</span>
                  <h2 style={{ fontSize: '42px', fontWeight: 900 }}>María Muñoz Pérez</h2>
                  <div className="profile-badges-large">
                    <span className="badge-verified">
                      <IonIcon icon={shieldCheckmarkOutline} />
                      Identidad verificada
                    </span>
                    <span className="badge-active">
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
            <IonCard className="app-card perfil-panel readonly-panel">
              <IonCardContent>
                <div className="section-title">
                  <h2>
                    <IonIcon icon={lockClosedOutline} className="lock-icon" />
                    Información del sistema
                  </h2>
                  <p>Estos datos están vinculados a tu identidad legal y no pueden ser modificados aquí.</p>
                </div>
                <div className="perfil-form-grid">
                  <div className="field-group">
                    <label>
                      <IonIcon icon={personOutline} className="label-icon" />
                      Nombre completo
                    </label>
                    <div className="readonly-data">María Muñoz Pérez</div>
                  </div>
                  <div className="field-group">
                    <label>
                      <IonIcon icon={idCardOutline} className="label-icon" />
                      RUT
                    </label>
                    <div className="readonly-data">12.345.678-9</div>
                  </div>
                  <div className="field-group full">
                    <label>
                      <IonIcon icon={mailOutline} className="label-icon" />
                      Correo electrónico institucional
                    </label>
                    <div className="readonly-data">maria.munoz@gmail.com</div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="app-card perfil-panel">
              <IonCardContent>
                <div className="section-title">
                  <h2>Datos de contacto y residencia</h2>
                  <p>Actualiza tu ubicación y medios de contacto para derivaciones en la red de salud.</p>
                </div>
                <div className="perfil-form-grid">
                  <div className="field-group">
                    <label htmlFor="regionSelect">
                      <IonIcon icon={mapOutline} className="label-icon" />
                      Región
                    </label>
                    <IonSelect
                      id="regionSelect"
                      className="perfil-input editable no-bold custom-alignment"
                      value={selectedRegion}
                      interface="popover"
                      onIonChange={(e) => handleRegionChange(e.detail.value)}
                    >
                      {regiones.map((region) => (
                        <IonSelectOption key={region.id} value={region.id}>
                          {region.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </div>

                  <div className="field-group">
                    <label htmlFor="comunaSelect">
                      <IonIcon icon={businessOutline} className="label-icon" />
                      Comuna
                    </label>
                    <IonSelect
                      id="comunaSelect"
                      className="perfil-input editable no-bold custom-alignment"
                      value={selectedComuna}
                      interface="popover"
                      disabled={!selectedRegion}
                      onIonChange={(e) => setSelectedComuna(e.detail.value)}
                    >
                      {selectedRegion &&
                        comunasPorRegion[selectedRegion].map((comuna) => (
                          <IonSelectOption key={comuna} value={comuna}>
                            {comuna}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                  </div>

                  <div className="field-group full">
                    <label htmlFor="direccionInput">
                      <IonIcon icon={locationOutline} className="label-icon" />
                      Dirección particular
                    </label>
                    <IonInput
                      id="direccionInput"
                      className="perfil-input editable no-bold custom-alignment"
                      value={userDireccion}
                      onIonInput={(e) => setUserDireccion(e.detail.value!)}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="telefonoInput">
                      <IonIcon icon={callOutline} className="label-icon" />
                      Teléfono personal
                    </label>
                    <IonInput
                      id="telefonoInput"
                      className="perfil-input editable no-bold custom-alignment"
                      value={userTelefono}
                      type="tel"
                      onIonInput={(e) => setUserTelefono(e.detail.value!)}
                    />
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
                    <label htmlFor="emergenciaNombreInput">
                      <IonIcon icon={personOutline} className="label-icon" />
                      Nombre
                    </label>
                    <IonInput
                      id="emergenciaNombreInput"
                      className="perfil-input editable no-bold custom-alignment"
                      value={emergenciaNombre}
                      onIonInput={(e) => setEmergenciaNombre(e.detail.value!)}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="emergenciaTelefonoInput">
                      <IonIcon icon={callOutline} className="label-icon" />
                      Teléfono
                    </label>
                    <IonInput
                      id="emergenciaTelefonoInput"
                      className="perfil-input editable no-bold custom-alignment"
                      value={emergenciaTelefono}
                      type="tel"
                      onIonInput={(e) => setEmergenciaTelefono(e.detail.value!)}
                    />
                  </div>
                </div>
                <div className="perfil-actions">
                  <IonButton expand="block" className="app-primary-btn" onClick={handleGuardar}>
                    <IonIcon icon={saveOutline} slot="start" />
                    Guardar cambios
                  </IonButton>
                  <IonButton expand="block" fill="outline" routerLink="/home" className="app-outline-btn">
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