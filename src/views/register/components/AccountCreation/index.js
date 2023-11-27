import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormField from "components/FormField";
import { FormControl, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { verifyLength, verifyEmail, verifyPhone, phoneFormat } from "constants/methodConstants";
import { sub } from "date-fns";
import MDSnackbar from "components/MDSnackbar";
import { createAccount } from "util/AuthUtils";
import { useNavigate } from "react-router-dom";

const AccountCreation = React.forwardRef(({ setShowClap }, ref) => {
  const [phoneState, setPhoneState] = useState("");
  const [otherNameState, setOtherNameState] = useState("");
  const [firstNameState, setFirstNameState] = useState("");
  const [surNameState, setSurNameState] = useState("");
  const [userEmailState, setUserEmailState] = useState("");
  const [phone, setPhone] = useState("");
  const [otherName, setOtherName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dob, setDob] = useState(null);
  const [show, setShow] = useState(false);
  const [colorSnack, setColorSnack] = useState("info");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const inputValue = e.target.value;
    switch (e.target.name) {
      case "firstName":
        setFirstName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setFirstNameState("success");
        } else {
          setFirstNameState("error");
        }
        break;
      case "surName":
        setSurName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setSurNameState("success");
        } else {
          setSurNameState("error");
        }
        break;
      case "otherName":
        setOtherName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setOtherNameState("success");
        } else {
          setOtherNameState("error");
        }
        break;
      case "userEmail":
        setUserEmail(inputValue);
        if (verifyEmail(inputValue)) {
          setUserEmailState("success");
        } else {
          setUserEmailState("error");
        }
        break;
      case "phone":
        setPhone(phoneFormat(inputValue));
        if (verifyPhone(inputValue.replace("(", "").replace(")", "").replaceAll(" ", ""))) {
          setPhoneState("success");
        } else {
          setPhoneState("error");
        }
        break;

      default:
        break;
    }
  };

  function isValidated() {
    if (
      firstNameState === "success" &&
      surNameState === "success" &&
      userEmailState === "success" &&
      phoneState === "success" &&
      dob !== null
    ) {
      return true;
    }

    if (firstNameState !== "success") {
      setShow(true);
      setColorSnack("error");
      setFirstNameState("error");
      setSnackbarMessage("Your first name is invalid");
    } else if (surNameState !== "success") {
      setShow(true);
      setColorSnack("error");
      setSurNameState("error");
      setSnackbarMessage("Your surname is invalid");
    } else if (userEmailState !== "success") {
      setShow(true);
      setColorSnack("error");
      setUserEmailState("error");
      setSnackbarMessage("Your email is invalid");
    } else if (phoneState !== "success") {
      setShow(true);
      setColorSnack("error");
      setPhoneState("error");
      setSnackbarMessage("Your phone number is invalid");
    } else if (dob === null) {
      setShow(true);
      setColorSnack("error");
      setSnackbarMessage("Your date of birth is required");
    }
    return false;
  }

  function constructSignupPayload() {
    if (isValidated()) {
      return {
        first_name: firstName,
        surname: surName,
        other_name: otherName,
        email: userEmail,
        username: userEmail,
        date_of_birth: dob,
        phoneNumber: phone,
      };
    }
    return null;
  }

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit() {
        const SignupRequest = constructSignupPayload();
        console.log("handleSubmit: ", SignupRequest);
        if (SignupRequest !== null) {
          setShowClap(true);
          createAccount(SignupRequest)
            .then((response) => {
              setShow(true);
              setSnackbarMessage(response.message);
              if (response.success) {
                setColorSnack("success");
                navigate("/login");
              } else {
                setColorSnack("error");
              }
              setShowClap(false);
            })
            .catch((error) => {
              setSnackbarMessage(error.message);
              setColorSnack("error");
              setShow(true);
              setShowClap(false);
            });
        }
      },
    }),
    [firstName, surName, otherName, userEmail, phone, dob]
  );
  const toggleSnackbar = () => setShow(!show);

  const showDOBError = () => {
    setColorSnack("error");
    setSnackbarMessage("You are below age");
    toggleSnackbar();
  };

  const maxDate = sub(new Date(), { years: 10 });

  return (
    <MDBox>
      <MDSnackbar
        color={colorSnack}
        icon="notifications"
        title="System Notification"
        content={snackbarMessage}
        autoHideDuration={4000}
        open={show}
        close={toggleSnackbar}
        onClose={toggleSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <MDTypography variant="h5">Account Creation</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
              label="First Name"
              placeholder="Enter your first name"
              success={firstNameState === "success"}
              error={firstNameState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              name="surName"
              value={surName}
              onChange={onChange}
              label="Surname"
              placeholder="Enter your surname"
              success={surNameState === "success"}
              error={surNameState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              name="otherName"
              value={otherName}
              onChange={onChange}
              label="Other Name"
              placeholder="Enter your other name"
              success={otherNameState === "success"}
              error={otherNameState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              name="userEmail"
              value={userEmail}
              onChange={onChange}
              label="Email Address"
              placeholder="user@example.com"
              success={userEmailState === "success"}
              error={userEmailState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              name="phone"
              value={phone}
              onChange={onChange}
              label="Phone number"
              placeholder="(07X) XXX XXXX"
              success={phoneState === "success"}
              error={phoneState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  views={["year", "month", "day"]}
                  inputFormat="DD MMM, YYYY"
                  label="Date of Birth"
                  openTo="year"
                  value={dob}
                  maxDate={maxDate}
                  onChange={(newValue) => {
                    // console.log("dob: ", new Date(newValue));
                    setDob(new Date(newValue));
                  }}
                  onError={() => showDOBError()}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
        <MDTypography variant="h6">Note:</MDTypography>
        <MDTypography variant="body2" align="justify" gutterBottom>
          A password will be generated for you and sent to your mail{" "}
          {/* {registerEmail !== "" ? `:  ${registerEmail}  .` : `.`} */}
          at that point, you can login to continue with your application process. For any inquiries,
          please contact us by email: <strong>admissions@ucu.ac.ug</strong> or phone:
          <strong> +256 312 350 800 </strong> /880
        </MDTypography>
      </MDBox>
      <MDSnackbar
        color={colorSnack}
        icon="notifications"
        title="System Notification"
        content={snackbarMessage}
        autoHideDuration={4000}
        open={show}
        close={toggleSnackbar}
        onClose={toggleSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </MDBox>
  );
});

AccountCreation.propTypes = {
  setShowClap: PropTypes.func.isRequired,
};

export default AccountCreation;
