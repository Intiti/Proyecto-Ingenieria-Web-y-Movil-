import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from "@ionic/react";

import "@ionic/react/css/core.css";

setupIonicReact();

export function App() {
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>SaludMunicipal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-text-center ion-padding">
          <h1>Hola Mundo</h1>
          <p>Bienvenido a la plataforma SaludMunicipal</p>
        </IonContent>
      </IonPage>
    </IonApp>
  );
}