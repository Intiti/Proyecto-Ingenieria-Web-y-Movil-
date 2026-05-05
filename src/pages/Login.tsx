import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/react';

export function Login() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SaludMunicipal - Acceso</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">RUT</IonLabel>
          <IonInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" color="primary">
          Ingresar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}