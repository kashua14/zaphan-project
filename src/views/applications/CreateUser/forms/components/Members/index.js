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
import TableExport from "components/TableExport";


function BioInfo({membersData,  setMembersData, setCurrentPage,isAdmin,showButtons }) {
 
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nin, setNin] = useState("");
  const [linkedin, setLinkedin] = useState("");
  
  const [firstNameState, setFirstNameState] = useState("");
  const [surnameState, setSurnameState] = useState("");
  const [userEmailState, setUserEmailState] = useState("");
  const [mobileNumberState, setMobileNumberState] = useState("");
  const [ninState, setNinState] = useState("");
  const [linkedinState, setLinkedinState] = useState("");
  const [members, setMembers] = useState([]);


  const tableColumns = [
    { name: "name", title: "Name" },
    { name: "contacts", title: "Contacts" },
    { name: "nin", title: "NIN" }, 
    { name: "linked", title: "LinkedIn" }, 
    { name: "actions", title: "Actions" } 
    
  ];

  

  useEffect(() => {
    if(membersData !== undefined && membersData !== null && membersData.length !== 0){
      console.log(" members",membersData)
      setMembers(membersData);
    }

  }, [membersData]);


  
const loadData = () => {

 
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
        if (verifyEmail(inputValue)) {
          setUserEmailState("success");
        } else {
          setUserEmailState("error");
        }
        break;
      case "mobileNumber":
        setMobileNumber(phoneFormat(phoneValue));
        if (verifyPhone(phoneValue)) {
          setMobileNumberState("success");
        } else {
          setMobileNumberState("error");
        }
        break;
      case "nin":
        setNin(inputValue);
        if (verifyLength(inputValue, 3)) {
          setNinState("success");
        } else {
          setNinState("error");
        }
        break;
      case "linkedin":
        setLinkedin(inputValue);
        if (verifyLength(inputValue, 3)) {
          setLinkedinState("success");
        } else {
          setLinkedinState("error");
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
      userEmailState === "success" &&
      ninState === "success" &&
      linkedinState === "success"


      
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
    if (userEmailState !== "success") {
      setUserEmailState("error");
      openSnackbar("Your email is invalid", "error");
    }
    if (ninState !== "success") {
      setNinState("error");
      openSnackbar("Your NIN is invalid", "error");
    }
    if (linkedinState !== "success") {
      setLinkedinState("error");
      openSnackbar("Your LinkedIn is invalid", "error");
    }

    return false;
  }

  const handleAddMemeber = () => {
     
    const ApplicantBioData = {
      firstName: firstName,
      surname: surname,
      userEmail: userEmail,
      mobileNumber: mobileNumber,
      nin: nin,
      linkedin: linkedin,
      
    };
    console.log("ApplicantBioData : ", ApplicantBioData);
    if (isValidated()) {
      
      addMember(ApplicantBioData);
     
    }
  };

  function clearStates() {
    setFirstName("");
    setSurname("");
    setUserEmail("");
    setMobileNumber("");
    setNin("");
    setLinkedin("");
    setFirstNameState(null);
    setSurnameState(null);
    setUserEmailState(null);
    setMobileNumberState(null);
    setNinState(null);
    setLinkedinState(null);
    
  }

  const handleSave = () => {
    if(members.length !== 0){    
    setMembersData(members);
    setCurrentPage(4);
    }else{
      openSnackbar("Add At least One member ", "error");
    }
    }

    const handleNext = () => {
      setCurrentPage(4)
    }


  const handleBack = () => setCurrentPage(5);


  const addMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
    clearStates();
  };

  const removeMemberByIndex = (indexToRemove) => {
    setMembers((prevMembers) => prevMembers.filter((_, index) => index !== indexToRemove));
  };

  const rows = members.map((data, key) => {
    return {  
      name:data.firstName+" "+data.surname,
      contacts: data.userEmail+" & "+data.mobileNumber,
      nin: data.nin,
      linked: data.linkedin,

    actions: (
      // we've added some custom button actions
      <Grid container justifyItems="center">
        {!isAdmin?<Grid item>
          <MDButton color="error" variant="text" 
          onClick={() => removeMemberByIndex(key)}
          >
            Remove
          </MDButton>
        </Grid>:null}
      </Grid>
    ),
  };
  })

  const maxDate = sub(new Date(), { years: 10 });

  return (
    <Card  sx={{ overflow: "visible" }} mt={4}>

      <MDBox p={2}>
      <MDTypography variant="h5">Company Members</MDTypography>
      {!isAdmin?
      <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="info"
            icon={<LooksOne fontSize="inherit" />}        
          >
           Add Members
          </Alert>
        </Grid>:null}   
        
           </MDBox>

      <MDBox component="form" pb={3} px={3}>
      {!isAdmin?
        <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="first Name"
              name="firstName"
              value={firstName}
              onChange={onChange}
              placeholder="John"
              success={firstNameState === "success"}
              error={firstNameState === "error"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="Surname"
              name="surname"
              value={surname}
              onChange={onChange}
              placeholder="Doe"
              success={surnameState === "success"}
              error={surnameState === "error"}
            />
          </Grid>

         
          <Grid item xs={12} sm={4}>
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

          <Grid item xs={12} sm={4}>
            <FormField
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
              isRequired
              label="LinkedIn Profile Link"
              name="linkedin"
              value={linkedin}
              variant="standard"
              onChange={onChange}
              placeholder="CM000900000"
              // inputProps={{ type: "email" }}
              success={linkedinState === "success"}
              error={linkedinState === "error"}
            />
          </Grid>
          
          <Grid container direction="row-reverse" mt={2}>
          <Grid item xs={12} sm={1}>
            <MDButton
              variant="gradient"
              color="info"
              size="small"
              fullWidth
              onClick={handleAddMemeber}
            >
              ADD
            </MDButton>
          </Grid>
        </Grid>
        </Grid>
         :null}
          
          <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="warning"
            icon={!isAdmin?<LooksTwo fontSize="inherit" />:<LooksOne fontSize="inherit" />}        
          >
           Members
          </Alert>
        </Grid> 

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {rows.length > 0 && ( 
                       <TableExport columns={tableColumns} data={rows}  />
            )}
          </Grid>
          
        </Grid>
              {showButtons && (        <MDBox p={3} mt={2} width="100%" display="flex" justifyContent="space-between">
                      <MDButton variant="gradient" color="light" onClick={handleBack} >
                              back
                            </MDButton>
                {isAdmin ?  <MDButton
                              onClick={handleNext}
                              variant="gradient"
                              color="dark"
                            >
                              next
                            </MDButton>:   <MDButton
                            onClick={handleSave}
                            variant="gradient"
                            color="dark"
                          >
                            save & next
                          </MDButton>}  
                          </MDBox>)}


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
