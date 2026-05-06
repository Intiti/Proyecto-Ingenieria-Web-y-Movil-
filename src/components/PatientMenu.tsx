import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import {
  homeOutline,
  timeOutline,
  calendarOutline,
  flaskOutline,
  notificationsOutline,
  documentTextOutline,
  personCircleOutline,
  helpCircleOutline,
  logOutOutline,
} from "ionicons/icons";

import "./PatientMenu.css";

const menuItems = [
  {
    title: "Inicio",
    path: "/home",
    icon: homeOutline,
  },
  {
    title: "Lista de espera",
    path: "/solicitudes",
    icon: timeOutline,
  },
  {
    title: "Agenda médica",
    path: "/agenda",
    icon: calendarOutline,
  },
  {
    title: "Exámenes",
    path: "/examenes",
    icon: flaskOutline,
  },
  {
    title: "Notificaciones",
    path: "/notificaciones",
    icon: notificationsOutline,
  },
  {
    title: "Documentos",
    path: "/documentos",
    icon: documentTextOutline,
  },
  {
    title: "Mi perfil",
    path: "/perfil",
    icon: personCircleOutline,
  },
  {
    title: "Ayuda",
    path: "/ayuda",
    icon: helpCircleOutline,
  },
];

const PatientMenu: React.FC = () => {
  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonContent className="patient-menu">
        <div className="menu-header">
          <div className="menu-logo">+</div>

          <div>
            <h2>MuniSalud</h2>
            <IonNote>Portal paciente</IonNote>
          </div>
        </div>

        <IonList className="menu-list">
          {menuItems.map((item) => (
            <IonMenuToggle key={item.path} autoHide={true}>
              <IonItem
                routerLink={item.path}
                routerDirection="root"
                lines="none"
                detail={false}
                className="menu-item"
              >
                <IonIcon icon={item.icon} slot="start" />
                <IonLabel>{item.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        <div className="menu-footer">
          <IonMenuToggle autoHide={true}>
            <IonItem
              routerLink="/login"
              routerDirection="root"
              lines="none"
              detail={false}
              className="menu-item logout"
            >
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default PatientMenu;
