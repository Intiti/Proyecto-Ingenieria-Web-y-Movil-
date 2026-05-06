import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButton, IonInput, IonItem, IonLabel, IonCard, 
  IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonSegment, IonSegmentButton
} from '@ionic/react';
import { personOutline, settingsOutline } from 'ionicons/icons';
import './Login.css';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="login-background ion-padding">
        <div className="login-container">
          
          {/* Header Superior */}
          <div className="custom-header">
            <div className="logo-section">
              <span className="logo-icon">+</span>
              <span className="logo-text">MuniSalud</span>
            </div>
            <span className="municipality">Municipalidad de Valparaíso</span>
          </div>

          {/* Títulos Centrales */}
          <div className="titles">
            <h1>Sistema Municipal de Gestión de Listas de Espera</h1>
            <p>Accede a tus consultas, agenda citas y gestiona tus exámenes médicos</p>
          </div>

          {/* Tarjeta de Login */}
          <IonCard className="login-card">
            <IonCardContent>
              <IonLabel className="input-title">Tipo de Usuario</IonLabel>
              <IonSegment value="paciente" mode="ios">
                <IonSegmentButton value="paciente">
                  <IonIcon icon={personOutline} />
                  <IonLabel>PACIENTE</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="gestor">
                  <IonIcon icon={settingsOutline} />
                  <IonLabel>GESTOR/ADMIN</IonLabel>
                </IonSegmentButton>
              </IonSegment>

              <div className="form-inputs">
                <IonItem lines="none">
                  <IonInput label="RUT" labelPlacement="stacked" fill="outline" 
                  placeholder="12.345.678-9" />
                </IonItem>
                <p className="helper-text">Ingrese su RUT para identificación con ClaveÚnica</p>
                
                <IonItem lines="none">
                  <IonInput label="Contraseña" labelPlacement="stacked" fill="outline"
                  type="password" placeholder="Ingrese su contraseña" />
                </IonItem>
              </div>

              <IonButton expand="block" className="btn-claveunica">
                Ingresar con ClaveÚnica
              </IonButton>

              <p className="register-link">¿No tienes una cuenta? <a href="#">Regístrate aquí</a></p>
              <p className="disclaimer">Sistema integrado con ClaveÚnica para validación de identidad</p>
            </IonCardContent>
          </IonCard>

          {/* Footer Informativo */}
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

export default Login;