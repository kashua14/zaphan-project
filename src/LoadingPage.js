import React from "react";
// import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

function LoadingPage() {
  return (
    <Box
      sx={{
        boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: " blur(8px)",
        textAlign: "center",
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <Typography variant="h4" color="secondary">
        Loading Page...
      </Typography>
    </Box>
  );
}

LoadingPage.propTypes = {};

export default LoadingPage;
