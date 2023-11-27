import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { Suspense, lazy, useState } from "react";

// react-router components
import { Routes, Route } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav } from "context";
import ucuLogo from "assets/img/logo-dark.png";

import { ACCESS_TOKEN } from "constants";
import MyAppProvider from "context/MyAppProvider";
import { ConfirmProvider } from "material-ui-confirm";
import LoadingPage from "LoadingPage";

const Dashboard = lazy(() => import("views/dashbord"));
const SignInBasic = lazy(() => import("views/sign-in/cover/index"));

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, sidenavColor, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const token = localStorage.getItem(ACCESS_TOKEN);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
          cancellationButtonProps: { color: "warning" },
        }}
      >
        <MyAppProvider>
          <CssBaseline />
          <Suspense fallback={<LoadingPage />}>
            {token ? (
              <>
                {layout === "dashboard" && (
                  <>
                    <Sidenav
                      color={sidenavColor}
                      brand={ucuLogo}
                      routes={routes}
                      brandName="React-app"
                      onMouseEnter={handleOnMouseEnter}
                      onMouseLeave={handleOnMouseLeave}
                    />
                    <Configurator />
                  </>
                )}

                <Suspense fallback={<LoadingPage />}>
                  <DashboardLayout>
                    <Routes>
                      {getRoutes(routes)}
                      <Route path="*" key="/apply" element={<Dashboard />} />
                    </Routes>
                  </DashboardLayout>
                </Suspense>
              </>
            ) : (
              <Routes>
                <Route path="/" key="/login" element={<SignInBasic />} />
                <Route path="/login" key="/login-page" element={<SignInBasic />} />
              </Routes>
            )}
          </Suspense>
        </MyAppProvider>
      </ConfirmProvider>
    </ThemeProvider>
  );
}
