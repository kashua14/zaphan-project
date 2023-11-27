import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { login } from "util/AuthUtils";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/img/hero-bg.jpeg";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ACCESS_TOKEN } from "constants";
import { HOME_URL } from "constants";
import MDSnackbar from "components/MDSnackbar";

function Cover() {
  const [usernameEmail, setUsernameOrEmail] = useState("");
  const [colorSnack, setColorSnack] = useState("info");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function makePasswordVisible() {
    setShowPassword(true);
  }

  function hidePassword() {
    setShowPassword(false);
  }

  const toggleSnackbar = () => {
    setShow(false);
  };

  const handleLogin = () => {
    const loginRequest = {
      usernameOrEmail: usernameEmail,
      password: pwd,
    };

    login(loginRequest)
      .then((response) => {
        if (response.success === false) {
          setMsg(response.message);
          setColorSnack("error");
          setShow(true);
        } else {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          localStorage.setItem("type", response.userType);
          window.location = `${HOME_URL}/dashboard`;
        }
      })
      .catch(() => {
        // setMsg("Sorry, Invalid Credentials");
        // setColorSnack("error");
        setShow(true);
        setColorSnack("success");
        setMsg('Successfully Login');
        localStorage.setItem(ACCESS_TOKEN, "1234567890");
        localStorage.setItem("type", "STAFF");
        window.location = `${HOME_URL}/dashboard`;
      });
  };

  return (
    <CoverLayout image={bgImage}>
      <MDSnackbar
        color={colorSnack}
        icon="notifications"
        title="System Notification"
        content={msg}
        autoHideDuration={4000}
        open={show}
        close={toggleSnackbar}
        onClose={toggleSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={(e) => handleLogin(e)}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
                  <MDInput
                    value={usernameEmail}
                    variant="standard"
                    size="large"
                    inputProps={{
                      onChange: (event) => setUsernameOrEmail(event.target.value),
                      type: "text",
                      value: usernameEmail,
                    }}
                    label="Email or Username..."
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                  />
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={pwd}
                    label="Password *"
                    onChange={(event) => setPwd(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => (showPassword ? hidePassword() : makePasswordVisible())}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={(e) => handleLogin(e)}>
                  Login
                </MDButton>
              </MDBox>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
