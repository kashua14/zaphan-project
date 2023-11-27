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


import { Alert, FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sub } from "date-fns";

import PropTypes from "prop-types";


import { useSnackbar } from "notistack";
import { FilterList, LooksOne,LooksTwo } from "@mui/icons-material";

import { getUserPermissions} from "util/PermissionsUtil";
import NewTableBeta from "components/TableExport/NewTableBeta";

function BioInfo(props) {

  
  const [permissions, setPermissions] = useState([]);

  const defaultHiddenColumnNames = [];
  const columns = [
    { name: 'module', title: 'Module' },
    { name: 'systemProcess', title: 'Process' },
    { name: 'actionPermission', title: 'Right' },
    // { name: 'actions', title: 'Actions' },
  ];

  const grouping = [{columnName: 'module' }];
  


  useEffect(() => {
    loadPermissions()

    // alert(props.userId)
    
    // console.log("props.userDetails  +++ ",props.userDetails)
  }, []);
  
  const loadPermissions = () => {
    const MyData ={
      id:props.userId
    }
    getUserPermissions(MyData)
      .then((response) => {
        console.log("Position Permissions = => ", response);
        setPermissions(response);
      })
      .catch((error) => {
        // alert()
        console.log("Permissions => ", error.message);
      });
  };

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
  
  const data = permissions.map((prop, key) => {
    return {
      module:formatEnum(prop.module),
      systemProcess:formatEnum(prop.systemProcess),
      actionPermission:formatEnum(prop.actionPermission),
      actions: (
        <Grid container justifyItems="center">
        <Grid item>
          <MDButton color="info" variant="text" 
          // onClick={() => handleDelete(data.id)}
          >
            Edit
          </MDButton>
        </Grid>
      </Grid>
      )

    };
  })

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
     
      <MDBox component="form" pb={3} px={3}>
      <Grid item xs={12} sm={12}>
          <Alert icon={<FilterList fontSize="inherit" />} severity={"warning"}>
            {"User Permissions"}
          </Alert>
      {data.length>0?  
         
          <NewTableBeta 
              // key={myKey}
              rows={data}
              exportRow={data}
              columns={columns}
              exportColumns={columns}
              fileName={"Staff Positions"}
              // passSelection = {passSelection}
              grouping={grouping}
              defaultHiddenColumnNames={defaultHiddenColumnNames}
          /> :null}
          </Grid>
       
      </MDBox>
    </Card>
  );
}

// Typechecking props for the BioInfo


export default BioInfo;
