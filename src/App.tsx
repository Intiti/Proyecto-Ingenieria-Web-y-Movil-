import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Notificaciones from "./pages/Notifications";
import PlaceholderPage from "./pages/PlaceholderPage";
import PatientMenu from "./components/PatientMenu";
import Documents from "./pages/Documents";
import Examenes from "./pages/Examenes";
import Solicitudes from "./pages/Solicitudes";
import Agenda from "./pages/Agenda";
import Perfil from "./pages/Perfil";
import Ayuda from "./pages/Ayuda";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

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
            <Solicitudes />
          </Route>

          <Route exact path="/agenda">
            <Agenda />
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

          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>

          <Route exact path="/admin/dashboard">
            <AdminDashboard />
          </Route>

          <Route exact path="/admin/pacientes">
            <PlaceholderPage
              title="Gestión de pacientes"
              description="Vista administrativa para revisar, buscar y actualizar información de pacientes."
            />
          </Route>

          <Route exact path="/admin/listas">
            <PlaceholderPage
              title="Gestión de listas de espera"
              description="Vista administrativa para priorizar, actualizar y supervisar solicitudes médicas."
            />
          </Route>

          <Route exact path="/admin/reportes">
            <PlaceholderPage
              title="Reportes"
              description="Vista administrativa para consultar indicadores y reportes del sistema municipal."
            />
          </Route>

          <Route exact path="/admin/agenda">
            <PlaceholderPage
              title="Agenda administrativa"
              description="Vista para revisar y coordinar citas médicas desde el rol funcionario."
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
