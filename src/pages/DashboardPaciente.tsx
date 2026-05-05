import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/react";

export function DashboardPaciente() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SaludMunicipal - Panel Paciente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Solicitar Hora Médica</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Seleccione la especialidad médica requerida.</p>
            <IonButton expand="block" color="primary">
              Nueva Cita
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}