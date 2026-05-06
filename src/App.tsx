import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";
import PatientMenu from "./components/PatientMenu";
import Documents from "./pages/Documents";
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

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/forgot-password">
            <ForgotPassword />
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
            <PlaceholderPage
              title="Notificaciones"
              description="Revisa avisos importantes sobre cambios de estado, citas o solicitudes."
            />
          </Route>

          <Route exact path="/perfil">
            <Perfil />
          </Route>

          <Route exact path="/ayuda">
            <Ayuda />
          </Route>

          <Route exact path="/admin/login">
            <PlaceholderPage
              title="Acceso funcionarios"
              description="Ingreso reservado para funcionarios municipales y administradores del sistema."
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