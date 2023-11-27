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
  verifyMoney,

} from "constants/methodConstants";
import { Alert, FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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


function BioInfo({educationInfo,  setEducationInfo, setCurrentPage,isAdmin,disableEdit, showButtons }) {
 
  const [levelOfEducation, setLevelOfEducation] = useState(null);
  const [levelOfEducationState, setLevelOfEducationState] = useState(null);
  const [institutionName, setInstitutionName] = useState(null);
  const [institutionNameState, setInstitutionNameState] = useState(null);
  const [programName, setProgramName] = useState(null);
  const [programNameState, setProgramNameState] = useState(null);
  const [yearAccomplished, setYearAccomplished] = useState(null);
  const [yearAccomplishedState, setYearAccomplishedState] = useState(null);

  const [employmentStatus, setEmploymentStatus] = useState(null);
  const [employmentStatusState, setEmploymentStatusState] = useState(null);
  const [monthlyEarning, setMonthlyEarning] = useState(null);
  const [monthlyEarningState, setMonthlyEarningState] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [monthlyIncomeState, setMonthlyIncomeState] = useState(null);
  const [myKey, setMyKey] = useState(Math.round(Math.random()));



const levelOfEducationOptions = [
  { label: "Illiterate", value: 1 },
  { label: "Primary", value: 2 },
  { label: "O-Level", value: 3 },
  { label: "A-Level", value: 4 },
  { label: "Diploma", value: 5 },
  { label: "Bachelor's ", value: 6 },
  { label: "Masters", value: 7 },
];

const employmentStatusOptions = [
  { label: "Self Employed", value: "Self Employed" },
  { label: "Wage Earner", value: "Wage Earner" },
  { label: "Agriculture", value: "Agriculture" },
  { label: "Unemployed", value: "Unemployed" },
];

function formatMoney(n) {
  if (n !== null && n !== undefined) {
    return n
      .toString()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
}

function removeCommas(inputString) {
  if (typeof inputString === 'string') {
    return inputString.replace(/,/g, '');
  }
  return inputString;
}

  useEffect(() => {
    if(educationInfo !== undefined && educationInfo !== null){
      console.log(" user details ===>",educationInfo)
      setMonthlyEarning(formatMoney(educationInfo?.monthlyEarning) ?? null);
      loadData()
    }

  }, [educationInfo,myKey,monthlyEarning,monthlyEarningState,
    monthlyIncome]);


  
const loadData = () => {

  // alert(formatMoney(educationInfo?.monthlyEarning))


  setInstitutionName(educationInfo?.institutionName ?? null);
  setProgramName(educationInfo?.programName ?? null);
  setYearAccomplished(educationInfo?.yearAccomplished ?? null);

  setMonthlyIncome(formatMoney(educationInfo?.monthlyIncome) ?? null);


  setLevelOfEducationState("success");
  setInstitutionNameState("success");
  setProgramNameState("success");
  setYearAccomplishedState("success");

  setEmploymentStatusState("success");
  setMonthlyEarningState("success");
  setMonthlyIncomeState("success");



  setMyKey(Math.random())

}

// getSearchLevelOfEducation
// getSearchEmploymentStatus
// getSearchTraining
// getSearchTrainingReason

const getSearchLevelOfEducation = (_, newValue) => {
  setLevelOfEducation(newValue);
  setLevelOfEducationState("success");
};

const getSearchEmploymentStatus = (_, newValue) => {
  setEmploymentStatus(newValue);
  setEmploymentStatusState("success");
};


  




  const onChange = (e) => {
    const inputValue = e.target.value;

    
    switch (e.target.name) {
      case "institutionName":
        setInstitutionName(inputValue);
        if (verifyLength(inputValue, 3)) {         
          setInstitutionNameState("success");
        } else {
          setInstitutionNameState("error");
        }
        break;
      case "programName":
        setProgramName(inputValue);
        if (verifyLength(inputValue, 3)) {          
          setProgramNameState("success");
        } else {
          setProgramNameState("error");
        }
        break;
      case "monthlyEarning":
        setMonthlyEarning(formatMoney(inputValue));
        if (validateInput(inputValue)) {         
          setMonthlyEarningState("success");
        } else {
          setMonthlyEarningState("error");
        }
        break;
      case "monthlyIncome":
        setMonthlyIncome(formatMoney(inputValue));
        if (validateInput(inputValue)) {
          setMonthlyIncomeState("success");
        } else {
          setMonthlyIncomeState("error");
        }
        break;       

      default:
        break;
    }
  };





  const validateInput = (value) => {
    return !isNaN(parseFloat(value.replace(/,/g, '')));
  };

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      monthlyEarningState === "success" &&
      monthlyIncomeState === "success" &&      
      levelOfEducationState === "success" 
      
    ) {
      return true;
    }

    // if (institutionNameState !== "success") {
    //   setInstitutionNameState("error");
    //   openSnackbar("You need to enter a valid institution name", "error");
    // }
    // if (programNameState !== "success") {
    //   setProgramNameState("error");
    //   openSnackbar("You need to enter a valid program name", "error");
    // }
    if (monthlyEarningState !== "success") {
      setMonthlyEarningState("error");
      openSnackbar("You need to enter a valid monthly earning", "error");
    }
    if (monthlyIncomeState !== "success") {
      setMonthlyIncomeState("error");
      openSnackbar("You need to enter a valid monthly income", "error");
    }
   
          

    return false;
  }

  const handleSave = () => {
    
    const ApplicantBioData = {
     institutionName: institutionName,
      levelOfEducation: levelOfEducation?.value ?? null,
      programName: programName,
      yearAccomplished: yearAccomplished,
      employmentStatus: employmentStatus?.value ?? null,
      monthlyEarning: removeCommas(monthlyEarning),
      monthlyIncome: removeCommas(monthlyIncome),
      
       
    };
    // console.log("ApplicantBioData : ", ApplicantBioData);
    if (isValidated()) {
      setEducationInfo(ApplicantBioData);
      setCurrentPage(4);
    }
  };

  const handleNext = () => {
    setCurrentPage(4)
  }

  const handleBack = () => setCurrentPage(2);

  const maxDate = sub(new Date(), { years: 0 });
  const minDate = sub(new Date(), { years: 30 });
  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
 
      <MDBox p={3}>
      <MDTypography variant="h5">Education & Employment</MDTypography>
      <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="info"
            icon={<LooksOne fontSize="inherit" />}        
          >
           Education Background
          </Alert>
        </Grid>      </MDBox>

      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>

        <Grid item xs={12} sm={4}>
            <Autocomplete
              // multiple
              disabled={disableEdit}
              value={levelOfEducation}
              options={levelOfEducationOptions}
              onChange={getSearchLevelOfEducation}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Highest Completed Level of Education"
                  success={levelOfEducationState === "success"}
                  error={levelOfEducationState === "error"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          {levelOfEducation?.value !== 1 && levelOfEducation?.value !== null && (<>
          <Grid item xs={12} sm={4}>
            <FormField
             key={myKey}
             disabled={disableEdit}
              isRequired
              label="Instution Name"
              name="institutionName"
              value={institutionName}
              onChange={onChange}
              placeholder="Makerere University"
              success={institutionNameState === "success"}
              error={institutionNameState === "error"}
            />          
          </Grid> 
          
          <Grid item xs={12} sm={4}>
            <FormField
             key={myKey}
             disabled={disableEdit}
              isRequired
              label="Program Name 0r Main Subject"
              name="programName"
              value={programName}
              onChange={onChange}
              placeholder="Bachelor of Science in Computer Science"
              success={programNameState === "success"}
              error={programNameState === "error"}
            />          
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // disableFuture
                  disabled={disableEdit}
                  views={["year", "month", "day"]}
                  inputFormat="DD MMM, YYYY"
                  label="Year of Accomplishment"
                  openTo="year"
                  value={yearAccomplished}
                  // maxDate={maxDate}
                  minDate={minDate}
                  onChange={(newValue) => {
                    // console.log("dob: ", new Date(newValue));
                    setYearAccomplished(new Date(newValue));
                    setYearAccomplishedState("success");
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          
           </>)}

         

        
          <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="warning"
            icon={<LooksTwo fontSize="inherit" />}        
          >
            Employment Status
          </Alert>
        </Grid> 

        <Grid item xs={12} sm={4}>
        <Autocomplete
              // multiple
              disabled={disableEdit}
              value={employmentStatus}
              options={employmentStatusOptions}
              onChange={getSearchEmploymentStatus}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Employment Status"
                  success={employmentStatusState === "success"}
                  error={employmentStatusState === "error"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormField
            key={myKey}
             disabled={disableEdit}
              isRequired
              label="Monthly Earning (UGX)"
              name="monthlyEarning"
              value={monthlyEarning}
              variant="standard"
              placeholder="500,0000"
              onChange={onChange}
              // inputProps={{ type: "email" }}
              success={monthlyEarningState === "success"}
              error={monthlyEarningState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField 
             key={myKey}
             disabled={disableEdit}           
              isRequired
              label="Total Monthly Income (UGX)"
              name="monthlyIncome"
              value={monthlyIncome}
              variant="standard"
              placeholder="500,0000"
              onChange={onChange}
              success={monthlyIncomeState === "success"}
              error={monthlyIncomeState === "error"}
            />
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
        </MDButton>: <MDButton
                            onClick={handleSave}
                            variant="gradient"
                            color="dark"
                          >
                            save & next
                          </MDButton>}  </MDBox>)}
                     
                   
          
          
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
