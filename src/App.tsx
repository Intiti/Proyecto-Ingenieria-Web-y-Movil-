import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";
import PatientMenu from "./components/PatientMenu";

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

          <Route exact path="/solicitudes">
            <PlaceholderPage
              title="Lista de espera"
              description="Consulta el estado de tus solicitudes médicas y revisa el avance de tu atención."
            />
          </Route>

          <Route exact path="/agenda">
            <PlaceholderPage
              title="Agenda médica"
              description="Revisa tus próximas citas y solicitudes de atención municipal."
            />
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

          <Route exact path="/documentos">
            <PlaceholderPage
              title="Documentos"
              description="Accede a documentos médicos y antecedentes asociados a tus solicitudes."
            />
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