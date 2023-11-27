import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { SnackbarProvider } from "notistack";

let data = null;
const url = new URL(window.location.href);
const jwt = url.searchParams.get("user");
data = jwt;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
    <SnackbarProvider
          maxSnack={3}
          autoHideDuration={1000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
      <App jwt={data} />
      </SnackbarProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
