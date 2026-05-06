import { 
  IonContent, 
  IonPage, 
  IonButton, 
  IonInput, 
  IonCard, 
  IonCardContent, 
  IonIcon, 
  IonCheckbox,
  IonSelect,
  IonSelectOption 
} from '@ionic/react';
import { medkitOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import './Login.css';

const Register: React.FC = () => {
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

          <main className="login-hero">
            <div className="hero-copy">
              <span className="eyebrow">Registro de Pacientes</span>
              <h1>Únete a MuniSalud</h1>
              <p>Crea tu cuenta para acceder a los servicios de salud municipal, agenda citas y gestiona tus exámenes médicos de forma rápida y segura.</p>
              
              <div className="security-note">
                <IonIcon icon={shieldCheckmarkOutline} />
                <p style={{ margin: 0 }}>Tus datos están protegidos y encriptados según la ley de protección de datos de pacientes.</p>
              </div>
            </div>

            <IonCard className="login-card">
              <IonCardContent>
                <div className="card-title">
                  <h2>Crear cuenta</h2>
                  <p>Ingresa tus datos para registrarte en el sistema</p>
                </div>

                <div className="form-inputs">
                  <div className="field-group">
                    <label className="field-label">Nombre de usuario</label>
                    <IonInput className="clean-input" placeholder="Ej: juanperez" />
                  </div>

                  <div className="field-group">
                    <label className="field-label">RUT</label>
                    <IonInput className="clean-input" placeholder="12.345.678-9" />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Correo Electrónico</label>
                    <IonInput className="clean-input" type="email" placeholder="correo@ejemplo.com" />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Comuna</label>
                    <IonSelect className="clean-input" placeholder="Seleccione comuna" mode="md">
                      <IonSelectOption value="valparaiso">Valparaíso</IonSelectOption>
                      <IonSelectOption value="vina">Viña del Mar</IonSelectOption>
                      <IonSelectOption value="quilpue">Quilpué</IonSelectOption>
                      <IonSelectOption value="villaAlemana">Villa Alemana</IonSelectOption>
                      <IonSelectOption value="concon">Concón</IonSelectOption>
                    </IonSelect>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Contraseña</label>
                    <IonInput className="clean-input" type="password" placeholder="••••••••" />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Confirmar Contraseña</label>
                    <IonInput className="clean-input" type="password" placeholder="••••••••" />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                    <IonCheckbox mode="md" />
                    <span style={{ fontSize: '14px', color: '#1d2d44', fontWeight: 700 }}>
                      Acepto los términos y condiciones
                    </span>
                  </div>
                </div>

                <IonButton expand="block" className="btn-primary-login">
                  Registrarse
                </IonButton>

                <p className="register-link">¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
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