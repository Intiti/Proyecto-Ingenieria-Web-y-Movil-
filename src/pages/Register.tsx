import { 
  IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel, IonCard, 
  IonCardContent, IonGrid, IonRow, IonCol, IonCheckbox
} from '@ionic/react';
import './Login.css';

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="login-background ion-padding">
        <div className="login-container">
          
          <div className="custom-header">
            <div className="logo-section">
              <span className="logo-icon">+</span>
              <span className="logo-text">MuniSalud</span>
            </div>
            <span className="municipality">Municipalidad de Valparaíso</span>
          </div>

          <div className="titles">
            <h1>Registro de Pacientes</h1>
            <p>Crea tu cuenta para acceder a los servicios de salud municipal</p>
          </div>

          <IonCard className="login-card">
            <IonCardContent>
              <div className="form-inputs">
                <IonItem lines="none">
                  <IonInput label="Nombre de usuario" labelPlacement="stacked" fill="outline" placeholder="Ej: juanperez" />
                </IonItem>

                <IonItem lines="none">
                  <IonInput label="RUT" labelPlacement="stacked" fill="outline" placeholder="12.345.678-9" />
                </IonItem>

                <IonItem lines="none">
                  <IonInput label="Correo Electrónico" labelPlacement="stacked" fill="outline" type="email" placeholder="correo@ejemplo.com" />
                </IonItem>

                <IonItem lines="none">
                  <IonInput label="Región" labelPlacement="stacked" fill="outline" placeholder="Ej: Valparaíso" />
                </IonItem>

                <IonItem lines="none">
                  <IonInput label="Comuna" labelPlacement="stacked" fill="outline" placeholder="Ej: Valparaíso" />
                </IonItem>

                <IonItem lines="none">
                  <IonInput label="Contraseña" labelPlacement="stacked" fill="outline" type="password" placeholder="Cree una contraseña" />
                </IonItem>

                <IonItem lines="none">
                  <IonInput label="Confirmar Contraseña" labelPlacement="stacked" fill="outline" type="password" placeholder="Repita la contraseña" />
                </IonItem>

                <IonItem lines="none" className="ion-margin-top">
                  <IonCheckbox slot="start" justify="start" />
                  <IonLabel className="ion-text-wrap" style={{ fontSize: '0.9rem' }}>Acepto los términos y condiciones</IonLabel>
                </IonItem>
              </div>

              <IonButton expand="block" className="btn-claveunica">
                Registrarse
              </IonButton>

              <p className="register-link">¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
            </IonCardContent>
          </IonCard>

          <footer className="login-footer">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <h3>Información</h3>
                  <p>Acerca del Sistema</p>
                  <p>Garantías GES</p>
                </IonCol>
                <IonCol>
                  <h3>Legal</h3>
                  <p>Política de Privacidad</p>
                  <p>Términos y Condiciones</p>
                </IonCol>
                <IonCol>
                  <h3>Contacto</h3>
                  <p>600 360 7777</p>
                  <p>contacto@munisalud.cl</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </footer>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;