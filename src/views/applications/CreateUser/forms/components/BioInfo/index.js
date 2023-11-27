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
import { useContext, useEffect, useState } from "react";
// import MDDropzone from "components/MDDropzone";
import MDButton from "components/MDButton";
import {
  verifyPhone,
  verifyLength,
  phoneFormat,
  verifyEmail,
  removeTags,
} from "constants/methodConstants";
import { Alert, FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sub } from "date-fns";

import PropTypes from "prop-types";

import { checkEmailAvailability} from "util/AuthUtils";


import { useSnackbar } from "notistack";
import NewTableBeta from "components/TableExport/NewTableBeta";
import { propsToClassKey } from "@mui/styles";

function BioInfo({  bioInfo, staff,setBioInfo,setCurrentPage,countries, genderEnums,isAdmin,disableEdit, showButtons }) {
  
  const [mobileNumberState, setMobileNumberState] = useState("");
  const [nationalityState, setNationalityState] = useState("");
  const [salutationsState, setSalutationsState] = useState("");

  const [genderState, setGenderState] = useState("");
  
  const [phoneState, setPhoneState] = useState("");
  const [surNameState, setSurNameState] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [otherName, setOtherName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [salutationEnums, setSalutationEnums] = useState([]);
  const [nationality, setNationality] = useState(null);
  const [salutations, setSalutations] = useState("");
  
  const [gender, setGender] = useState(null);
  const [maritalStatuses, setMaritalStatuses] = useState([]);

  const [dob, setDob] = useState(null);
  const [otherNameState, setOtherNameState] = useState("");
  const [firstNameState, setFirstNameState] = useState("");
  const [userEmailState, setUserEmailState] = useState("");



  const [positions, setPositions] = useState([]);

  const [nin, setNin] = useState("");
  const [ninState, setNinState] = useState("");

  const [maritalStatus, setMaritalStatus] = useState(null);
  const [maritalStatusState, setMaritalStatusState] = useState("");
  const [disabilityStatus, setDisabilityStatus] = useState(null);
  const [disabilityStatusState, setDisabilityStatusState] = useState("");



const disabilityOptions = [
  { label: "None", value: "None" },
  { label: "Special Circumstances", value: "Special Circumstances" },
  { label: "Widow", value: "Widow" },
  { label: "Disabled", value: "Disabled" },
  { label: "Internally Displaced", value: "Internally Displaced" },
  { label: "Others", value: "Others" },
];

const maritalStatusOptions = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" }
];

const salutationOptions = [{ label: "Mr", value: "Mr" },{ label: "Mrs", value: "Mrs" },{ label: "Dr", value: "Dr" }];
  
  useEffect(() => {

    console.log(" user details ===>",bioInfo)
    if(bioInfo !== undefined && bioInfo !== null){
      loadUserData()
    }



  }, [bioInfo]);



   const loadUserData = ()=>{

    console.log("bioInfo : ", bioInfo);

    
    setOtherName(bioInfo.otherName)  
    setFirstName(bioInfo.firstName)
    setSurName(bioInfo.surname)
    setUserEmail(bioInfo.email) 
    setDob(bioInfo.dateOfBirth) 

    console.log("Do you have a disability : ", genderOptions);
  
    setGender(genderOptions.find((i)=> i.value === bioInfo.gender)??null)
    setNationality(nationalities.find((i)=> i.value === bioInfo.nationality)??null);



    setDisabilityStatus(disabilityOptions.find((i)=> i.value === bioInfo.disabilityStatus)??null);
    setSalutations(salutationOptions.find((i)=> i.value === bioInfo.titles)??null)
    setMaritalStatus(maritalStatusOptions.find((i)=> i.value === bioInfo.maritalStatus)??null)
    

    setNin(bioInfo.nin)
    setMobileNumber(bioInfo.mobileNumber)

    setMobileNumberState("success");
    setNationalityState("success");
    setSalutationsState("success");
    setGenderState("success");    
    setPhoneState("success");
    setSurNameState("success");
    setOtherNameState("success");
    setFirstNameState("success");
    setUserEmailState("success");
    setMaritalStatusState("success");
    setDisabilityStatusState("success");
    setNinState("success");
   

   }

  const getSearchSalutation = (_, newValue) => {
    setSalutations(newValue);
    setSalutationsState("success");
  };

  const getSearchMaritalStatus = (_, newValue) => {
    setMaritalStatus(newValue);
    setMaritalStatusState("success");
  };

  const getSearchDisabilityStatus = (_, newValue) => {
    setDisabilityStatus(newValue);
    setDisabilityStatusState("success");
  };

  const getSearchGender = (_, newValue) => {
    setGender(newValue);
    setGenderState("success");
  };

  const getSearchNationality = (_, newValue) => {
    setNationality(newValue);
    setNationalityState("success");
 
    
  };





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

        console.log("check => ", handleCheckEmail(inputValue));

        someFunction(inputValue)
        break;
    
        case "nin":
        setNin(inputValue);
        if (verifyLength(inputValue, 3)) {
          setNinState("success");
        } else {
          setNinState("error");
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
  

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      nationalityState === "success" &&
      salutationsState === "success" &&
      genderState === "success" &&
      firstNameState === "success" &&
      surNameState === "success" &&
      userEmailState === "success" &&
      mobileNumberState === "success" &&
      dob !== null &&
      maritalStatusState === "success" &&
      ninState === "success"

    ) {
      return true;
    }

    if (firstNameState !== "success") {
      setFirstNameState("error");
      openSnackbar("Your first name is invalid", "error");
    }  if (surNameState !== "success") {
      setSurNameState("error");
      openSnackbar("Your surname is invalid", "error");
    }  if (userEmailState !== "success") {
      setUserEmailState("error");
      openSnackbar("Your email is invalid", "error");
    }  if (mobileNumberState !== "success") {
      setMobileNumberState("error");
      openSnackbar("Your phone number is invalid", "error");
    }  if (dob === null) {
      openSnackbar("Your date of birth is required", "error");
    } 
      if (nationalityState !== "success") {
      setNationalityState("error");
      openSnackbar("Your nationality is invalid", "error");
    } 
     if (salutationsState !== "success") {
      setSalutationsState("error");
      openSnackbar("Your salutation is invalid", "error");
    } 
     if (genderState !== "success") {
      setGenderState("error");
      openSnackbar("Your gender is invalid", "error");
    }
    else if (maritalStatusState !== "success") {
      setMaritalStatusState("error");
      openSnackbar("Your marital status is invalid", "error");
    }
    
     if (ninState !== "success") {
      setNinState("error");
      openSnackbar("Your NIN/Passport Number is invalid", "error");
    }
    return false;
  }



  const handleSave = () => {

    const UserData = {
      titles: salutations?.value ?? null,
      surname: surName,
      firstName: firstName,
      otherName: otherName,
      gender: gender?.value ?? null,
      nationality: nationality?.value ?? null,
      dateOfBirth: dob ?? null,
      email:userEmail,
      mobileNumber: mobileNumber,
      maritalStatus: maritalStatus?.value ?? null,
      disabilityStatus: disabilityStatus?.value ?? null,
      nin: nin,
      
    };
    // console.log("UserData : ", UserData);
    if (isValidated()) {
      setBioInfo(UserData)
      setCurrentPage(!staff?2:5)
    }
  };

  const handleNext = () => {
    setCurrentPage(!staff?2:5)
  }



  const genderOptions = [];
  genderEnums?.map((option) => {
      genderOptions.push({ label: option.name, value: option.value });
    return 0;
  });




  
  const formatEnum = (enumValue) =>{
    if(enumValue !== null && enumValue !== undefined && enumValue !== ""){
      var frags = enumValue.toLowerCase().split('_');
      var i;
      for (i=0; i<frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(' ');
    }
    else{
      return "Unkown"
    }
  }




  const maxDate = sub(new Date(), { years: 0 });
  const minDate = sub(new Date(), { years: 60 });

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
      <MDBox p={3}>
        <MDTypography variant="h5">Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>


          <Grid item xs={12} sm={4}>
            <Autocomplete
              // multiple
              disabled={disableEdit}
              value={salutations}
              options={salutationOptions}
              onChange={getSearchSalutation}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label=" Salutation"
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
              disabled={disableEdit}
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
              disabled={disableEdit}
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
            disabled={disableEdit}
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
            disabled={disableEdit}
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
                disabled={disableEdit}
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
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
            disabled={disableEdit}
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

          <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
              isRequired
              label="NIN/Passport Number"
              name="nin"
              value={nin}
              variant="standard"
              onChange={onChange}
              placeholder="CM000900000"
              // inputProps={{ type: "email" }}
              success={ninState === "success"}
              error={ninState === "error"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
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

          <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
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

          <Grid item xs={12} sm={4}>
            <Autocomplete
              // multiple
              disabled={disableEdit}
              value={maritalStatus}
              options={maritalStatusOptions}
              onChange={getSearchMaritalStatus}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Marital Status"
                  success={setMaritalStatusState === "success"}
                  error={setMaritalStatusState === "error"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              // multiple
              disabled={disableEdit}
              value={disabilityStatus}
              options={disabilityOptions}
              onChange={getSearchDisabilityStatus}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Disability Status"
                  success={disabilityStatusState === "success"}
                  error={disabilityStatusState === "error"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          
         
    {/*      
              
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
              </Grid> */}

        

        </Grid>
        {showButtons && (
        <Grid container direction="row-reverse" mt={2}>
          <Grid item xs={12} sm={2}>
       {isAdmin ?  <MDButton
          onClick={handleNext}
          variant="gradient"
          color="dark"
        >
          next
        </MDButton>:
        <MDButton
        onClick={handleSave}
        variant="gradient"
        color="dark"
      >
       Save &  next
      </MDButton>}


          </Grid>
        </Grid>)}
      </MDBox>
    </Card>
  );
}

// Typechecking props for the BioInfo
// BioInfo.propTypes = {
//   nextStep: PropTypes.string.isRequired,
// };

export default BioInfo;
