import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Notificaciones from "./pages/Notifications";
import PlaceholderPage from "./pages/PlaceholderPage";
import PatientMenu from "./components/PatientMenu";
import Documents from "./pages/Documents";
import Solicitudes from "./pages/Solicitudes";
import Agenda from "./pages/Agenda";

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
            <PlaceholderPage
              title="Exámenes"
              description="Consulta exámenes pendientes, resultados disponibles y documentos asociados."
            />
          </Route>

          <Route exact path="/notificaciones">
            <Notificaciones />
          </Route>

          <Route exact path="/perfil">
            <PlaceholderPage
              title="Mi perfil"
              description="Revisa y actualiza tus datos personales y de contacto."
            />
          </Route>

          <Route exact path="/ayuda">
            <PlaceholderPage
              title="Ayuda"
              description="Encuentra orientación sobre el uso del sistema y canales de contacto municipal."
            />
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