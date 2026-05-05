import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/react";

export function DashboardAdmin() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SaludMunicipal - Panel Administrador</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Gestión de Listas de Espera</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Disponibilidad Médica</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Reportes y Estadísticas</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}