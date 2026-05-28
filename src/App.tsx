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
import ProtectedRoute from "./components/ProtectedRoute";

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
          {/* =========================
              Rutas públicas
          ========================= */}

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/crear-cuenta">
            <Register />
          </Route>

          <Route exact path="/recuperar-contrasena">
            <ForgotPassword />
          </Route>

          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>

          {/* =========================
              Compatibilidad con rutas antiguas
          ========================= */}

          <Route exact path="/register">
            <Redirect to="/crear-cuenta" />
          </Route>

          <Route exact path="/forgot-password">
            <Redirect to="/recuperar-contrasena" />
          </Route>

          {/* =========================
              Rutas protegidas paciente
          ========================= */}

          <ProtectedRoute exact path="/home" allowedRoles={["PACIENTE"]}>
            <Home />
          </ProtectedRoute>

          <ProtectedRoute exact path="/documentos" allowedRoles={["PACIENTE"]}>
            <Documents />
          </ProtectedRoute>

          <ProtectedRoute exact path="/solicitudes" allowedRoles={["PACIENTE"]}>
            <Solicitudes />
          </ProtectedRoute>

          <ProtectedRoute exact path="/agenda" allowedRoles={["PACIENTE"]}>
            <Agenda />
          </ProtectedRoute>

          <ProtectedRoute exact path="/examenes" allowedRoles={["PACIENTE"]}>
            <Examenes />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/notificaciones"
            allowedRoles={["PACIENTE"]}
          >
            <Notificaciones />
          </ProtectedRoute>

          <ProtectedRoute exact path="/perfil" allowedRoles={["PACIENTE"]}>
            <Perfil />
          </ProtectedRoute>

          <ProtectedRoute exact path="/ayuda" allowedRoles={["PACIENTE"]}>
            <Ayuda />
          </ProtectedRoute>

          {/* =========================
              Rutas protegidas funcionario
          ========================= */}

          <ProtectedRoute
            exact
            path="/admin/dashboard"
            allowedRoles={["FUNCIONARIO", "ADMIN"]}
          >
            <AdminDashboard />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/pacientes"
            allowedRoles={["FUNCIONARIO", "ADMIN"]}
          >
            <AdminPacientes />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/listas"
            allowedRoles={["FUNCIONARIO", "ADMIN"]}
          >
            <AdminListas />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/reportes"
            allowedRoles={["FUNCIONARIO", "ADMIN"]}
          >
            <AdminReportes />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/agenda"
            allowedRoles={["FUNCIONARIO", "ADMIN"]}
          >
            <AdminAgenda />
          </ProtectedRoute>

          {/* =========================
              Ruta inicial
          ========================= */}

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
