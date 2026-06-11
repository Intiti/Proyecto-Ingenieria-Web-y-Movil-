import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./features/auth/presentation/screens/Login";
import Register from "./features/auth/presentation/screens/Register";
import ForgotPassword from "./features/auth/presentation/screens/ForgotPassword";
import AdminLogin from "./features/auth/presentation/screens/AdminLogin";

import Home from "./features/paciente/presentation/screens/Home";
import Notificaciones from "./features/paciente/presentation/screens/Notifications";
import Documents from "./features/paciente/presentation/screens/Documents";
import Examenes from "./features/paciente/presentation/screens/Examenes";
import Solicitudes from "./features/paciente/presentation/screens/Solicitudes";
import Agenda from "./features/paciente/presentation/screens/Agenda";
import Perfil from "./features/paciente/presentation/screens/Perfil";
import Ayuda from "./features/paciente/presentation/screens/Ayuda";

import AdminDashboard from "./features/admin/presentation/screens/AdminDashboard";
import AdminReportes from "./features/admin/presentation/screens/AdminReportes";
import AdminPacientes from "./features/admin/presentation/screens/AdminPacientes";
import AdminAgenda from "./features/admin/presentation/screens/AdminAgenda";
import AdminListas from "./features/admin/presentation/screens/AdminListas";

import AppMenu from "./core/presentation/components/AppMenu";
import ProtectedRoute from "./core/presentation/components/ProtectedRoute";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./core/theme/app-theme.css";

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
