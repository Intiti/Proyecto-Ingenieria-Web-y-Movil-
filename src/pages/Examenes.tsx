import { useState } from "react";

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
  flaskOutline,
  timeOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  documentTextOutline,
  homeOutline,
} from "ionicons/icons";

import "./Examenes.css";

const Examenes: React.FC = () => {
  const [filter, setFilter] = useState("Todos");

  const examenesList = [
    {
      id: 1,
      name: "Perfil Bioquímico y Hemograma",
      status: "Pendiente",
      date: "2026-05-12",
      location: "CESFAM Central, Viña del Mar",
      schedule: "08:00 - 09:30",
      instructions:
        "Ayuno estricto de 12 horas. Beber solo agua. No suspender tratamiento para la presión.",
      icon: alertCircleOutline,
      doctor: "Dra. Ana Pérez",
      size: "150 KB",
      variant: "orange",
    },
    {
      id: 2,
      name: "Radiografía de Tórax",
      status: "En proceso",
      date: "2026-05-05",
      location: "Hospital Gustavo Fricke, Viña del Mar",
      schedule: "-",
      instructions:
        "Procedimiento realizado. Las imágenes se encuentran en etapa de análisis por el médico radiólogo.",
      icon: timeOutline,
      doctor: "Dr. Juan Gómez",
      size: "420 KB",
      variant: "blue",
    },
    {
      id: 3,
      name: "Examen_Sangre_Completo.pdf",
      status: "Completado",
      date: "2026-02-18",
      location: "Laboratorio Municipal",
      schedule: "-",
      instructions: "Resultados validados y disponibles para el paciente.",
      icon: checkmarkCircleOutline,
      doctor: "Laboratorio Municipal",
      size: "1.2 MB",
      variant: "green",
    },
  ];

  const filteredList = examenesList.filter((examen) => {
    if (filter === "Todos") return true;
    return examen.status === filter;
  });

  return (
    <IonPage>
      <IonHeader className="app-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Exámenes</IonTitle>

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

      <IonContent className="app-page examenes-page">
        <main className="app-shell">
          <section className="app-hero examenes-hero">
            <div>
              <p className="app-eyebrow">Resultados e indicaciones</p>
              <h1>Exámenes</h1>
              <p>
                Revisa el estado de tus exámenes, indicaciones previas, lugar
                asignado y disponibilidad de resultados.
              </p>
            </div>

            <div className="examenes-hero-icon">
              <IonIcon icon={flaskOutline} />
            </div>
          </section>

          <section className="examenes-filters">
            <IonButton
              fill={filter === "Todos" ? "solid" : "outline"}
              className={
                filter === "Todos"
                  ? "examenes-filter-btn active"
                  : "examenes-filter-btn"
              }
              onClick={() => setFilter("Todos")}
            >
              Todos
            </IonButton>

            <IonButton
              fill={filter === "Pendiente" ? "solid" : "outline"}
              className={
                filter === "Pendiente"
                  ? "examenes-filter-btn active"
                  : "examenes-filter-btn"
              }
              onClick={() => setFilter("Pendiente")}
            >
              Pendientes
            </IonButton>

            <IonButton
              fill={filter === "En proceso" ? "solid" : "outline"}
              className={
                filter === "En proceso"
                  ? "examenes-filter-btn active"
                  : "examenes-filter-btn"
              }
              onClick={() => setFilter("En proceso")}
            >
              En proceso
            </IonButton>

            <IonButton
              fill={filter === "Completado" ? "solid" : "outline"}
              className={
                filter === "Completado"
                  ? "examenes-filter-btn active"
                  : "examenes-filter-btn"
              }
              onClick={() => setFilter("Completado")}
            >
              Completados
            </IonButton>
          </section>

          <IonGrid className="examenes-grid">
            <IonRow>
              {filteredList.map((examen) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={examen.id}>
                  <IonCard className="app-card examen-card">
                    <IonCardContent>
                      <div className="examen-card-header">
                        <div className={`examen-icon ${examen.variant}`}>
                          <IonIcon icon={examen.icon} />
                        </div>

                        <div>
                          <span className={`examen-status ${examen.variant}`}>
                            {examen.status}
                          </span>

                          <h2>{examen.name}</h2>
                        </div>
                      </div>

                      <div className="examen-meta">
                        <p>
                          <strong>Fecha:</strong> {examen.date}
                        </p>

                        <p>
                          <strong>Emitido por:</strong> {examen.doctor}
                        </p>

                        <p>
                          <strong>Lugar:</strong> {examen.location}
                        </p>

                        <p>
                          <strong>Horario:</strong> {examen.schedule}
                        </p>

                        <p>
                          <strong>Indicaciones:</strong> {examen.instructions}
                        </p>

                        <p>
                          <strong>Tamaño:</strong> {examen.size}
                        </p>
                      </div>

                      <div className="examen-actions">
                        {examen.status === "Completado" ? (
                          <IonButton
                            expand="block"
                            routerLink="/documentos"
                            className="app-primary-btn examen-action-btn"
                          >
                            <IonIcon icon={documentTextOutline} slot="start" />
                            Ver en documentos
                          </IonButton>
                        ) : (
                          <IonButton
                            expand="block"
                            disabled
                            className="examen-disabled-btn"
                          >
                            Resultados pendientes
                          </IonButton>
                        )}
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

export default Examenes;