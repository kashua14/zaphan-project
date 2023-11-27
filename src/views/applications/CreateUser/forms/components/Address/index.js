// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "components/FormField";

// Data
import { useEffect, useState } from "react";
// import MDDropzone from "components/MDDropzone";
import MDButton from "components/MDButton";
import {
  verifyPhone,
  verifyLength,
  phoneFormat,
} from "constants/methodConstants";
import { Alert } from "@mui/material";
import { sub } from "date-fns";

import PropTypes from "prop-types";
// import {
//   getGenderEnum,
//   getSalutationEnum,
//   getMaritalStatusEnum,
//   getReligiousAffiliationEnum,
// } from "util/UserUtils";
// import { saveApplicantBioData } from "util/AlphaUtils";


import { useSnackbar } from "notistack";
import { LooksOne,LooksTwo } from "@mui/icons-material";
import Looks3Icon from '@mui/icons-material/Looks3';


function BioInfo({addressInfo,  setAddressInfo, setCurrentPage,countries,districts,isAdmin, disableEdit, showButtons }) {
  
  
  
  const [district, setDistrict] = useState(null);
  const [country, setCountry] = useState(null);
  
  const [districtState, setDistrictState] = useState(null);
  const [countryState, setCountryState] = useState(null);

  const [subCounty, setSubCounty] = useState(null);
  const [municipality, setMunicipality] = useState(null);
  const [subCountyState, setSubCountyState] = useState(null);
  const [municipalityState, setMunicipalityState] = useState(null);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [currentDistrictState, setCurrentDistrictState] = useState(null);
  const [currentCounty, setCurrentCounty] = useState(null);
  const [currentCountyState, setCurrentCountyState] = useState(null);
  const [currentSubCounty, setCurrentSubCounty] = useState(null);
  const [currentSubCountyState, setCurrentSubCountyState] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [firstNameState, setFirstNameState] = useState(null);
  const [surname, setSurname] = useState(null);
  const [surnameState, setSurnameState] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [mobileNumberState, setMobileNumberState] = useState(null);

  const [motherName, setMotherName] = useState(null);
  const [motherNameState, setMotherNameState] = useState(null);
  const [fatherName, setFatherName] = useState(null);
  const [fatherNameState, setFatherNameState] = useState(null);


  const [showDistrictsOrDioceses, setShowDistrictsOrDioceses] = useState(false);


  

  useEffect(() => {
    if(addressInfo !== undefined && addressInfo !== null){
      console.log(" user details ===>",addressInfo)
      loadData()
    }

  }, []);


  
const loadData = () => {

  setFatherName(addressInfo.fatherName);
  setMotherName(addressInfo.motherName);
  setFirstName(addressInfo.firstName);
  setSurname(addressInfo.surname);
  setMobileNumber(addressInfo.mobileNumber);
  setSubCounty(addressInfo.subCounty);
  setMunicipality(addressInfo.municipality);
  
  setCurrentCounty(addressInfo.currentCounty);
  setCurrentSubCounty(addressInfo.currentSubCounty);

  setCurrentDistrict(districtsList.find((i)=> i.value === addressInfo.currentDistrict)??null);
  setCountry(countriesList.find((i)=> i.value === addressInfo.country)??null);
  setDistrict(districtsList.find((i)=> i.value === addressInfo.district)??null);

  
  setDistrictState("success");
  setCountryState("success");
  setSubCountyState("success");
  setMunicipalityState("success");
  setCurrentDistrictState("success");
  setCurrentCountyState("success");
  setCurrentSubCountyState("success");
  setFatherNameState("success");
  setMotherNameState("success");
  setFirstNameState("success");
  setSurnameState("success");
  setMobileNumberState("success");



}
  

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

  const getSearchDistrictCurrent = (_, newValue) => {
    setCurrentDistrict(newValue);
    setCurrentDistrictState("success");
  };


  const countriesList = [];
  const nationalities = [];

    countries.countries?.map(({ name, id, natinality }) => {
    countriesList.push({ label: name, value: id });
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

  const districtsList = [];
    districts?.map(({ name, id }) => {
    districtsList.push({ label: name, value: id });
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
      case "surname":
        setSurname(inputValue);
        if (verifyLength(inputValue, 3)) {
          setSurnameState("success");
        } else {
          setSurnameState("error");
        }
        break;
      case "subCounty":
        setSubCounty(inputValue);
        if (verifyLength(inputValue, 3)) {
          setSubCountyState("success");
        } else {
          setSubCountyState("error");
        }
        break;
      case "municipality":
        setMunicipality(inputValue);
        if (verifyLength(inputValue, 3)) {
          setMunicipalityState("success");
        } else {
          setMunicipalityState("error");
        }
        break;
      case "currentCounty":
        setCurrentCounty(inputValue);
        if (verifyLength(inputValue, 3)) {
          setCurrentCountyState("success");
        } else {
          setCurrentCountyState("error");
        }
        break;
      case "currentSubCounty":
        setCurrentSubCounty(inputValue);
        if (verifyLength(inputValue, 3)) {
          setCurrentSubCountyState("success");
        } else {
          setCurrentSubCountyState("error");
        }
        break;

        case "motherName":
        setMotherName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setMotherNameState("success");
        } else {
          setMotherNameState("error");
        }
        break;
        case "fatherName":
        setFatherName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setFatherNameState("success");
        } else {
          setFatherNameState("error");
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
      firstNameState === "success" &&
      surnameState === "success" &&
      mobileNumberState === "success" &&
      subCountyState === "success" &&
      municipalityState === "success" &&
      currentDistrictState === "success" &&
      currentCountyState === "success" &&
      currentSubCountyState === "success" &&
      countryState === "success" &&
      districtState === "success"

      
    ) {
      return true;
    }

    if (firstNameState !== "success") {
      setFirstNameState("error");
      openSnackbar("Your first name is invalid", "error");
    } 
    if (surnameState !== "success") {
      setSurnameState("error");
      openSnackbar("Your surname is invalid", "error");
    }
    if (mobileNumberState !== "success") {
      setMobileNumberState("error");
      openSnackbar("Your mobile number is invalid", "error");
    }
    if (subCountyState !== "success") {
      setSubCountyState("error");
      openSnackbar("Your sub county is invalid", "error");
    }
    if (municipalityState !== "success") {
      setMunicipalityState("error");
      openSnackbar("Your municipality is invalid", "error");
    }
    if (currentDistrictState !== "success") {
      setCurrentDistrictState("error");
      openSnackbar("Your current district is invalid", "error");
    }
    if (currentCountyState !== "success") {
      setCurrentCountyState("error");
      openSnackbar("Your current county is invalid", "error");
    }
    if (currentSubCountyState !== "success") {
      setCurrentSubCountyState("error");
      openSnackbar("Your current sub county is invalid", "error");
    }
    if (countryState !== "success") {
      setCountryState("error");
      openSnackbar("Your country is invalid", "error");
    }
    if (districtState !== "success") {
      setDistrictState("error");
      openSnackbar("Your district is invalid", "error");
    }


    return false;
  }

  const handleSave = () => {
    
    
    const ApplicantBioData = {
      firstName: firstName,
      surname: surname,
      mobileNumber: mobileNumber,
      subCounty: subCounty,
      municipality: municipality,
      currentDistrict: currentDistrict?.value ?? null,
      currentCounty: currentCounty,
      currentSubCounty: currentSubCounty,
      country: country?.value ?? null,
      district: district?.value ?? null,
      motherName : motherName,
      fatherName : fatherName
      
    };
    // console.log("ApplicantBioData : ", ApplicantBioData);
    if (isValidated()) {
      setAddressInfo(ApplicantBioData);
      setCurrentPage(3)
    }
  };

  const handleNext = () => {
    setCurrentPage(3)
  }
  const handleBack = () => setCurrentPage(1);
  const maxDate = sub(new Date(), { years: 10 });

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>

      <MDBox p={3}>
      <MDTypography variant="h5">Address & Location</MDTypography>
      <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="info"
            icon={<LooksOne fontSize="inherit" />}        
          >
           Permanent Address
          </Alert>
        </Grid>      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>

        
          <Grid item xs={12} sm={4}>
            <Autocomplete
            disabled={disableEdit}
              value={country}
              options={countriesList}
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
            disabled={disableEdit}
              value={district}
              options={districtsList}
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

          <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
              isRequired
              label="Municipality"
              name="municipality"
              value={municipality}
              onChange={onChange}
              placeholder="Kalungu"
              success={municipalityState === "success"}
              error={municipalityState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
              isRequired
              label="Sub-County"
              name="subCounty"
              value={subCounty}
              onChange={onChange}
              placeholder="Matuga"
              success={subCountyState === "success"}
              error={subCountyState === "error"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
              isRequired
              label="Mother's Name"
              name="motherName"
              value={motherName}
              onChange={onChange}
              placeholder="Nakimuli Gloria"
              success={motherNameState === "success"}
              error={motherNameState === "error"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              disabled={disableEdit}
              label="Father's Name"
              name="fatherName"
              value={fatherName}
              onChange={onChange}
              placeholder="Matuga Ronald"
              success={fatherNameState === "success"}
              error={fatherNameState === "error"}
            />
          </Grid>
          
          <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="warning"
            icon={<LooksTwo fontSize="inherit" />}        
          >
            Current Address
          </Alert>
        </Grid> 

        <Grid item xs={12} sm={4}>
            <Autocomplete
            disabled={disableEdit}
              value={currentDistrict}
              options={districtsList}           
              onChange={getSearchDistrictCurrent}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="District "
                  InputLabelProps={{ shrink: true }}
                  success={currentDistrictState === "success"}
                  error={currentDistrictState === "error"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
              isRequired
              label="County"
              name="currentCounty"
              value={currentCounty}
              variant="standard"
              placeholder="County"
              onChange={onChange}
              // inputProps={{ type: "email" }}
              success={currentCountyState === "success"}
              error={currentCountyState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField  
            disabled={disableEdit}          
              isRequired
              label="Sub-County"
              name="currentSubCounty"
              value={currentSubCounty}
              variant="standard"
              placeholder="Sub County"
              onChange={onChange}
              success={currentSubCountyState === "success"}
              error={currentSubCountyState === "error"}
            />
          </Grid>

          <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="primary"
            icon={<Looks3Icon fontSize="inherit" />}        
          >
            Next of Kin
          </Alert>
        </Grid> 

        <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
              isRequired
              label="First Name"
              name="firstName"
              value={firstName}
              variant="standard"
              placeholder="Jordan"
              onChange={onChange}
              // inputProps={{ type: "email" }}
              success={firstNameState === "success"}
              error={firstNameState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
            disabled={disableEdit}
              isRequired
              label="Surname"
              name="surname"
              value={surname}
              variant="standard"
              placeholder="Mugisha"
              onChange={onChange}
              // inputProps={{ type: "email" }}
              success={surnameState === "success"}
              error={surnameState === "error"}
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

          
          
          
        </Grid>
        {showButtons && (
        <MDBox p={3} mt={2} width="100%" display="flex" justifyContent="space-between">
                      <MDButton variant="gradient" color="light" onClick={handleBack} >
                              back
                            </MDButton>
                            {isAdmin ?  <MDButton
          onClick={handleNext}
          variant="gradient"
          color="dark"
        >
          next
        </MDButton>:  <MDButton
                            onClick={handleSave}
                            variant="gradient"
                            color="dark"
                          >
                           save & next
                          </MDButton>}  </MDBox>)}

       
       
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
