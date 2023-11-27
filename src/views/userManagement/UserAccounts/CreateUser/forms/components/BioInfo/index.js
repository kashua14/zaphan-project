// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "components/FormField";
import FilterList from "@mui/icons-material/FilterList";

// Data
import MDEditor from "components/MDEditor";
import { useEffect, useState } from "react";
// import MDDropzone from "components/MDDropzone";
import MDButton from "components/MDButton";
import { verifyPhone, verifyLength, phoneFormat, verifyEmail } from "constants/methodConstants";
import { Alert, FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sub } from "date-fns";

import PropTypes from "prop-types";
import { getCountries, getDistricts } from "util/SystemsConfigsUtils";
import { registerUser, getGender } from "util/UserMgtUtils";
import { getPositions } from "util/PermissionsUtil";

import { useSnackbar } from "notistack";
import NewTableBeta from "components/TableExport/NewTableBeta";
import { formatEnum } from "constants/methodConstants";
import { useCallback } from "react";
import { countriesDummyData, positionsDummyData, districtDummyData } from "data";

function BioInfo({ userDetails, staff, handleCancelUser }) {
  // const { currentUser } = useContext(PermissionsContext);
  const [editorValue, setEditorValue] = useState("<p><br><br><br><br><br></p>");
  const [mobileNumberState, setMobileNumberState] = useState("");
  const [nationalityState, setNationalityState] = useState("");
  const [salutationsState, setSalutationsState] = useState("");
  const [countryState, setCountryState] = useState("");
  const [genderState, setGenderState] = useState("");
  const [districtState, setDistrictState] = useState("");
  const [dioceseState, setDioceseState] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [surNameState, setSurNameState] = useState("");
  const [phone, setPhone] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otherName, setOtherName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [salutationEnums, setSalutationEnums] = useState([]);
  const [nationality, setNationality] = useState(null);
  const [salutations, setSalutations] = useState("");
  const [district, setDistrict] = useState(null);
  const [country, setCountry] = useState(null);
  const [gender, setGender] = useState(null);
  const [genderEnums, setGenderEnums] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [religiousStatuses, setReligiousStatuses] = useState([]);
  const [dob, setDob] = useState(null);
  const [otherNameState, setOtherNameState] = useState("");
  const [firstNameState, setFirstNameState] = useState("");
  const [userEmailState, setUserEmailState] = useState("");

  const [districts, setDistricts] = useState([]);
  const [countries, setCountries] = useState("");

  const [positions, setPositions] = useState([]);
  const [isStaff, setIsStaff] = useState(false);
  const [position, setPosition] = useState("");
  const [positionState, setPositionState] = useState("");

  const [permissions, setPermissions] = useState([]);
  const [tableSelections, setTableSelections] = useState([]);

  const [tableSelectionsState, setTableSelectionsState] = useState("warning");

  const [myKey, setMyKey] = useState(Math.random());
  const [id, setId] = useState(null);

  const defaultHiddenColumnNames = [];

  const columns = [
    { name: "module", title: "Module" },
    { name: "systemProcess", title: "Process" },
    { name: "actionPermission", title: "Right" },
    // { name: 'actions', title: 'Actions' },
  ];

  const grouping = [{ columnName: "module" }];

  const countryList = [];
  const nationalities = [];

  countries?.countries?.map((option) => {
    countryList.push({ label: option.name, value: option.id });
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

  const genderOptions = [];
  genderEnums?.map((option) => {
    genderOptions.push({ label: option.name, value: option.value });
    return 0;
  });
  const positionList = [];
  positions?.map((option) => {
    positionList.push({ label: option.title, value: option.id, perms: option.permissions });
    return 0;
  });
  const districtsList = [];
  districts?.map((option) => {
    districtsList.push({ label: option.name, value: option.id });
    return 0;
  });
  const loadUserData = useCallback(() => {
    console.log("userDetails : ", userDetails);

    // setMobileNumber(userDetails.)
    setOtherName(userDetails.otherName);
    setFirstName(userDetails.firstName);
    setSurName(userDetails.surname);
    setUserEmail(userDetails.email);
    setId(userDetails.id);
    // setCountry(userDetails.country)
    // setDistrict(userDetails.district)
    // setNationality(userDetails.getCou)

    // setSalutations(userDetails.title)
    setGender(genderOptions.find((i) => i.value === userDetails.gender) ?? null);
    setPosition(positionList.find((i) => i.value === userDetails.positionId) ?? null);
    setCountry(countryList.find((i) => i.value === userDetails.country) ?? null);
    setDistrict(districtsList.find((i) => i.value === userDetails.district) ?? null);
    setPhone(userDetails.phoneNumber);
    setDob(userDetails.dateOfBirth);

    setMobileNumberState("success");
    setNationalityState("success");
    setSalutationsState("success");
    setCountryState("success");
    setGenderState("success");
    setDistrictState("success");
    setDioceseState("success");
    setPhoneState("success");
    setSurNameState("success");
    setOtherNameState("success");
    setFirstNameState("success");
    setUserEmailState("success");
    setMyKey(Math.random());
  }, [userDetails, genderOptions, positionList, countryList, districtsList]);

  useEffect(() => {
    loadCountries();
    loadDistricts();
    loadGenderEnums();

    if (userDetails !== undefined && userDetails !== "") {
      console.log(" user details ===>", userDetails);
      loadUserData();
    }

    if (staff !== undefined && staff) {
      setIsStaff(staff);
      loadPermissions();
    }
  }, [userDetails, staff, loadUserData]);

  const loadPermissions = () => {
    const MyData = {};
    getPositions(MyData)
      .then((response) => {
        console.log("Positions = => ", response);
        setPositions(response);
      })
      .catch((error) => {
        setPositions(positionsDummyData);
        console.log("Positions => ", error.message);
      });
  };

  const loadCountries = () => {
    const MyRequest = {};

    getCountries(MyRequest)
      .then((response) => {
        // console.log("countries => ", response);
        setCountries(response);
      })
      .catch((error) => {
        setCountries(countriesDummyData);
        console.log("loadReligiousAffiliationEnums => ", error.message);
      });
  };

  const loadGenderEnums = () => {
    getGender()
      .then((response) => {
        setGenderEnums(response);
      })
      .catch((error) => {
        console.log("loadGenderEnums => ", error.message);
      });
  };

  const loadDistricts = () => {
    const MyRequest = {};
    getDistricts(MyRequest)
      .then((response) => {
        // console.log("districts => ", response);
        setDistricts(response);
      })
      .catch((error) => {
        setDistricts(districtDummyData);
        // console.log("loadReligiousAffiliationEnums => ", error.message);
      });
  };

  const salutationOptions = [
    { label: "Mr.", value: "Mr" },
    { label: "Mrs.", value: "Mrs" },
    { label: "Dr.", value: "Dr" },
  ];
  salutationEnums?.map((option) => {
    salutationOptions.push({ label: option.name, value: option.value });
    return 0;
  });

  const getSearchSalutation = (_, newValue) => {
    setSalutations(newValue);
    setSalutationsState("success");
  };

  const getSearchGender = (_, newValue) => {
    setGender(newValue);
    setGenderState("success");
  };

  const getSearchNationality = (_, newValue) => {
    setNationality(newValue);
    setNationalityState("success");
  };

  const getSearchCountry = (_, newValue) => {
    setCountry(newValue);
    setCountryState("success");
  };

  const getSearchDistrict = (_, newValue) => {
    setDistrict(newValue);
    setDistrictState("success");
  };

  const getSearchPosition = (_, newValue) => {
    console.log("Position Details  -->", newValue); //perms
    setPosition(newValue);
    setPositionState("success");
    setPermissions(newValue.perms);
    setTableSelections([]);
    setMyKey(Math.random());
    setTableSelectionsState("warning");
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

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      nationalityState === "success" &&
      salutationsState === "success" &&
      countryState === "success" &&
      genderState === "success" &&
      firstNameState === "success" &&
      surNameState === "success" &&
      userEmailState === "success" &&
      phoneState === "success" &&
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
    } else if (userEmailState !== "success") {
      setUserEmailState("error");
      openSnackbar("Your email is invalid", "error");
    } else if (phoneState !== "success") {
      setPhoneState("error");
      openSnackbar("Your phone number is invalid", "error");
    } else if (dob === null) {
      openSnackbar("Your date of birth is required", "error");
    } else if (nationalityState !== "success") {
      setNationalityState("error");
      openSnackbar("Your nationality is invalid", "error");
    } else if (salutationsState !== "success") {
      setSalutationsState("error");
      openSnackbar("Your salutation is invalid", "error");
    } else if (countryState !== "success") {
      setCountryState("error");
      openSnackbar("Your country is invalid", "error");
    } else if (genderState !== "success") {
      setGenderState("error");
      openSnackbar("Your gender is invalid", "error");
    }
    return false;
  }

  function isValidatedStaff() {
    if (
      positionState === "success" &&
      salutationsState === "success" &&
      countryState === "success" &&
      genderState === "success" &&
      firstNameState === "success" &&
      surNameState === "success" &&
      userEmailState === "success" &&
      phoneState === "success" &&
      tableSelectionsState.length > 0
    ) {
      return true;
    }

    if (positionState !== "success") {
      setPositionState("error");
      openSnackbar("Select Staff Position", "error");
    }

    if (firstNameState !== "success") {
      setFirstNameState("error");
      openSnackbar("Your first name is invalid", "error");
    }
    if (surNameState !== "success") {
      setSurNameState("error");
      openSnackbar("Your surname is invalid", "error");
    }
    if (userEmailState !== "success") {
      setUserEmailState("error");
      openSnackbar("Your email is invalid", "error");
    }
    if (phoneState !== "success") {
      setPhoneState("error");
      openSnackbar("Your phone number is invalid", "error");
    }
    if (dob === null) {
      openSnackbar("Your date of birth is required", "error");
    }
    if (salutationsState !== "success") {
      setSalutationsState("error");
      openSnackbar("Your salutation is invalid", "error");
    }
    if (countryState !== "success") {
      setCountryState("error");
      openSnackbar("Your country is invalid", "error");
    }
    if (genderState !== "success") {
      setGenderState("error");
      openSnackbar("Your gender is invalid", "error");
    }
    if (tableSelectionsState !== "success") {
      setTableSelectionsState("error");
      openSnackbar("Assign The User At least One Permission ", "error");
    }

    return false;
  }

  const handleSaveStaff = () => {
    let selectedPermissions = [];

    tableSelections.map((prop) => {
      selectedPermissions.push(permissions[prop].id);
    });

    const UserData = {
      id: id,
      permissions: selectedPermissions,
      positionId: position?.value ?? null,
      country: country?.value ?? null,
      district: district?.value ?? null,
      titles: salutations,
      surname: surName,
      firstName: firstName,
      otherName: otherName,
      username: userEmail,
      gender: gender?.value ?? null,
      nationality: nationality?.value ?? null,
      dob: dob ?? null,
      password: "P@ssw0rd",
      alternativeEmail: userEmail ?? null,
      email: userEmail,
      userType: "STAFF",
      phoneNumber: phone,
    };
    console.log("UserData : ", UserData);
    if (isValidatedStaff()) {
      registerUser(UserData)
        .then((response) => {
          // console.log("Response : ", response);

          if (response.success) {
            openSnackbar(response.message, "success");
            if (handleCancelUser !== undefined) {
              handleCancelUser();
            }
            // setClearedBioInfo(true);
          } else {
            openSnackbar(response.message, "error");
          }
        })
        .catch((error) => {
          console.log("saveApplicantBioData-err : ", error);
          openSnackbar(error.message, "error");
          console.log("saveApplicantBioData-err : ", error);
        });
    }
  };

  const handleSave = () => {
    const UserData = {
      id: id,
      country: country?.value ?? null,
      district: district?.value ?? null,
      titles: salutations,
      surname: surName,
      firstName: firstName,
      otherName: otherName,
      username: userEmail,
      gender: gender?.value ?? null,
      nationality: nationality?.value ?? null,
      dateOfBirth: dob ?? null,
      password: "Alpha@23",
      alternativeEmail: userEmail ?? null,
      email: userEmail,
      userType: "PATIENT",
      contacts: [
        {
          contactType: "1",
          contact: phone,
        },
        {
          contactType: "1",
          contact: mobileNumber,
        },
      ],
    };
    // console.log("UserData : ", UserData);
    if (isValidated()) {
      registerUser(UserData)
        .then((response) => {
          // console.log("Response : ", response);
          openSnackbar(response.message, "success");
          if (response.success) {
            // setClearedBioInfo(true);
          }
        })
        .catch((error) => {
          console.log("saveApplicantBioData-err : ", error);
        });
    }
  };
  const religiousAffiliationOptions = [];
  religiousStatuses?.map((option) => {
    religiousAffiliationOptions.push({ label: option.name, value: option.value });
    return 0;
  });

  const maritalStatusOptions = [];
  maritalStatuses?.map((option) => {
    maritalStatusOptions.push({ label: option.name, value: option.value });
    return 0;
  });

  const passSelection = (selection) => {
    setTableSelections(selection);

    setTableSelectionsState(selection.length > 0 ? "success" : "error");
  };

  const data = permissions.map((prop, key) => {
    return {
      module: formatEnum(prop.permissionsDetails.module),
      systemProcess: formatEnum(prop.permissionsDetails.systemProcess),
      actionPermission: formatEnum(prop.permissionsDetails.actionPermission),

      actions: (
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton
              color="info"
              variant="text"
              // onClick={() => handleDelete(data.id)}
            >
              Edit
            </MDButton>
          </Grid>
        </Grid>
      ),
    };
  });

  const maxDate = sub(new Date(), { years: 0 });
  const minDate = sub(new Date(), { years: 60 });
  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
      <MDBox p={3}>
        <MDTypography variant="h5">Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          {isStaff ? (
            <Grid item xs={12} sm={4}>
              <Autocomplete
                key={myKey}
                value={position}
                options={positionList}
                onChange={getSearchPosition}
                renderInput={(params) => (
                  <FormField
                    {...params}
                    label="Position "
                    //  InputLabelProps={{ shrink: true }}?
                    success={positionState === "success"}
                    error={positionState === "error"}
                  />
                )}
              />
            </Grid>
          ) : null}

          <Grid item xs={12} sm={4}>
            <Autocomplete
              // multiple
              value={salutations}
              options={salutationOptions}
              onChange={getSearchSalutation}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Salutation"
                  success={salutationsState === "success"}
                  error={salutationsState === "error"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
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
              onChange={getSearchGender}
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
                  minDate={minDate}
                  onChange={(newValue) => {
                    // console.log("dob: ", new Date(newValue));
                    setDob(new Date(newValue));
                  }}
                  renderInput={(params) => <TextField {...params}  variant="standard"/>}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          {!isStaff ? (
            <Grid item xs={12} sm={4}>
              <Autocomplete
                value={nationality}
                options={nationalities}
                onChange={getSearchNationality}
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
          ) : null}

          <Grid item xs={12} sm={4}>
            <Autocomplete
              value={country}
              options={countryList}
              onChange={getSearchCountry}
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              value={district}
              options={districtsList}
              onChange={getSearchDistrict}
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
              isRequired
              label="Email"
              name="userEmail"
              value={userEmail}
              variant="standard"
              onChange={onChange}
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
          {!isStaff ? (
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
          ) : null}
          {!isStaff ? (
            <Grid item xs={12} sm={6}>
              <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                  Any Other Information?&nbsp;&nbsp;
                  <MDTypography variant="caption" color="text">
                    (optional)
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDEditor value={editorValue} onChange={setEditorValue} />
            </Grid>
          ) : null}

          {isStaff && data.length > 0 ? (
            <Grid item xs={12} sm={12}>
              <Alert icon={<FilterList fontSize="inherit" />} severity={tableSelectionsState}>
                {"Select User Permissions"}
              </Alert>
              <NewTableBeta
                key={myKey}
                rows={data}
                exportRow={data}
                columns={columns}
                exportColumns={columns}
                fileName={"Staff Positions"}
                passSelection={passSelection}
                grouping={grouping}
                defaultHiddenColumnNames={defaultHiddenColumnNames}
              />
            </Grid>
          ) : null}
        </Grid>
        <Grid container direction="row-reverse" mt={2}>
          <Grid item xs={12} sm={1}>
            <MDButton
              variant="gradient"
              color="success"
              size="small"
              fullWidth
              onClick={isStaff ? handleSaveStaff : handleSave}
            >
              Save
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the BioInfo
BioInfo.propTypes = {
  nextStep: PropTypes.string.isRequired,
};

export default BioInfo;
