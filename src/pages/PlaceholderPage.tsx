import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { constructOutline } from "ionicons/icons";

import "./PlaceholderPage.css";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
}) => {
  return (
    <IonPage>
      <IonHeader className="placeholder-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="placeholder-page">
        <main className="placeholder-shell">
          <section className="placeholder-card">
            <div className="placeholder-icon">
              <IonIcon icon={constructOutline} />
            </div>

            <h1>{title}</h1>
            <p>{description}</p>

            <IonButton routerLink="/home" routerDirection="back">
              Volver al inicio
            </IonButton>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default PlaceholderPage;
