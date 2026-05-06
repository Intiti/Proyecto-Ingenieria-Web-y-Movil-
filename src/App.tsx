import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

/* Importa tus páginas aquí */
import Login from "./pages/Login"; // Asegúrate de que el nombre coincida con tu archivo
import Home from "./pages/Home";

/* CSS básico de Ionic */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

setupIonicReact();

export function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          
          {/* 1. Definimos la ruta /login */}
          <Route exact path="/login">
            <Login />
          </Route>

          {/* 2. Definimos la ruta /home */}
          <Route exact path="/home">
            <Home />
          </Route>

          {/* 3. El "Redireccionador": Si entras a la raíz (/), te manda al login */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}