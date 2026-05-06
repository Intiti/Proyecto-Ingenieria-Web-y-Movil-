import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Notificaciones from "./pages/Notifications";
import PlaceholderPage from "./pages/PlaceholderPage";
import PatientMenu from "./components/PatientMenu";
import Documents from "./pages/Documents";
import Examenes from "./pages/Examenes";
import Solicitudes from "./pages/Solicitudes";
import Agenda from "./pages/Agenda";
import Perfil from "./pages/Perfil";
import Ayuda from "./pages/Ayuda";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

setupIonicReact();

export function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <PatientMenu />

        <IonRouterOutlet id="main-content">
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/home">
            <Home />
          </Route>

          <Route exact path="/documentos">
            <Documents />
          </Route>

          <Route exact path="/solicitudes">
            <Solicitudes/>
          </Route>

          <Route exact path="/agenda">
            <Agenda/>
          </Route>

          <Route exact path="/examenes">
            <Examenes/>
          </Route>

          <Route exact path="/notificaciones">
            <Notificaciones />
          </Route>

          <Route exact path="/perfil">
            <Perfil />
          </Route>

          <Route exact path="/ayuda">
            <Ayuda />
          </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;