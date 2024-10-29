import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import routes from "./routes";
import React, { useRef } from "react";
import { toCamelCase } from "../utils";
import Loader from "../components/loader";
import "../index.css";
import { NotificationContainer } from "react-notifications";
import PrivateRoute from "./privateRoute";

const AppRoutes = () => {
  const loaderRef = useRef(null);

  const getReactElement = (route) => {
    let screen = toCamelCase(route);
    return React.createElement(require(`../screens/${screen}`).default);
  };

  const getLayout = (route, screen) => {
    let layout = toCamelCase(route);
    const LayoutComponent = require(`../layouts/${layout}`).default;
    return <LayoutComponent>{getReactElement(screen)}</LayoutComponent>;
  };

  const checkPermissions = (element) => {
    const hasPermission = true;
  
    if (hasPermission) {
      return element;
    } else {
      return <Navigate to="/no-permission" />;
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map(
            (
              { layout = "", path, childrens, component = "", init = "" },
              index
            ) => {
              if (childrens) {
                return childrens.map(({ screen, childPath }, i) => {
                  return (
                    <Route
                      key={`${index}_${i}`}
                      path={`${path}${childPath}`}
                      element={<PrivateRoute element={getLayout(layout, screen)}/>}
                    />
                  );
                });
              } else {
                return path === "*" ? (
                  <Route
                    key={"page_404"}
                    path={path}
                    element={getReactElement(component)}
                  />
                ) : path === "/no-permission" ? (
                  <Route
                    key={"page_no_permission"}
                    path={path}
                    element={getReactElement(component)}
                  />
                ) :

                  (
                    <Route
                      key={`init_${path}`}
                      path={path}
                      element={<Navigate to={init} />}
                    />
                  );
              }
            }
          )}
        </Routes>
      </Router>
      <NotificationContainer />
      <Loader ref={loaderRef} />
    </div>
  );
};

export default AppRoutes;
