// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import FormField from "components/FormField";

// Data
import { useEffect, useState } from "react";
import {
  verifyPhone,
  verifyLength,
  phoneFormat,
  verifyEmail,
} from "constants/methodConstants";
import { Alert } from "@mui/material";

import PropTypes from "prop-types";
import { LooksOne, LooksTwo } from "@mui/icons-material";

function BioInfo({ locationDetails }) {
  const [mobileNumberState, setMobileNumberState] = useState("" );
  const [countryState, setCountryState] = useState( "error" );
  const [districtState, setDistrictState] = useState( "" );
  const [phoneState, setPhoneState] = useState("error");
  const [surNameState, setSurNameState] = useState( "error");
  const [phone, setPhone] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otherName, setOtherName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [district, setDistrict] = useState(null);
  const [country, setCountry] = useState(null);
  const [showDistrictsOrDioceses, setShowDistrictsOrDioceses] = useState(false);
  const [otherNameState, setOtherNameState] = useState("");
  const [firstNameState, setFirstNameState] = useState("");
  const [userEmailState, setUserEmailState] = useState("" );

  useEffect(() => {
  }, []);


  const getSearchCountry = (_, newValue) => {
    setCountry(newValue);
    setCountryState("success");
    if (newValue.label === "Uganda") {
      setShowDistrictsOrDioceses(false);
    } else {
      setShowDistrictsOrDioceses(true);
    }
  };

  const getSearchDistrict = (_, newValue) => {
    setDistrict(newValue);
    setDistrictState("success");
  };

  const countries = [];
  const nationalities = [];

  locationDetails?.countries?.map(({ countryname, id, natinality }) => {
    countries.push({ label: countryname, value: id });
    if (
      natinality !== null &&
      !nationalities.some(
        (e) => e.label !== null && e.label.toLowerCase() === natinality?.toLowerCase()
      )
    ) {
      nationalities.push({ label: natinality, value: id });
    }
    return 0;
  });
  const districts = [];
  locationDetails?.districts?.map(({ districtname, id }) => {
    districts.push({ label: districtname, value: id });
    return 0;
  });

  const dioceses = [];
  locationDetails?.diocess?.map(({ name, id }) => {
    dioceses.push({ label: name, value: id });
    return 0;
  });



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
        if (verifyPhone(phoneValue)) {
          setPhoneState("success");
        } else {
          setPhoneState("error");
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

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
      <MDBox p={3}>
        <Grid item sm={12} md={12} mt={2}>
          <Alert color="info" icon={<LooksOne fontSize="inherit" />}>
            Bio Information
          </Alert>
        </Grid>{" "}
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={onChange}
              placeholder="Joshua"
              success={firstNameState === "success"}
              error={firstNameState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="Surname"
              name="surName"
              value={surName}
              onChange={onChange}
              placeholder="Kasasira"
              success={surNameState === "success"}
              error={surNameState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              label="Other Name"
              name="otherName"
              value={otherName}
              onChange={onChange}
              // placeholder="Kasasira"
              success={otherNameState === "success"}
              error={otherNameState === "error"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              value={country}
              options={countries}
              defaultValue={country}
              onChange={getSearchCountry}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Country"
                  InputLabelProps={{ shrink: true }}
                  success={countryState === "success"}
                  error={countryState === "error"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              value={district}
              options={districts}
              defaultValue={district}
              disabled={showDistrictsOrDioceses}
              onChange={getSearchDistrict}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="District "
                  InputLabelProps={{ shrink: true }}
                  success={districtState === "success"}
                  error={districtState === "error"}
                />
              )}
            />
          </Grid>

          <Grid item sm={12} md={12} mt={2}>
            <Alert color="warning" icon={<LooksTwo fontSize="inherit" />}>
              Contact Information
            </Alert>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormField
              disabled
              isRequired
              label="Email"
              name="userEmail"
              value={userEmail}
              variant="standard"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
              success={userEmailState === "success"}
              error={userEmailState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              name="phone"
              value={phone}
              label="Phone Number"
              onChange={onChange}
              placeholder="+40 735 631 620"
              // inputProps={{ type: "number" }}
              success={phoneState === "success"}
              error={phoneState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              name="mobileNumber"
              value={mobileNumber}
              onChange={onChange}
              label="Mobile Number"
              placeholder="+40 735 631 620"
              // inputProps={{ type: "number" }}
              success={mobileNumberState === "success"}
              error={mobileNumberState === "error"}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the BioInfo
BioInfo.propTypes = {
  nextStep: PropTypes.string.isRequired,
  setClearedBioInfo: PropTypes.func.isRequired,
  locationDetails: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BioInfo;
