import { 
  IonContent, 
  IonPage, 
  IonButton, 
  IonInput, 
  IonCard, 
  IonCardContent, 
  IonIcon, 
  IonCheckbox
} from '@ionic/react';
import { medkitOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import { useState } from 'react';
import './Login.css';

const Register: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("");

  const regiones = [
    { id: "coquimbo", name: "Región de Coquimbo" },
    { id: "valparaiso", name: "Región de Valparaíso" },
    { id: "metropolitana", name: "Región Metropolitana" },
    { id: "biobio", name: "Región del Biobío" },
    { id: "araucania", name: "Región de La Araucanía" }
  ];

  const comunasPorRegion: Record<string, string[]> = {
    coquimbo: ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
    valparaiso: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "San Antonio"],
    metropolitana: ["Santiago", "Puente Alto", "Maipú", "La Florida", "Providencia", "Las Condes"],
    biobio: ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de la Paz"],
    araucania: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"]
  };

  return (
    <IonPage className="login-page">
      <IonContent className="login-page" fullscreen>
        <div className="login-shell">
          
          <header className="login-header">
            <div className="brand">
              <div className="brand-icon">
                <IonIcon icon={medkitOutline} />
              </div>
              <div>
                <h2>MuniSalud</h2>
                <p>Municipalidad de Valparaíso</p>
              </div>
            </div>
          </header>

          <main className="login-hero" style={{ gridTemplateColumns: 'minmax(0, 1fr) 680px' }}>
            <div className="hero-copy">
              <span className="eyebrow">Registro de Pacientes</span>
              <h1>Únete a MuniSalud</h1>
              <p>Crea tu cuenta para acceder a los servicios de salud municipal, agenda citas y gestiona tus exámenes médicos de forma rápida y segura.</p>
              
            </div>

            <IonCard className="login-card" style={{ maxWidth: '680px', width: '100%' }}>
              <IonCardContent>
                <div className="card-title">
                  <h2>Crear cuenta</h2>
                  <p>Ingresa tus datos para registrarte en el sistema</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="field-group" style={{ gridColumn: 'span 1' }}>
                    <label className="field-label">Nombre de usuario</label>
                    <IonInput className="clean-input" placeholder="Ej: juanperez" />
                  </div>

                  <div className="field-group" style={{ gridColumn: 'span 1' }}>
                    <label className="field-label">RUT</label>
                    <IonInput className="clean-input" placeholder="12.345.678-9" />
                  </div>

                  <div className="field-group" style={{ gridColumn: 'span 2' }}>
                    <label className="field-label">Correo Electrónico</label>
                    <IonInput className="clean-input" type="email" placeholder="correo@ejemplo.com" />
                  </div>

                  <div className="field-group" style={{ gridColumn: 'span 1' }}>
                    <label className="field-label">Región</label>
                    <select 
                      className="clean-input" 
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      style={{ width: '100%', height: '58px', borderRadius: '16px', border: '1.5px solid #c8d3e0', padding: '0 16px', backgroundColor: '#ffffff', color: '#172033', fontSize: '17px', outline: 'none' }}
                    >
                      <option value="" disabled>Seleccione región</option>
                      {regiones.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group" style={{ gridColumn: 'span 1' }}>
                    <label className="field-label">Comuna</label>
                    <select 
                      className="clean-input" 
                      defaultValue=""
                      disabled={!selectedRegion}
                      style={{ width: '100%', height: '58px', borderRadius: '16px', border: '1.5px solid #c8d3e0', padding: '0 16px', backgroundColor: '#ffffff', color: '#172033', fontSize: '17px', outline: 'none', opacity: !selectedRegion ? 0.6 : 1 }}
                    >
                      <option value="" disabled>Seleccione comuna</option>
                      {selectedRegion && comunasPorRegion[selectedRegion].map(comuna => (
                        <option key={comuna} value={comuna}>{comuna}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group" style={{ gridColumn: 'span 1' }}>
                    <label className="field-label">Contraseña</label>
                    <IonInput className="clean-input" type="password" placeholder="••••••••" />
                  </div>

                  <div className="field-group" style={{ gridColumn: 'span 1' }}>
                    <label className="field-label">Confirmar Contraseña</label>
                    <IonInput className="clean-input" type="password" placeholder="••••••••" />
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                    <IonCheckbox mode="md" />
                    <span style={{ fontSize: '14px', color: '#1d2d44', fontWeight: 700 }}>
                      Acepto los términos y condiciones
                    </span>
                  </div>
                </div>

                <IonButton expand="block" className="btn-primary-login" style={{ marginTop: '20px' }}>
                  Registrarse
                </IonButton>

                <div className="security-note" style={{ marginTop: '20px' }}>
                  <IonIcon icon={shieldCheckmarkOutline} />
                  <span>Tus datos están protegidos y encriptados según la ley de protección de datos de pacientes.</span>
                </div>

                <p className="register-link" style={{ marginTop: '16px' }}>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
              </IonCardContent>
            </IonCard>
          </main>

          <footer className="login-footer">
            <div>
              <h3>Información</h3>
              <p>Acerca del Sistema</p>
              <p>Garantías GES</p>
            </div>
            <div>
              <h3>Legal</h3>
              <p>Política de Privacidad</p>
              <p>Términos y Condiciones</p>
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