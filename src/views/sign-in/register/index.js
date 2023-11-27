import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

import { isPossiblePhoneNumber } from "react-phone-number-input";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { signup } from "util/AuthUtils";
import Grid from "@mui/material/Grid";

import {
  verifyPhone,
  verifyLength,
  phoneFormat,
  verifyEmail,
  isPasswordValid,
} from "constants/methodConstants";

import FormField from "components/FormField";
import { checkEmailAvailability } from "util/AuthUtils";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/img/hero-bg.jpeg";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MDSnackbar from "components/MDSnackbar";
import { useSnackbar } from "notistack";
import PhoneNumberInput from "components/PhoneNumberInput";

function Cover({ formData }) {
  const [firstName, setFirstName] = useState("");
  const [firstNameState, setFirstNameState] = useState("");
  const [surname, setSurname] = useState("");
  const [surnameState, setSurnameState] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberState, setMobileNumberState] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEmailState, setUserEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordState, setRepeatPasswordState] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [colorSnack, setColorSnack] = useState("info");
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [hideForm, setHideForm] = useState(false);




  function makePasswordVisible() {
    setShowPassword(true);
  }

  function hidePassword() {
    setShowPassword(false);
  }

  function makeRepeatPasswordVisible() {
    setShowRepeatPassword(true);
  }

  function hideRepeatPassword() {
    setShowRepeatPassword(false);
  }

  const onChange = (e) => {

  

    const inputValue = e.target.value;
    const phoneValue = inputValue.replace("(", "").replace(")", "").replaceAll(" ", "");
    switch (e.target.name) {
      case "firstName":
        setFirstName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setFirstNameState("success");
        } else {
          setFirstNameState("error");
        }
        break;
      case "surname":
        setSurname(inputValue);
        if (verifyLength(inputValue, 3)) {
          setSurnameState("success");
        } else {
          setSurnameState("error");
        }
        break;

      case "userEmail":
        setUserEmail(inputValue);
        someFunction(inputValue);
        break;

      case "password":
        setPassword(inputValue);
        if (isPasswordValid(inputValue)) {
          setPasswordState("success");
        } else {
          setPasswordState("error");
        }
        break;
      case "repeatPassword":
        setRepeatPassword(inputValue);
        if (passwordsMatch(password, inputValue)) {
          setRepeatPasswordState("success");
        } else {
          setRepeatPasswordState("error");
        }
        break;

      case "mobileNumber":
        setMobileNumber(phoneFormat(inputValue));
        if (verifyPhone(phoneValue)) {
          setMobileNumberState("success");
        } else {
          setMobileNumberState("error");
        }
        break;

      default:
        break;
    }
  };

  function passwordsMatch(pass, repPass) {
    return pass === repPass;
  }

  async function someFunction(inputValue) {
    try {
      const emailAvailable = await handleCheckEmail(inputValue);

      if (emailAvailable) {
        // Email is available, you can now perform verification.
        if (await verifyEmail(inputValue)) {
          setUserEmailState("success");
        } else {
          setUserEmailState("error");
        }
      } else {
        // Email is not available.
        setUserEmailState("error");
        openSnackbar("Email is already in use.", "error");
      }
    } catch (error) {
      // Handle any errors that occur during the email availability check.
      console.error("Error checking email availability:", error);

      setUserEmailState("error");
    }
  }

  async function handleCheckEmail(data) {
    const MyRequest = {
      email: data,
    };

    try {
      const response = await checkEmailAvailability(MyRequest);
      console.log("countries => ", response);
      return response; // Return true or false based on the response.
    } catch (error) {
      console.log("loadReligiousAffiliationEnums => ", error.message);
      return false; // Return false in case of an error.
    }
  }

  function isValidated() {
    if (
      firstNameState === "success" &&
      surnameState === "success" &&
      userEmailState === "success" &&
      passwordState === "success" &&
      repeatPasswordState === "success" &&
      mobileNumberState === "success"
    ) {
      return true;
    } else {
      if (firstNameState !== "success") {
        setFirstNameState("error");
        openSnackbar("Your first name is invalid", "error");
      }
      if (surnameState !== "success") {
        setSurnameState("error");
        openSnackbar("Your surname is invalid", "error");
      }
      if (userEmailState !== "success") {
        setUserEmailState("error");
        openSnackbar("Your email is invalid", "error");
      }
      if (passwordState !== "success") {
        setPasswordState("error");
        openSnackbar("Your password is invalid", "error");
      }
      if (repeatPasswordState !== "success") {
        setRepeatPasswordState("error");
        openSnackbar("Your repeat password is invalid", "error");
      }
      if (mobileNumberState !== "success") {
        setMobileNumberState("error");
        openSnackbar("Your mobile number is invalid", "error");
      }
      return false;
    }
  }


  function onPhoneChange(value) {
    setMobileNumber(value);
    setMobileNumberState(isPossiblePhoneNumber(value ?? "") ? "success" : "error");

    if(!isPossiblePhoneNumber(value ?? "") ){
      openSnackbar("Your mobile number is invalid", "error");
    }
  }





  const handleRegister = () => {

    const myRequest = {
      firstName: firstName,
      surname: surname,
      email: userEmail,
      password: password,
      phoneNumber: mobileNumber,
    }
    console.log("myRequest => ", myRequest);

    if(isValidated()){
      signup(myRequest)
      .then((response) => {
        if (response.success === false) {
          setMsg(response.message);
          setColorSnack("error");
          setShow(true);
        } else {       
          setMsg(response.message);
          setColorSnack("success");
          setShow(true);  
          // window.location = `${HOME_URL}/dashboard`;
          setHideForm(true);
        }
      }
      )
        

    }



  };

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  const toggleSnackbar = () => {
    setShow(false);
  };


  return (
    <CoverLayout image={bgImage} isRegister>
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
      <Card sx={{zIndex: 500,}}>
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

          {!hideForm?          <>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Fill this Form to Register
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            All this fields are Mandatory
          </MDTypography>
          </>:
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Successfully Registered
        </MDTypography>
          }

        </MDBox>





        {!hideForm? 
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={(e) => handleRegister(e)}>
            <MDBox>
              <MDBox lineHeight={0}>
                <MDTypography variant="h5">Registration</MDTypography>
                <MDTypography variant="button" color="text">
                  Please complete the form provided below to initiate the account creation process.
                  Once you have submitted your information, our administrators will review your
                  registration. You will receive an email notification once your registration has
                  been approved.
                </MDTypography>
              </MDBox>
              <MDBox mt={1.625}>
                <Grid container mb={3} spacing={3}>
                  <Grid item xs={12} sm={12} lg={6} xl={6}>
                    <FormField
                      // type={firstName.type}
                      label={"First Name"}
                      name="firstName"
                      value={firstName}
                      onChange={onChange}
                      placeholder={"First Name"}
                      success={firstNameState === "success"}
                      error={firstNameState === "error"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6} xl={6}>
                    <FormField
                      // type={surname.type}
                      label={"Last Name"}
                      name="surname"
                      value={surname}
                      onChange={onChange}
                      placeholder={"Last Name"}
                      success={surnameState === "success"}
                      error={surnameState === "error"}
                    />
                  </Grid>
                </Grid>
                <Grid container mb={3} spacing={3}>
                  <Grid item xs={12} sm={12} lg={6} xl={6}>
                    {/* <FormField
                      name="mobileNumber"
                      value={mobileNumber}
                      onChange={onChange}
                      label="Mobile Number"
                      placeholder="+256 735 631 620"
                      // inputProps={{ type: "number" }}
                      success={mobileNumberState === "success"}
                      error={mobileNumberState === "error"}
                    /> */}

                        <PhoneNumberInput
                            value={mobileNumber}
                            name="mobileNumber"
                            setPhoneState={mobileNumberState}
                            onChange={(value) => onPhoneChange(value)}
                          />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6} xl={6}>
                    <FormField
                      isRequired
                      name="userEmail"
                      value={userEmail}
                      label="Email Address"
                      onChange={onChange}
                      placeholder="mjordans@gmail.com"
                      inputProps={{ type: "email" }}
                      success={userEmailState === "success"}
                      error={userEmailState === "error"}
                    />
                  </Grid>
                </Grid>
                <Grid container mb={3} spacing={3}>
                  <Grid item xs={12} sm={12} lg={6} xl={6}>
                    <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        name="password"
                        label="Password *"
                        onChange={onChange}
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
                        success={passwordState === "success"}
                        error={passwordState === "error"}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6} xl={6}>
                    <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Repeat Password</InputLabel>
                      <Input
                        type={showRepeatPassword? "text" : "password"}
                        label={"Repeat Password"}
                        name="repeatPassword"
                        value={repeatPassword}
                        onChange={onChange}
                        placeholder={"Repeat Password"}
                        success={repeatPasswordState === "success"}
                        error={repeatPasswordState === "error"}
                        inputProps={{ autoComplete: "" }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() =>
                                showRepeatPassword
                                  ? hideRepeatPassword()
                                  : makeRepeatPasswordVisible()
                              }
                            >
                              {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>

            <Grid justifyItems={"center"} container mt={4} mb={1}>
            <Grid  item xs={12} sm={12} >
              <MDButton size="large" variant="gradient" color="info" fullWidth onClick={(e) => handleRegister(e)}>
                Submit
              </MDButton>
              </Grid>
            </Grid>

            
          </form>
        </MDBox>:

<MDBox pt={4} pb={3} px={3}>
    <MDBox lineHeight={0}>
      <MDTypography variant="h5">Registration</MDTypography>
      <MDTypography variant="button" color="text">
      You have successfully registered! Please check your email for further instructions.
      </MDTypography>
    </MDBox>
    </MDBox>

                      }

<MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Do have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Login
                </MDTypography>
              </MDTypography>
            </MDBox>

      </Card>
    </CoverLayout>
  );
}

export default Cover;
