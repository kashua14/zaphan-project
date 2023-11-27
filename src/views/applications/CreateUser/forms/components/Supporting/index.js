// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Settings page components
import FormField from "components/FormField";
import MDDropzone from "components/MDDropzone";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
formatMoney
} from "constants/methodConstants";
import { Alert, FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sub } from "date-fns";

import {  uploadFiles,removeFile} from 'util/FileUploadUtils';


import PropTypes from "prop-types";

import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";

import { useSnackbar } from "notistack";
import { LooksOne,LooksTwo } from "@mui/icons-material";
import Looks3Icon from '@mui/icons-material/Looks3';


function BioInfo({disableEdit,supportingInfo,showButtons, setIsAdmin, setSupportingInfo, setCurrentPage,staff,handleFinalSubmit,centers,handleCancelUser,isAdmin }) {
 
  const [editorValue, setEditorValue] = useState("<p><br><br><br><br><br></p>");
  const [aboutUs, setAboutUs] = useState(null);
  const [aboutUsState, setAboutUsState] = useState(null);
  const [myKey, setMyKey] = useState(0);

  const [supportDoc, setSupportDoc] = useState(null);
  const [supportDocState, setSupportDocState] = useState(null);

  const [training, setTraining] = useState(null);
  const [trainingState, setTrainingState] = useState(null);
  const [trainingStart, setTrainingStart] = useState(null);
  const [trainingStartState, setTrainingStartState] = useState(null);
  const [trainingReason, setTrainingReason] = useState(null);
  const [trainingReasonState, setTrainingReasonState] = useState(null);

  const [center, setCenter] = useState(null);
  const [centerState, setCenterState] = useState(null);

  const aboutUsOptions = [
    { label: "Our Website", value: "Our Website" },
    { label: "News Papers", value: "News Papers" },
    { label: "Society", value: "Society" },
    { label: "Poster", value: "Poster" },
    { label: "Training Center", value: "Training Center" },
    { label: "Radio", value: "Radio", },
    { label: "Social Media", value: "Social Media"},
  ];


  const trainingOptions = [
    { label: "Finished Leather products.", value: "leather" },
    { label: "Textile, Fashion and Design.", value: "textile" },
    { label: "ICT and Multimedia", value: "ict" },
    { label: "Industry 4.0 (with a focus on local electronics production).", value: "industry" },
  ];
    
  const trainingReasonOptions = [
    { label: "To Start Own Work", value: "To Start Own Work" },
    { label: "Work for Wages", value: "Work for Wages" },
    { label: "To Upgrade Skills for Foreign Employment", value: "To Upgrade Skills for Foreign Employment" },
  ];

  useEffect(() => {


    if(supportingInfo !== undefined && supportingInfo !== null){
      console.log(" user details ===>",supportingInfo)
      loadData()
    }else{
      // alert("user details	")
    }

  }, [supportingInfo,editorValue]);


const loadData = () => {

  console.log("supportingInfo ===>",supportingInfo)

  setTrainingReason(trainingReasonOptions.find((i)=> i.value === supportingInfo?.trainingReason)??null);
  setTraining(trainingOptions.find((i)=> i.value === supportingInfo?.training)??null);
  setTrainingStart(supportingInfo?.trainingStart ?? null);

  setCenter(centerOptions.find((i)=> i.value === supportingInfo?.center)??null);

 setAboutUs(aboutUsOptions.find((i)=> i.value === supportingInfo?.aboutUs)??null);
 setEditorValue(supportingInfo.relevantInfo);
  setAboutUsState("success");
  setMyKey(Math.random());

  setSupportDoc(supportingInfo?.supportDoc);
  setSupportDocState("success");

  setTrainingState("success");
  setTrainingStartState("success");
  setTrainingReasonState("success");
  setCenterState("success");

}


const getSearchAboutUs = (e, value) => {
  setAboutUs(value);
  if (value !== null) {
    setAboutUsState("success");
  } else {
    setAboutUsState("error");
  }
};


const getSearchTraining = (_, newValue) => {
  setTraining(newValue);
  setTrainingState("success");
};

const getSearchTrainingReason = (_, newValue) => {
  setTrainingReason(newValue);
  setTrainingReasonState("success");
};

const getSearchCenter = (_, newValue) => {
  setCenter(newValue);
  setCenterState("success");
};


  

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      aboutUsState === "success" &&
      supportDocState === "success" &&
      trainingState === "success" &&
      trainingStartState === "success" &&
      trainingReasonState === "success" &&
      centerState === "success"

    ) {
      return true;
    }

    if (aboutUsState !== "success") {
      setAboutUsState("error");
      openSnackbar("You must information on how you got to know about us", "error");
    }
    if (supportDocState !== "success") {
      setSupportDocState("error");
      openSnackbar("You must Add a supporting Document", "error");
    }
    if (trainingState !== "success") {
      setTrainingState("error");
      openSnackbar("You need to enter a valid training", "error");
    }
    if (trainingStartState !== "success") {
      setTrainingStartState("error");
      openSnackbar("You need to enter a valid training start date", "error");
    }
    if (trainingReasonState !== "success") {
      setTrainingReasonState("error");
      openSnackbar("You need to enter a valid training reason", "error");
    }
      if (centerState !== "success") {
        setCenterState("error");
        openSnackbar("You need to enter a valid center", "error");
      }

    return false;
  }

  const handleSave = async  () => {    
    const ApplicantBioData = {
    aboutUs: aboutUs?.value ?? null,    
    relevantInfo:editorValue,
    supportDoc:supportDoc,
    training: training?.value ?? null,
    trainingStart: trainingStart,
    trainingReason: trainingReason?.value ?? null,
    center: center?.value ?? null,
    };
    // console.log("ApplicantBioData : ", ApplicantBioData);
    if (isValidated()) {
      setSupportingInfo(ApplicantBioData);
      // handleFinalSubmit();

  // Use await to wait for handleFinalSubmit to complete
  // await new Promise(resolve => setTimeout(resolve, 2000)); // 2000 milliseconds = 2 seconds

  // // Now, you can call handleFinalSubmit
  // await handleFinalSubmit();
    }
  };

  const handleNext = () => {
    // setIsAdmin(false)
    handleCancelUser()
  }


  const handleDeleteSupportDoc = (supportDoc) => () => {
    removeFile(supportDoc?.id)
    setSupportDoc(null);
    setSupportDocState(null);
  };

  const centerOptions = [];
  centers?.map(({ name, id,location }) => {
    centerOptions.push({ label: name+" ("+location+")", value: id });
  return 0;
});


  const handleBack = () => setCurrentPage(staff?6:3);

  const maxDate = sub(new Date(), { years: 10 });
  const minDate = sub(new Date(), { years: 2 });
  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
    <MDBox p={3}>
    <MDTypography variant="h5">Supporting Information  </MDTypography>
    <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="info"
            icon={<LooksOne fontSize="inherit" />}        
          >
           Training Information
          </Alert>
        </Grid> 
        </MDBox>

        <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>

             <Grid item xs={12} sm={8}>
            <Autocomplete
            disabled={disableEdit}
              value={center}
              options={centerOptions}           
              onChange={getSearchCenter}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="Incubation Center "
                  InputLabelProps={{ shrink: true }}
                  success={centerState === "success"}
                  error={centerState === "error"}
                />
              )}
            />
          </Grid>

        <Grid item xs={12} sm={4}>
        <Autocomplete
              // multiple
              disabled={disableEdit}
              value={training}
              options={trainingOptions}
              onChange={getSearchTraining}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Training"
                  success={trainingState === "success"}
                  error={trainingState === "error"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                disabled={disableEdit}
                  disablePast
                  views={["year", "month", "day"]}
                  inputFormat="DD MMM, YYYY"
                  label="Training Start Date"
                  openTo="year"
                  value={trainingStart}
                  // maxDate={maxDate}
                  minDate={minDate}
                  onChange={(newValue) => {
                    // console.log("dob: ", new Date(newValue));
                    setTrainingStart(new Date(newValue));
                    setTrainingStartState("success");
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Autocomplete
              // multiple
              disabled={disableEdit}
              value={trainingReason}
              options={trainingReasonOptions}
              onChange={getSearchTrainingReason}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Reason for Training"
                  success={trainingReasonState === "success"}
                  error={trainingReasonState === "error"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>   
          </Grid>
          </MDBox>
 
      <MDBox p={3}>
      
      <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="warning"
            icon={<LooksTwo fontSize="inherit" />}        
          >
        Document Uploads (Put all documents in one file and upload)
          </Alert>
        </Grid>      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>

        <Grid item xs={12} sm={12}>
         <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                File Upload : Academic Documents and Resume            
              </MDTypography>
            </MDBox>
           
            {supportDoc !== undefined && supportDoc !== null?
          <Grid item xs={12} sm={12}>
          <MDTypography variant="button" fontWeight="light" color="text">
          <a href={supportDoc?.path} target="_blank"  download > 
          <FileDownloadIcon fontSize="medium" color="success" />
                         </a>

          {supportDoc?.fileName}
          {!isAdmin?<button onClick={handleDeleteSupportDoc(supportDoc)}><DeleteForeverIcon fontSize="medium" color="error" /></button>:null}
          </MDTypography>
          </Grid>

:          
  <FilePond
     allowMultiple={false}
    maxFileSize={'5MB'}
    allowImageResize={true}

    acceptedFileTypes = {[ 'application/pdf']}
     server={
      {
              process:(fieldName, file, metadata, load, error, progress, abort) => {
                // fieldName is the name of the input field
                // file is the actual file object to send
                const formData = new FormData();
                formData.append('file', file);
                formData.append('name', fieldName);
                formData.append('filetype', 13);
                // const request = new XMLHttpRequest();
                // request.open('POST', API_BASE_URL + "/uploadMultipleFiles");
                uploadFiles(formData)
                .then(response => {
                  console.log("response",response);
                  
                  setSupportDoc(response);
                  setSupportDocState("success");

                    load(response.message);

                }).catch(error => {
                  console.log("error",error);
                    // error(error.error);
                });

                return {
                    abort: () => {
                        abort();
                      }
            };

          },
          revert: (uniqueFileId, load) => {
            removeFile(supportDoc?.id)
            load();
        }
          }
    }></FilePond>}
           
          </Grid>

          <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="success"
            icon={<Looks3Icon fontSize="inherit" />}        
          >
           Any Other Relevant Information
          </Alert>
        </Grid> 

     

          <Grid item xs={12} sm={7}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Any Other Information?&nbsp;&nbsp;
                <MDTypography variant="caption" color="text">
                  (optional)
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDEditor disabled={disableEdit} key={myKey} value={editorValue} onChange={setEditorValue} />
          </Grid>
       
          <Grid item xs={12} sm={5}>
        <Autocomplete
              // multiple
              disabled={disableEdit}
              value={aboutUs}
              options={aboutUsOptions}
              onChange={getSearchAboutUs}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="How Did You Hear About Us?"
                  success={aboutUsState === "success"}
                  error={aboutUsState === "error"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          
          <MDBox p={3} mt={2} width="100%" display="flex" justifyContent="space-between">

          {showButtons ?
                      <MDButton variant="gradient" color="light" onClick={handleBack} >
                              back
                            </MDButton>:<p></p>}

                            {isAdmin ?  <MDButton
                              onClick={handleNext}
                              variant="outlined"
                              color="dark"
                            >
                              CLOSE
                            </MDButton>: 
                            <>          {supportingInfo !== undefined && supportingInfo !== null?
                            <MDButton
                            onClick={handleFinalSubmit}
                            variant="gradient"
                            color="success"
                          >
                            SUBMIT APPLICATION
                          </MDButton> :
                              <MDButton
                              onClick={handleSave}
                              variant="gradient"
                              color="dark"
                              >
                              SAVE & NEXT
                              </MDButton>
                            }</>}
                          
                          </MDBox>
                     
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
