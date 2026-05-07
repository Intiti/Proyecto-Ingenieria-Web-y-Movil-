import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
} from "@ionic/react";

import {
  documentTextOutline,
  downloadOutline,
  eyeOutline,
  medkitOutline,
  readerOutline,
  flaskOutline,
  homeOutline,
} from "ionicons/icons";

import { useState } from "react";
import "./Documents.css";

const Documents: React.FC = () => {
  const [filter, setFilter] = useState("Todos");

  const documentsList = [
    {
      id: 1,
      type: "Receta Médica",
      name: "Receta_Paracetamol_500mg.pdf",
      date: "2026-04-12",
      doctor: "Dra. Ana Pérez",
      size: "150 KB",
      icon: medkitOutline,
      variant: "blue",
    },
    {
      id: 2,
      type: "Licencia Médica",
      name: "Licencia_Medica_14d.pdf",
      date: "2026-03-05",
      doctor: "Dr. Juan Gómez",
      size: "420 KB",
      icon: readerOutline,
      variant: "green",
    },
    {
      id: 3,
      type: "Examen de Laboratorio",
      name: "Examen_Sangre_Completo.pdf",
      date: "2026-02-18",
      doctor: "Laboratorio Municipal",
      size: "1.2 MB",
      icon: flaskOutline,
      variant: "orange",
    },
    {
      id: 4,
      type: "Receta Médica",
      name: "Receta_Ibuprofeno_400mg.pdf",
      date: "2026-04-20",
      doctor: "Dr. Roberto Silva",
      size: "160 KB",
      icon: medkitOutline,
      variant: "blue",
    },
  ];

  const filteredList = documentsList.filter((doc) => {
    if (filter === "Todos") return true;
    return doc.type === filter;
  });

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Documentos</IonTitle>

          <IonButtons slot="end">
            <IonButton
              routerLink="/home"
              fill="clear"
              className="app-header-btn"
            >
              <IonIcon icon={homeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-page documents-page">
        <main className="app-shell">
          <section className="app-hero documents-hero">
            <div>
              <p className="app-eyebrow">Documentación médica</p>
              <h1>Mis documentos</h1>
              <p>
                Consulta, descarga y visualiza documentos asociados a tus
                solicitudes de salud.
              </p>
            </div>

            <div className="documents-hero-icon">
              <IonIcon icon={documentTextOutline} />
            </div>
          </section>

          <section className="document-filters">
            <IonButton
              fill={filter === "Todos" ? "solid" : "outline"}
              className={
                filter === "Todos"
                  ? "document-filter-btn active"
                  : "document-filter-btn"
              }
              onClick={() => setFilter("Todos")}
            >
              Todos
            </IonButton>

            <IonButton
              fill={filter === "Receta Médica" ? "solid" : "outline"}
              className={
                filter === "Receta Médica"
                  ? "document-filter-btn active"
                  : "document-filter-btn"
              }
              onClick={() => setFilter("Receta Médica")}
            >
              Recetas Médicas
            </IonButton>

            <IonButton
              fill={filter === "Licencia Médica" ? "solid" : "outline"}
              className={
                filter === "Licencia Médica"
                  ? "document-filter-btn active"
                  : "document-filter-btn"
              }
              onClick={() => setFilter("Licencia Médica")}
            >
              Licencias Médicas
            </IonButton>

            <IonButton
              fill={filter === "Examen de Laboratorio" ? "solid" : "outline"}
              className={
                filter === "Examen de Laboratorio"
                  ? "document-filter-btn active"
                  : "document-filter-btn"
              }
              onClick={() => setFilter("Examen de Laboratorio")}
            >
              Exámenes
            </IonButton>
          </section>

          <IonGrid className="documents-grid">
            <IonRow>
              {filteredList.map((doc) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={doc.id}>
                  <IonCard className="app-card document-card">
                    <IonCardContent>
                      <div className="document-card-header">
                        <div className={`document-icon ${doc.variant}`}>
                          <IonIcon icon={doc.icon} />
                        </div>

                        <div>
                          <span className={`document-type ${doc.variant}`}>
                            {doc.type}
                          </span>

                          <h2>{doc.name}</h2>
                        </div>
                      </div>

                      <div className="document-meta">
                        <p>
                          <strong>Fecha de emisión:</strong> {doc.date}
                        </p>

                        <p>
                          <strong>Emitido por:</strong> {doc.doctor}
                        </p>

                        <p>
                          <strong>Tamaño:</strong> {doc.size}
                        </p>
                      </div>

                      <div className="document-actions">
                        <IonButton
                          expand="block"
                          fill="outline"
                          className="app-outline-btn document-action-btn"
                        >
                          <IonIcon icon={eyeOutline} slot="start" />
                          Visualizar
                        </IonButton>

                        <IonButton
                          expand="block"
                          className="app-primary-btn document-action-btn"
                        >
                          <IonIcon icon={downloadOutline} slot="start" />
                          Descargar
                        </IonButton>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Documents;