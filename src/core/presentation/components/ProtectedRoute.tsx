import { Redirect, Route, RouteProps } from "react-router-dom";

type UserRole = "PACIENTE" | "FUNCIONARIO" | "ADMIN";

type ProtectedRouteProps = RouteProps & {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
};

const getRolFromStorage = (): UserRole | null => {
  try {
    const raw = localStorage.getItem("munisalud_user");
    if (!raw) return null;
    const user = JSON.parse(raw) as { rol: UserRole };
    return user.rol ?? null;
  } catch {
    return null;
  }
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
  ...routeProps
}) => {
  return (
    <Route
      {...routeProps}
      render={() => {
        const token = localStorage.getItem("munisalud_token");
        const rol = getRolFromStorage();

        if (!token || !rol) return <Redirect to="/login" />;
        if (allowedRoles && !allowedRoles.includes(rol)) return <Redirect to="/login" />;

        return <>{children}</>;
      }}
    />
  );
};

export default ProtectedRoute;