import { Redirect, Route, RouteProps } from "react-router-dom";

type UserRole = "PACIENTE" | "FUNCIONARIO" | "ADMIN";

type ProtectedRouteProps = RouteProps & {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
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
        const storedUser = localStorage.getItem("munisalud_user");

        if (!token || !storedUser) {
          return <Redirect to="/login" />;
        }

        try {
          const user = JSON.parse(storedUser) as { rol: UserRole };

          if (allowedRoles && !allowedRoles.includes(user.rol)) {
            return <Redirect to="/login" />;
          }

          return <>{children}</>;
        } catch {
          localStorage.removeItem("munisalud_token");
          localStorage.removeItem("munisalud_user");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;