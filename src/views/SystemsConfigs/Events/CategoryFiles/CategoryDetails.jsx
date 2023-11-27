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
  verifyLength,
} from "constants/methodConstants";

import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import { getStatus,createEventCategory } from "util/EventsUtils";





function ClinicInfo(props) {
  
  const [editorValue, setEditorValue] = useState("<p><br><br><br><br><br></p>");
  const [nameState, setNameState] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [myKey, setMyKey] = useState(0);
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState(null);
  const [statusState, setStatusState] = useState("");


  useEffect(() => {
    
    loadStatuses()
    if(props.centerDetails !== undefined && props.centerDetails !== null){
      loadDetails()
      
    }
    
  }, []);

  const loadStatuses = () => {
    getStatus()
      .then((response) => {
        setStatuses(response);
      })
      .catch((error) => {
        console.log("loadStatusEnums => ", error.message);
      });
  };


  
  const loadDetails = () => {
   
    let data = props.centerDetails;

    setName(data.name)
    setStatus(data.status)
    setId(data.id)

    setNameState("success");
    setStatusState("success");
        
  };


  const getSearchStatus = (_, newValue) => {
    setStatus(newValue);
    setStatusState("success");
  };

  const onChange = (e) => {
    const inputValue = e.target.value;
    switch (e.target.name) {
      case "name":
        setName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setNameState("success");
        } else {
          setNameState("error");
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
      statusState === "success" &&
      nameState === "success" 
      ) {
      return true;
    }

   if (nameState !== "success") {
      setNameState("error");
      openSnackbar("Category Name is invalid", "error");
    }
   else if (statusState !== "success") {
      setStatusState("error");
      openSnackbar("Status invalid", "error");
    } 
    return false;
  }

  const handleSave = () => {

    const ClinicData = {
      id:id,
      name:name,
      status: status?.value ?? null,
    };
    console.log("ClinicData : ", ClinicData);
    if (isValidated()) {
      createEventCategory(ClinicData)
        .then((response) => {
          if (response.success) {
            // alert("")
            props.handleClose()
          }
        })
        .catch((error) => {
          console.log("saveApplicantBioData-err : ", error.message);
        });
    }
  };

      const statusOptions = [];
    statuses?.map((option) => {
      statusOptions.push({ label: option.name, value: option.value });
      return 0;
    });


  

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
      <MDBox p={3}>
        <MDTypography variant="h5"></MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="Category Name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Text"
              success={nameState === "success"}
              error={nameState === "error"}
            />
          </Grid>
        
     
          <Grid item xs={12} sm={4}>
          <Autocomplete
              value={status}
              defaultValue={status}
              options={statusOptions}
              onChange={getSearchStatus}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Category Status"
                  // InputLabelProps={{ shrink: true }}
                  success={statusState === "success"}
                  error={statusState === "error"}
                />
              )}
            />
          </Grid>

        
    
        </Grid>
        <Grid container direction="row-reverse" mt={2}>
          <Grid item xs={12} sm={1}>
            <MDButton
              variant="gradient"
              color="success"
              size="small"
              fullWidth
              onClick={handleSave}
            >
              Save
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the ClinicInfo
ClinicInfo.propTypes = {
  
};

export default ClinicInfo;
