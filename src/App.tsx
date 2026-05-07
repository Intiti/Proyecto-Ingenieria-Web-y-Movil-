import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLogin from "./pages/auth/AdminLogin";

import Home from "./pages/patient/Home";
import Notificaciones from "./pages/patient/Notifications";
import Documents from "./pages/patient/Documents";
import Examenes from "./pages/patient/Examenes";
import Solicitudes from "./pages/patient/Solicitudes";
import Agenda from "./pages/patient/Agenda";
import Perfil from "./pages/patient/Perfil";
import Ayuda from "./pages/patient/Ayuda";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReportes from "./pages/admin/AdminReportes";
import AdminPacientes from "./pages/admin/AdminPacientes";
import AdminAgenda from "./pages/admin/AdminAgenda";
import AdminListas from "./pages/admin/AdminListas";

import AppMenu from "./components/AppMenu";

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
          {/* Rutas públicas */}
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/crear-cuenta">
            <Register />
          </Route>

          <Route exact path="/recuperar-contrasena">
            <ForgotPassword />
          </Route>

          {/* Compatibilidad con rutas antiguas */}
          <Route exact path="/register">
            <Redirect to="/crear-cuenta" />
          </Route>

          <Route exact path="/forgot-password">
            <Redirect to="/recuperar-contrasena" />
          </Route>

          {/* Rutas paciente */}
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
            <Examenes />
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

          {/* Rutas funcionario */}
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
