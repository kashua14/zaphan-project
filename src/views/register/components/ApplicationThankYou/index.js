import React from "react";
import PropTypes from "prop-types";
import CustomDialog from "components/Dialog/CustomDialog";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import MDButton from "components/MDButton";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ApplicationThankYou({ isAccountActivation, goback, email }) {
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={isAccountActivation} maxWidth="sm" fullWidth TransitionComponent={Transition}>
      <DialogTitle id="greeting"> All is set!</DialogTitle>
      <DialogContent>
        <Grid
          container
          direction={matchDownSM ? "column" : "row"}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item sm={12} md={12}>
            <DialogContentText>
              <Typography variant="body1" gutterBottom align="justify">
                We have sent an email to {email !== "" ? email : "your email address"}. This mail
                contains the login details that you will use to access the system to fill the
                e-application form.
                <br />
              </Typography>
            </DialogContentText>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent={matchDownSM ? "center" : "center"} alignItems="center">
          <Grid item>
            <MDButton onClick={goback} variant="text" color="primary">
              <LockOpenIcon />
              LOGIN NOW
            </MDButton>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

ApplicationThankYou.defaultProps = {
  email: "your email address",
};
ApplicationThankYou.propTypes = {
  isAccountActivation: PropTypes.bool.isRequired,
  email: PropTypes.string,
  goback: PropTypes.func.isRequired,
};
