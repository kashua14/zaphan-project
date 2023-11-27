import React from "react";

import PropTypes from "prop-types";
import Lottie from "react-lottie";
import backToSchool from "assets/animations/Application/backToSchool.json";
import { Grid, Hidden } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function Requirements({ showAccountNotice }) {
  const backToSchoolOptions = {
    loop: true,
    autoplay: true,
    animationData: backToSchool,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <MDBox mt={-10} textAlign="center" px={2}>
        <MDTypography mt={7} variant="h5" fontWeight="bold">
          Application Requirements&nbsp;
          <MDTypography variant="caption1" fontSize={15}>
            <em>(Please read carefully before continuing with the application) </em>
          </MDTypography>
        </MDTypography>

        <MDBox mt={2}>
          <Grid container>
            <Hidden only={["xs", "sm", "md"]}>
              <Grid item xs={12} sm={12} md={5}>
                <Lottie options={backToSchoolOptions} width={300} height={300} />
              </Grid>
            </Hidden>

            <Grid item xs={12} sm={12} md={7}>
              <MDTypography variant="h2" align="justify" fontSize={25} gutterBottom>
                Academic Documents
              </MDTypography>
              <MDTypography variant="body1" align="justify" gutterBottom>
                Certificate copies of both <em>&quot;O&quot; level and &quot;A&quot; level </em>
                result slips/certificates, other qualifications and birth certificate should be
                attached to this e-form.
                <br />
                All academic Records in a language other than English must be accompanied by a
                certified English translation. At Registration all originals shall be required.
              </MDTypography>
              <MDBox mt={3} />
              <MDTypography variant="h2" align="justify" fontSize={25} gutterBottom>
                Additional Information
              </MDTypography>
              <MDTypography variant="body1" align="justify" gutterBottom>
                To start this application, make sure you have an <em>email address</em>. If you
                don&#39;t have, please create one. <br />
                An <em>activation key</em> will be sent to your <em>email</em> to activate the
                applicants account.
              </MDTypography>
              <MDBox mt={3} />
              <MDTypography variant="h5" align="justify">
                All the Best!
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* {showAccountNotice && <AccountNoticeDialog />} */}
    </>
  );
}
Requirements.defaultProps = {
  showAccountNotice: true,
};
Requirements.propTypes = {
  showAccountNotice: PropTypes.bool,
};
