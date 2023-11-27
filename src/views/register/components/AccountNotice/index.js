import React, { useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import onlineLearning from "assets/animations/Application/onlineLearning.json";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function AccountNoticeDialog() {
  const theme = useTheme();
  const navigate = useNavigate();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const onlineLearningOptions = {
    loop: true,
    autoplay: true,
    animationData: onlineLearning,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [openDialog, setOpenDialog] = useState(true);

  return (
    <MDBox>
      <Dialog open={openDialog} maxWidth="sm" fullWidth>
        <DialogTitle id="greeting"> Hello there,</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction={matchDownSM ? "column" : "row"}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid item sm={12} md={6}>
              <MDTypography variant="body1" gutterBottom align="justify">
                We thank you for choosing Uganda Christian University, A Centre of Excellence in the
                Heart of Africa. If you had already started your application, please log in and
                continue. Else, you can now start your application.
                <br />
                <strong>Good luck!</strong>
              </MDTypography>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box>
                <Lottie
                  options={onlineLearningOptions}
                  width={200}
                  // height={250}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            justifyContent={matchDownSM ? "center" : "space-between"}
            alignItems="center"
          >
            <Grid item>
              <MDButton onClick={() => navigate("/login")} variant="text" color="info">
                Resume Application
              </MDButton>
            </Grid>
            <Grid item>
              <MDButton onClick={() => setOpenDialog(false)} variant="text" color="primary">
                Start Application
              </MDButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}
