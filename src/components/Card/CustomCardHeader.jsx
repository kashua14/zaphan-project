import { CardHeader } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import React from "react";

const CustomCardHeader = ({ title, subheader, primaryColor, secondaryColor, icon, id }) => {
  const materialTheme = createTheme({
    components: {
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "10px !important",
            background: `linear-gradient(45deg, ${primaryColor ?? "#8f93a9"}  90%, ${
              secondaryColor ?? "#5A5A5A"
            } 10%)`,
          },
          title: {
            fontSize: 18,
            color: "white",
            fontWeight: "normal",
            // textAlign: "center",
          },
          subheader: {
            color: "#E0E0E0",
            fontSize: 14,
            // textAlign: "center",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={materialTheme}>
      <CardHeader
        id={id}
        title={title}
        action={
          <IconButton aria-label="settings" disabled>
            {icon ?? <AcUnitIcon fontSize="large" style={{ color: "white" }} />}
          </IconButton>
        }
        subheader={subheader}
      />
    </ThemeProvider>
  );
};

export default CustomCardHeader;
