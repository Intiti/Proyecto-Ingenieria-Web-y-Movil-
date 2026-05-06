import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import {
  flaskOutline,
  timeOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
} from "ionicons/icons";

import { useState } from "react";
import "./PlaceholderPage.css";

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
      instructions: "Ayuno estricto de 12 horas. Beber solo agua. No suspender tratamiento para la presión.",
      statusColor: "#d97706",
      statusBgColor: "#fffbeb",
      icon: alertCircleOutline,
      doctor: "Dra. Ana Pérez",
      size: "150 KB",
    },
    {
      id: 2,
      name: "Radiografía de Tórax",
      status: "En proceso",
      date: "2026-05-05",
      location: "Hospital Gustavo Fricke, Viña del Mar",
      schedule: "-",
      instructions: "Procedimiento realizado. Las imágenes se encuentran en etapa de análisis por el médico radiólogo.",
      statusColor: "#0b5cad",
      statusBgColor: "#eef7ff",
      icon: timeOutline,
      doctor: "Dr. Juan Gómez",
      size: "420 KB",
    },
    {
      id: 3,
      name: "Examen_Sangre_Completo.pdf",
      status: "Completado",
      date: "2026-02-18",
      location: "Laboratorio Municipal",
      schedule: "-",
      instructions: "Resultados validados y disponibles para el paciente.",
      statusColor: "#2b8a3e",
      statusBgColor: "#ebfbee",
      icon: checkmarkCircleOutline,
      doctor: "Laboratorio Municipal",
      size: "1.2 MB",
    },
  ];

  const filteredList = examenesList.filter((examen) => {
    if (filter === "Todos") return true;
    return examen.status === filter;
  });

  return (
    <IonPage>
      <IonHeader className="placeholder-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Exámenes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="placeholder-page">
        <main className="placeholder-shell">
          <section className="placeholder-card" style={{ marginBottom: "24px" }}>
            <div className="placeholder-icon">
              <IonIcon icon={flaskOutline} />
            </div>
            <h1 style={{ fontSize: "32px", fontWeight: 850, color: "#10233f" }}>
              Exámenes
            </h1>
            <p style={{ color: "#526179", fontSize: "17px", lineHeight: 1.55 }}>
              Revisa el estado de tus exámenes, indicaciones previas y lugar asignado.
            </p>
          </section>

          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            <IonButton
              fill={filter === "Todos" ? "solid" : "outline"}
              onClick={() => setFilter("Todos")}
              style={{
                "--border-radius": "12px",
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              Todos
            </IonButton>
            <IonButton
              fill={filter === "Pendiente" ? "solid" : "outline"}
              onClick={() => setFilter("Pendiente")}
              style={{
                "--border-radius": "12px",
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              Pendientes
            </IonButton>
            <IonButton
              fill={filter === "En proceso" ? "solid" : "outline"}
              onClick={() => setFilter("En proceso")}
              style={{
                "--border-radius": "12px",
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              En proceso
            </IonButton>
            <IonButton
              fill={filter === "Completado" ? "solid" : "outline"}
              onClick={() => setFilter("Completado")}
              style={{
                "--border-radius": "12px",
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              Completados
            </IonButton>
          </div>

          <IonGrid style={{ padding: 0 }}>
            <IonRow>
              {filteredList.map((examen) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={examen.id}>
                  <IonCard
                    style={{
                      borderRadius: "20px",
                      boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
                      margin: 0,
                      height: "100%",
                      background: "#ffffff",
                    }}
                  >
                    <IonCardContent
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        padding: "24px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            display: "grid",
                            placeItems: "center",
                            background: examen.statusBgColor,
                            color: examen.statusColor,
                          }}
                        >
                          <IonIcon icon={examen.icon} style={{ fontSize: "24px" }} />
                        </div>
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "12px",
                              fontWeight: "800",
                              color: examen.statusColor,
                              backgroundColor: examen.statusBgColor,
                              padding: "4px 10px",
                              borderRadius: "8px",
                              textTransform: "uppercase",
                              marginBottom: "2px",
                            }}
                          >
                            {examen.status}
                          </span>
                          <h2
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              fontWeight: "850",
                              color: "#10233f",
                            }}
                          >
                            {examen.name}
                          </h2>
                        </div>
                      </div>

                      <div style={{ flex: 1, color: "#526179", fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
                        <p style={{ margin: "6px 0" }}>
                          <strong>Fecha de emisión:</strong> {examen.date}
                        </p>
                        <p style={{ margin: "6px 0" }}>
                          <strong>Emitido por:</strong> {examen.doctor}
                        </p>
                        <p style={{ margin: "6px 0" }}>
                          <strong>Lugar:</strong> {examen.location}
                        </p>
                        <p style={{ margin: "6px 0" }}>
                          <strong>Instrucciones:</strong> {examen.instructions}
                        </p>
                        <p style={{ margin: "6px 0" }}>
                          <strong>Tamaño:</strong> {examen.size}
                        </p>
                      </div>

                      {examen.status === "Completado" && (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <IonButton
                            expand="block"
                            fill="solid"
                            disabled
                            style={{
                              flex: 1,
                              height: "44px",
                              "--border-radius": "12px",
                              "--background": "#f0f2f5",
                              "--color": "#64748b",
                              fontWeight: "800",
                              textTransform: "none",
                              margin: 0,
                            } as any}
                          >
                            Se encuentra en documentos
                          </IonButton>
                        </div>
                      )}
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