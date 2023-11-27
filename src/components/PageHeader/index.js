import React from "react";
import PropTypes from "prop-types";
import { Alert, Grid, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import { TipsAndUpdatesOutlined } from "@mui/icons-material";
import MDBox from "components/MDBox";

function PageHeader({ title, actions, subTitle, showAlert }) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={showAlert ? 12 : 10}>
        {showAlert ? (
          <Alert
            severity="warning"
            icon={<TipsAndUpdatesOutlined color="warning" />}
            action={
              <MDBox sx={{ m: "auto", display: { xs: "none", sm: "none", md: "block" } }}>
                {actions}
              </MDBox>
            }
          >
            <Typography variant="body1">{title}</Typography>
          </Alert>
        ) : (
          <MDTypography required variant="subtitle1" fontWeight="medium">
            {title}
          </MDTypography>
        )}
        {subTitle !== null && (
          <MDTypography variant="body2" color="text">
            {subTitle}
          </MDTypography>
        )}
      </Grid>

      {!showAlert && (
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          sx={{ m: "auto", display: { xs: "none", sm: "none", md: "block" } }}
        >
          {/* Only show the action buttons on larger screens  */}
          {actions}
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        p={2}
        sx={{ m: "auto", display: { xs: "block", sm: "block", md: "none" } }}
      >
        {/* Only show the action buttons on small screens like phone */}
        {actions}
      </Grid>
    </Grid>
  );
}

PageHeader.defaultProps = {
  showAlert: false,
  subTitle: null,
  actions: null,
};

PageHeader.propTypes = {
  actions: PropTypes.node,
  subTitle: PropTypes.string,
  showAlert: PropTypes.bool,
  title: PropTypes.node.isRequired,
};

export default PageHeader;
