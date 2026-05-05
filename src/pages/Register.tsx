import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox
} from "@ionic/react";

export function Register() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SaludMunicipal - Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre de usuario</IonLabel>
          <IonInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">RUT</IonLabel>
          <IonInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Correo Electrónico</IonLabel>
          <IonInput type="email" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Región</IonLabel>
          <IonInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Comuna</IonLabel>
          <IonInput />
        </IonItem>
        <IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" />
          </IonItem>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirmar Contraseña</IonLabel>
          <IonInput type="password" />
        </IonItem>
        
        <IonItem lines="none" className="ion-margin-top">
          <IonCheckbox slot="start" />
          <IonLabel>Acepto términos y condiciones</IonLabel>
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" color="primary">
          Registrarse
        </IonButton>
      </IonContent>
    </IonPage>
  );
}