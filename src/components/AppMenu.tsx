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

import { useLocation } from "react-router-dom";

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
  peopleOutline,
  analyticsOutline,
  clipboardOutline,
  briefcaseOutline,
} from "ionicons/icons";

import "./AppMenu.css";

const patientItems = [
  { title: "Inicio", path: "/home", icon: homeOutline },
  { title: "Lista de espera", path: "/solicitudes", icon: timeOutline },
  { title: "Agenda médica", path: "/agenda", icon: calendarOutline },
  { title: "Exámenes", path: "/examenes", icon: flaskOutline },
  {
    title: "Notificaciones",
    path: "/notificaciones",
    icon: notificationsOutline,
  },
  { title: "Documentos", path: "/documentos", icon: documentTextOutline },
  { title: "Mi perfil", path: "/perfil", icon: personCircleOutline },
  { title: "Ayuda", path: "/ayuda", icon: helpCircleOutline },
];

const adminItems = [
  { title: "Panel funcionario", path: "/admin/dashboard", icon: homeOutline },
  { title: "Pacientes", path: "/admin/pacientes", icon: peopleOutline },
  { title: "Listas de espera", path: "/admin/listas", icon: clipboardOutline },
  {
    title: "Agenda administrativa",
    path: "/admin/agenda",
    icon: calendarOutline,
  },
  { title: "Reportes", path: "/admin/reportes", icon: analyticsOutline },
];

const AppMenu: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const items = isAdminRoute ? adminItems : patientItems;

  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonContent className="app-menu">
        <div
          className={
            isAdminRoute ? "menu-header admin-menu-header" : "menu-header"
          }
        >
          <div className="menu-logo">
            <IonIcon icon={isAdminRoute ? briefcaseOutline : homeOutline} />
          </div>

          <div>
            <h2>MuniSalud</h2>
            <IonNote>
              {isAdminRoute ? "Portal funcionario" : "Portal paciente"}
            </IonNote>
          </div>
        </div>

        <IonList className="menu-list">
          {items.map((item) => (
            <IonMenuToggle key={item.path} autoHide={true}>
              <IonItem
                routerLink={item.path}
                routerDirection="root"
                lines="none"
                detail={false}
                className={
                  location.pathname === item.path
                    ? "menu-item menu-item-active"
                    : "menu-item"
                }
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

export default AppMenu;
