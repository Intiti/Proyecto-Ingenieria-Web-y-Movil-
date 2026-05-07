import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Notificaciones from "./pages/Notifications";
import AppMenu from "./components/AppMenu";
import Documents from "./pages/Documents";
import Examenes from "./pages/Examenes";
import Solicitudes from "./pages/Solicitudes";
import Agenda from "./pages/Agenda";
import Perfil from "./pages/Perfil";
import Ayuda from "./pages/Ayuda";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReportes from "./pages/AdminReportes";
import AdminPacientes from "./pages/AdminPacientes";
import AdminAgenda from "./pages/AdminAgenda";
import AdminListas from "./pages/AdminListas";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./theme/app-theme.css";

setupIonicReact();

export function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AppMenu />

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
            <AdminPacientes />
          </Route>

          <Route exact path="/admin/listas">
            <AdminListas />
          </Route>

          <Route exact path="/admin/reportes">
            <AdminReportes />
          </Route>

          <Route exact path="/admin/agenda">
            <AdminAgenda />
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
