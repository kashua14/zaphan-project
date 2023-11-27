import { useState } from "react";
import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";
import { ClapSpinner } from "react-spinners-kit";
// import { Link } from "react-router-dom";
import { login, checkUserName } from "util/AuthUtils";
import { VisibilityOff, Visibility, ArrowForwardIos } from "@mui/icons-material";
import {
  createTheme,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  // TextField,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "./input.css";
import MDBox from "components/MDBox";
import BasicLayout from "layouts/authentication/components/BasicLayout";

import NoBG from "assets/img/silverJubulie.png";
import bgImage from "assets/images/logo.png";
import { HOME_URL, ACCESS_TOKEN } from "constants";
import MDInput from "components/MDInput";
// import MDTypography from "components/MDTypography";

const styles = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "grey",
        },
      },
    },
  },
});

function Basic() {
  const [usernameEmail, setUsernameOrEmail] = useState("");
  const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState(true);
  const [pwd, setPwd] = useState("");
  const [showClap, setShowClap] = useState(false);
  const [colorSnack, setColorSnack] = useState("info");
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

  // function addTokenFunc(response, userNameOrEmail) {
  //   setShowClap(true);
  //   setIsPasswordFieldVisible(true);
  //   const dataShow = {
  //     accessToken: response.accessToken,
  //     type: response.userType,
  //     userName: userNameOrEmail,
  //   };
  //   // alert(type)
  //   addToken(dataShow)
  //     .then(() => {
  //       if (response.success) {
  //         localStorage.setItem("type", response.userType);
  //         window.location = `${HOME_URL}/?user=${userNameOrEmail}`;
  //       }
  //     })
  //     .catch(() => {
  //       setShowClap(false);
  //       setMsg("Sorry, An Error Occurred");
  //       setColorSnack("error");
  //       setShow(true);
  //     });
  // }

  function handleSubmitUserName(e) {
    e.preventDefault();

    const loginRequest = {
      usernameOrEmail: usernameEmail,
    };

    if (usernameEmail.length === 0) {
      setMsg("Please first fill in your username or email");
      setColorSnack("error");
      setShow(true);
    } else {
      setShowClap(true);
      checkUserName(loginRequest)
        .then((response) => {
          if (response.success) {
            setIsPasswordFieldVisible(false);
            setUsernameOrEmail(usernameEmail);
          } else {
            setShowClap(false);
            console.log(response.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setShowClap(false);
          setMsg("Sorry, Invalid Username Or Email");
          setColorSnack("error");
          setShow(true);
        });
    }
  }

  const handleLogin = () => {
    const loginRequest = {
      usernameOrEmail: usernameEmail,
      password: pwd,
    };

    login(loginRequest)
      .then((response) => {
        if (response.success === false) {
          setMsg("Sorry, Invalid Credentials");
          setColorSnack("error");
          setShow(true);
        } else {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          localStorage.setItem("type", response.userType);
          window.location = `${HOME_URL}/dashboard`;
        }
      })
      .catch(() => {
        setMsg("Sorry, Invalid Credentials");
        setColorSnack("error");
        setShow(true);
      });
  };

  return (
    <BasicLayout // image={bgImage}
    >
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
      <MDBox mx={1} mt={-3} p={1} mb={1} textAlign="center">
        <MDBox
          sx={{
            borderRadius: "2px",
            overflow: "hidden",
            boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
            WebkitBackdropFilter: "blur(8px)",
            backdropFilter: " blur(8px)",
            paddingBottom:  "10px",
            background: "rgba(0,0,0,0.4)",
            textAlign: "center",
            border: "1px solid #333",
          }}
        >
          <MDBox
            sx={{
              background: "rgba(255,255,255,1)",
              padding: "5px",
              // borderBottom:"4px solid #303517"
            }}
          >
            <img src={bgImage} style={{ maxWidth: "100%" }} alt="logo" />
          </MDBox>

          <MDBox>
            <form
              onSubmit={(e) => (isPasswordFieldVisible ? handleSubmitUserName(e) : handleLogin(e))}
            >
              <Grid container justify="center">
                <ThemeProvider theme={styles}>
                  <Grid
                    item
                    xs={isPasswordFieldVisible ? 9 : 12}
                    sm={isPasswordFieldVisible ? 9 : 12}
                    p={1}
                  >
                    <FormControl fullWidth margin="normal">
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
                  </Grid>
                    <Grid item xs={9} sm={9}>
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
                                onClick={() =>
                                  showPassword ? hidePassword() : makePasswordVisible()
                                }
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                  
                </ThemeProvider>
                <Grid item xs={3} sm={3} md={3}>
                  <FormControl fullWidth>
                    {isPasswordFieldVisible && showClap ? (
                      <MDBox sx={{ marginTop: "30px", marginLeft: "20px" }}>
                        <ClapSpinner loading size={20} frontColor="#FFFFFF" />
                      </MDBox>
                    ) : (
                      <MDButton
                        color="white"
                        variant="text"
                        size="medium"
                        style={{ marginTop: "30px" }}
                        onClick={(e) =>
                          handleLogin(e)
                        }
                      >
                        {isPasswordFieldVisible ? (
                          <>
                            Next <ArrowForwardIos />
                          </>
                        ) : (
                          "Login"
                        )}
                      </MDButton>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </MDBox>
        </MDBox>
        <MDBox sx={{ width: "100%", textAlign: "center", paddingTop: "10px" }} mt="4">
          {/* <MDTypography variant="button" color="white">
            Don&#39;t have an account? &nbsp;
          </MDTypography>

          <Link to="/register">
            <MDTypography variant="button" color="warning">
              Register here
            </MDTypography>
          </Link> */}
        </MDBox>
      </MDBox>
    </BasicLayout>
  );
}

export default Basic;
