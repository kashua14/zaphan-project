import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import SpinnerRoot from "./SpinnerRoot";

export default function LoadingIndicator({ loading }) {
  return (
    <div>
      <Backdrop
        sx={{
          backgroundColor: "rgba(8, 5, 117, 0.1)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <SpinnerRoot />
      </Backdrop>
    </div>
  );
}

LoadingIndicator.propTypes = {
  loading: PropTypes.bool.isRequired,
};
