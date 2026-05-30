import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IonSpinner } from "@ionic/react";
import { apiRequest } from "../services/api";

type UserRole = "PACIENTE" | "FUNCIONARIO" | "ADMIN";

type ProtectedRouteProps = RouteProps & {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
};

type AuthState = "loading" | "ok" | "fail" | "forbidden";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
  ...routeProps
}) => {
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    const token = localStorage.getItem("munisalud_token");

    if (!token) {
      setAuthState("fail");
      return;
    }

    // verifica token contra el backend
    apiRequest<{ ok: boolean; user: { rol: UserRole } }>("/auth/me")
      .then((data) => {
        if (allowedRoles && !allowedRoles.includes(data.user.rol)) {
          setAuthState("forbidden");
        } else {
          setAuthState("ok");
        }
      })
      .catch(() => {
        // token expirado o invalido
        localStorage.removeItem("munisalud_token");
        localStorage.removeItem("munisalud_user");
        setAuthState("fail");
      });
  }, []);

  return (
    <Route
      {...routeProps}
      render={() => {
        if (authState === "loading") {
          return (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "40px" }}>
              <IonSpinner name="crescent" />
            </div>
          );
        }
        if (authState === "fail") return <Redirect to="/login" />;
        if (authState === "forbidden") return <Redirect to="/login" />;
        return <>{children}</>;
      }}
    />
  );
};

export default ProtectedRoute;