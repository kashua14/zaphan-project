import { Autocomplete, Card, FormControl, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormField from "components/FormField";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import {
  phoneFormat,
  verifyLength,
  verifyPhone,
  isNotNullOrEmpty,
} from "constants/methodConstants";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getCountries, getDistricts } from "util/SystemsConfigsUtils";
import PropTypes from "prop-types";
import { useConfirm } from "material-ui-confirm";
import { updateUserProfileDetails } from "../utils/APIUtils";
import { getGender } from "util/AuthUtils";
import { getCurrentUser } from "util/AuthUtils";

function UserProfile({ currentUser: { currentUser }, dispatch, setIsLoading }) {
  console.log("currentUser => ", currentUser);

  const [nationalityState, setNationalityState] = useState(
    isNotNullOrEmpty(currentUser?.nationalityId) ? "success" : ""
  );
  // const [countryState, setCountryState] = useState(
  //   isNotNullOrEmpty(currentUser?.countryId) ? "success" : ""
  // );
  const [genderState, setGenderState] = useState(
    isNotNullOrEmpty(currentUser?.gender) ? "success" : ""
  );
  const [districtState, setDistrictState] = useState(
    isNotNullOrEmpty(currentUser?.districtId) ? "success" : ""
  );
  const [phoneState, setPhoneState] = useState(
    isNotNullOrEmpty(currentUser?.phone) ? "success" : ""
  );
  const [surNameState, setSurNameState] = useState(
    isNotNullOrEmpty(currentUser?.surname) ? "success" : ""
  );
  const [phone, setPhone] = useState(
    isNotNullOrEmpty(currentUser?.phone) ? currentUser?.phone : ""
  );
  const [otherName, setOtherName] = useState(
    isNotNullOrEmpty(currentUser?.otherName) ? currentUser?.otherName : ""
  );
  const [firstName, setFirstName] = useState(
    isNotNullOrEmpty(currentUser?.firstName) ? currentUser?.firstName : ""
  );
  const [surName, setSurName] = useState(
    isNotNullOrEmpty(currentUser?.surname) ? currentUser?.surname : ""
  );
  // const [userEmail, setUserEmail] = useState(
  //   isNotNullOrEmpty(currentUser?.username) ? currentUser?.username : ""
  // );
  const [district, setDistrict] = useState(null);
  // const [country, setCountry] = useState(null);
  const [gender, setGender] = useState(
    isNotNullOrEmpty(currentUser?.gender)
      ? { label: currentUser?.gender, value: currentUser?.gender }
      : null
  );
  const [dob, setDob] = useState(
    isNotNullOrEmpty(currentUser?.dob) ? new Date(currentUser?.dob) : null
  );
  const [districts, setDistricts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genderEnums, setGenderEnums] = useState([]);
  const [nationality, setNationality] = useState(
    countries?.find((c) => c.id === currentUser?.countryId) ?? null
  );
  const [otherNameState, setOtherNameState] = useState(
    isNotNullOrEmpty(currentUser?.otherName) ? "success" : ""
  );
  const [firstNameState, setFirstNameState] = useState(
    isNotNullOrEmpty(currentUser?.firstName) ? "success" : ""
  );
  const [nin, setNin] = useState(isNotNullOrEmpty(currentUser?.nin) ? currentUser?.nin : "");
  const [ninState, setNinState] = useState(isNotNullOrEmpty(currentUser?.nin) ? "success" : "");
  // const [userEmailState, setUserEmailState] = useState(
  //   isNotNullOrEmpty(currentUser?.username) ? "success" : ""
  // );
  const confirm = useConfirm();

  const loadCountries = () => {
    const MyRequest = {};
    setIsLoading(true);

    getCountries(MyRequest)
      .then((response) => {
        // console.log("countries => ", response);
        const myCountry = response.countries?.find((c) => c.id === currentUser?.countryId) ?? null;
        setCountries(response.countries);
        if (myCountry !== null) {
          setNationality({ label: myCountry.natinality, value: myCountry.id });
          setNationalityState("success");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("loadReligiousAffiliationEnums => ", error.message);
      });
  };

  const loadGenderEnums = () => {
    setIsLoading(true);
    getGender()
      .then((response) => {
        setGenderEnums(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("loadGenderEnums => ", error.message);
      });
  };

  const loadDistricts = () => {
    const MyRequest = {};
    setIsLoading(true);
    getDistricts(MyRequest)
      .then((response) => {
        const myDistrict = response?.find((d) => d.id === currentUser?.districtId) ?? null;
        setDistricts(response);
        if (myDistrict !== null) {
          setDistrict({ label: myDistrict.name, value: myDistrict.id });
          setDistrictState("success");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("loadReligiousAffiliationEnums => ", error.message);
      });
  };

  function loadCurrentUser() {
    getCurrentUser()
      .then((response) => {
        dispatch({ currentUser: response });
      })
      .catch((_) => {
        console.error(_.message);
      });
  }

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  useEffect(() => {
    if (
      currentUser === null ||
      districts.length === 0 ||
      countries.length === 0 ||
      genderEnums.length === 0
    ) {
      loadCountries();
      loadDistricts();
      loadGenderEnums();
    }
  }, [currentUser]);

  function isValidated() {
    if (
      nationalityState === "success" &&
      genderState === "success" &&
      firstNameState === "success" &&
      surNameState === "success" &&
      phoneState === "success" &&
      ninState === "success" &&
      dob !== null
    ) {
      return true;
    }

    if (firstNameState !== "success") {
      setFirstNameState("error");
      openSnackbar("Your first name is invalid", "error");
    } else if (surNameState !== "success") {
      setSurNameState("error");
      openSnackbar("Your surname is invalid", "error");
    } else if (phoneState !== "success") {
      setPhoneState("error");
      openSnackbar("Your phone number is invalid", "error");
    } else if (dob === null) {
      openSnackbar("Your date of birth is required", "error");
    } else if (nationalityState !== "success") {
      setNationalityState("error");
      openSnackbar("Your nationality is invalid", "error");
    }
    // else if (countryState !== "success") {
    //   setCountryState("error");
    //   openSnackbar("Your country is invalid", "error");
    // }
    else if (genderState !== "success") {
      setGenderState("error");
      openSnackbar("Your gender is invalid", "error");
    } else if (ninState !== "success") {
      setNinState("error");
      openSnackbar("Your National Identity Number is invalid", "error");
    }
    return false;
  }

  const handleSave = () => {
    if (isValidated()) {
      setIsLoading(true);
      const MyRequest = {
        firstName,
        surname: surName,
        otherName,
        phoneNumber: phone,
        gender: gender?.value ?? null,
        dob,
        ninNumber: nin,
        countryId: nationality?.value ?? null,
        districtId: district?.value ?? null,
      };
      console.log("MyRequest => ", MyRequest);
      confirm({
        title: `Update User Profile`,
        description: "You are about to your user details. Do you want to continue?",
        confirmationText: "Continue",
        confirmationButtonProps: { variant: "text", color: "primary" },
      })
        .then(() => {
          updateUserProfileDetails(MyRequest)
            .then((response) => {
              openSnackbar(response.message, response.success ? "success" : "error");
              if (response.success) {
                loadCurrentUser();
              }
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log("updateUserProfileDetails-err : ", error.message);
            });
        })
        .catch(() => {
          console.log("update cancelled.");
        });
    }
  };

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
      // case "userEmail":
      //   setUserEmail(inputValue);
      //   if (verifyEmail(inputValue)) {
      //     setUserEmailState("success");
      //   } else {
      //     setUserEmailState("error");
      //   }
      //   break;
      case "phone":
        setPhone(phoneFormat(inputValue));
        if (verifyPhone(phoneValue)) {
          setPhoneState("success");
        } else {
          setPhoneState("error");
        }
        break;

      case "nin":
        setNin(inputValue);
        if (verifyLength(inputValue, 14)) {
          setNinState("success");
        } else {
          setNinState("error");
        }
        break;

      default:
        break;
    }
  };

  const onChangeSearchSelect = (stateName, value) => {
    switch (stateName) {
      case "gender":
        setGender(value);
        if (value !== null) {
          setGenderState("success");
        } else {
          setGenderState("error");
        }
        break;

      // case "country":
      //   setCountry(value);
      //   if (value !== null) {
      //     setCountryState("success");
      //   } else {
      //     setCountryState("error");
      //   }
      //   break;

      case "district":
        setDistrict(value);
        if (value !== null) {
          setDistrictState("success");
        } else {
          setDistrictState("error");
        }
        break;

      case "nationality":
        setNationality(value);
        if (value !== null) {
          setNationalityState("success");
        } else {
          setNationalityState("error");
        }
        break;

      default:
        break;
    }
  };

  const districtsList = [];
  districts?.map((option) => {
    districtsList.push({ label: option.name, value: option.id });
    return 0;
  });

  const genderOptions = [];
  genderEnums?.map((option) => {
    genderOptions.push({ label: option.name, value: option.value });
    return 0;
  });

  // const countryList = [];
  const nationalities = [];
  countries?.map((option) => {
    // countryList.push({ label: option.name, value: option.id });

    if (
      option.natinality !== null &&
      !nationalities.some(
        (e) => e.label !== null && e.label.toLowerCase() === option.natinality?.toLowerCase()
      )
    ) {
      nationalities.push({ label: option.natinality, value: option.id });
    }
    return 0;
  });

  return (
    <Card id="user-profile" mt={4}>
      <MDBox p={3}>
        <MDTypography variant="h5">User Profile Info</MDTypography>
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
              value={gender}
              options={genderOptions}
              onChange={(_, newValue) => onChangeSearchSelect("gender", newValue)}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="I'm"
                  // InputLabelProps={{ shrink: true }}
                  success={genderState === "success"}
                  error={genderState === "error"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              value={nationality}
              options={nationalities}
              onChange={(_, newValue) => onChangeSearchSelect("nationality", newValue)}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Nationality"
                  // InputLabelProps={{ shrink: true }}
                  success={nationalityState === "success"}
                  error={nationalityState === "error"}
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={12} sm={4}>
            <Autocomplete
              value={country}
              options={countryList}
              onChange={(_, newValue) => onChangeSearchSelect("country", newValue)}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Country"
                  // InputLabelProps={{ shrink: true }}
                  success={countryState === "success"}
                  error={countryState === "error"}
                />
              )}
            />
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <Autocomplete
              value={district}
              options={districtsList}
              onChange={(_, newValue) => onChangeSearchSelect("district", newValue)}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="District "
                  // InputLabelProps={{ shrink: true }}
                  success={districtState === "success"}
                  error={districtState === "error"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              label="National Identity Number"
              name="nin"
              value={nin}
              onChange={onChange}
              // placeholder="Kasasira"
              success={ninState === "success"}
              error={ninState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              disabled
              fullWidth
              isRequired
              label="Email"
              name="userEmail"
              defaultValue={isNotNullOrEmpty(currentUser?.username) ? currentUser?.username : ""}
              variant="standard"
              // onChange={onChange}
              // placeholder="example@email.com"
              // inputProps={{ type: "email" }}
              // success={userEmailState === "success"}
              // error={userEmailState === "error"}
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
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  views={["year", "month", "day"]}
                  inputFormat="DD MMM, YYYY"
                  label="Date of Birth"
                  openTo="year"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(new Date(newValue));
                  }}
                  renderInput={(params) => <TextField {...params} variant="standard" />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container direction="row-reverse" mt={2}>
          <Grid item xs={12} sm={3}>
            <MDButton color="info" fullWidth onClick={handleSave}>
              Update Profile
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

UserProfile.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  setIsLoading: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default UserProfile;
