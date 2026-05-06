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
  documentTextOutline,
  downloadOutline,
  eyeOutline,
  medkitOutline,
  readerOutline,
  flaskOutline,
} from "ionicons/icons";

import { useState } from "react";
import "./PlaceholderPage.css";

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
      color: "#0b5cad",
      bgColor: "#eef7ff",
    },
    {
      id: 2,
      type: "Licencia Médica",
      name: "Licencia_Medica_14d.pdf",
      date: "2026-03-05",
      doctor: "Dr. Juan Gómez",
      size: "420 KB",
      icon: readerOutline,
      color: "#2b8a3e",
      bgColor: "#ebfbee",
    },
    {
      id: 3,
      type: "Examen de Laboratorio",
      name: "Examen_Sangre_Completo.pdf",
      date: "2026-02-18",
      doctor: "Laboratorio Municipal",
      size: "1.2 MB",
      icon: flaskOutline,
      color: "#d97706",
      bgColor: "#fffbeb",
    },
    {
      id: 4,
      type: "Receta Médica",
      name: "Receta_Ibuprofeno_400mg.pdf",
      date: "2026-04-20",
      doctor: "Dr. Roberto Silva",
      size: "160 KB",
      icon: medkitOutline,
      color: "#0b5cad",
      bgColor: "#eef7ff",
    },
    {
      id: 5,
      type: "Examen de Laboratorio",
      name: "Examen_Orina_Completo.pdf",
      date: "2026-04-28",
      doctor: "Laboratorio Municipal",
      size: "850 KB",
      icon: flaskOutline,
      color: "#d97706",
      bgColor: "#fffbeb",
    },
  ];

  const filteredList = documentsList.filter((doc) => {
    if (filter === "Todos") return true;
    return doc.type === filter;
  });

  return (
    <IonPage>
      <IonHeader className="placeholder-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Documentos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="placeholder-page">
        <main className="placeholder-shell">
          <section className="placeholder-card" style={{ marginBottom: "24px" }}>
            <div className="placeholder-icon">
              <IonIcon icon={documentTextOutline} />
            </div>
            <h1 style={{ fontSize: "32px", fontWeight: 850, color: "#10233f" }}>
              Mis Documentos
            </h1>
            <p style={{ color: "#526179", fontSize: "17px", lineHeight: 1.55 }}>
              Consulta, descarga y visualiza documentos asociados a tus solicitudes de salud.
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
              fill={filter === "Receta Médica" ? "solid" : "outline"}
              onClick={() => setFilter("Receta Médica")}
              style={{
                "--border-radius": "12px",
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              Recetas Médicas
            </IonButton>
            <IonButton
              fill={filter === "Licencia Médica" ? "solid" : "outline"}
              onClick={() => setFilter("Licencia Médica")}
              style={{
                "--border-radius": "12px",
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              Licencias Médicas
            </IonButton>
            <IonButton
              fill={filter === "Examen de Laboratorio" ? "solid" : "outline"}
              onClick={() => setFilter("Examen de Laboratorio")}
              style={{
                "--border-radius": "12px",
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              Exámenes
            </IonButton>
          </div>

          <IonGrid style={{ padding: 0 }}>
            <IonRow>
              {filteredList.map((doc) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={doc.id}>
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
                            background: doc.bgColor,
                            color: doc.color,
                          }}
                        >
                          <IonIcon icon={doc.icon} style={{ fontSize: "24px" }} />
                        </div>
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "12px",
                              fontWeight: "800",
                              color: doc.color,
                              backgroundColor: doc.bgColor,
                              padding: "4px 10px",
                              borderRadius: "8px",
                              textTransform: "uppercase",
                              marginBottom: "2px",
                            }}
                          >
                            {doc.type}
                          </span>
                          <h2
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              fontWeight: "850",
                              color: "#10233f",
                            }}
                          >
                            {doc.name}
                          </h2>
                        </div>
                      </div>

                      <div style={{ flex: 1, color: "#526179", fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Fecha de emisión:</strong> {doc.date}
                        </p>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Emitido por:</strong> {doc.doctor}
                        </p>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Tamaño:</strong> {doc.size}
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <IonButton
                          expand="block"
                          fill="outline"
                          style={{
                            flex: 1,
                            height: "44px",
                            "--border-radius": "12px",
                            "--border-color": "#0b72d9",
                            "--color": "#0b72d9",
                            fontWeight: "800",
                            textTransform: "none",
                            margin: 0,
                          } as any}
                        >
                          <IonIcon icon={eyeOutline} slot="start" />
                          Visualizar
                        </IonButton>

                        <IonButton
                          expand="block"
                          style={{
                            flex: 1,
                            height: "44px",
                            "--border-radius": "12px",
                            "--background": "linear-gradient(135deg, #0b72d9, #0757a5)",
                            "--color": "#ffffff",
                            fontWeight: "800",
                            textTransform: "none",
                            margin: 0,
                          } as any}
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