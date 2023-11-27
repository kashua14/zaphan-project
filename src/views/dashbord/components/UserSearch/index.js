/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import FilterList from "@mui/icons-material/FilterList";
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
// Images
import masterCardLogo from "assets/images/logos/504052.png";
import visaLogo from "assets/images/logos/visa.png";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";
import CustomDialog from "components/Dialog/CustomDialog";
import { useEffect, useState } from "react";
import {  getUsers } from "util/UserMgtUtils";

import CreateUser from "views/userManagement/UserAccounts/CreateUser";
import { Alert, Autocomplete, TextField } from "@mui/material";
import FormField from "components/FormField";
import GridItem from "components/Grid/GridItem";


function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;


const [showAddChoice,setShowAddChoice] = useState(false);

const [loadData,setLoadData] = useState(false);



const [patient,setPatient] = useState("");
const [users,setUsers] = useState([]);
const [userDetails,setUserDetails] = useState([]);

useEffect(() => {
  // alert(props.patientName)
  loadUsers();

}, []);

const loadUsers = () => {
  const CountryRequest = {
    userType:"PATIENT"
  };

  getUsers(CountryRequest)
    .then((response) => {
      console.log("Users List => ", response);
      setUsers(response);
    })
    .catch((error) => {
      console.log("Country List => ", error.message);
    });
};

const closeAddChoice = () => {
  setShowAddChoice(false);
  setPatient("");
  setUserDetails("")
  setLoadData(false)


};
const openAddChoice = () => {
  setShowAddChoice(true);
  setLoadData(false)

};



const getSearchPatient = (_,newValue) => {
  // alert(JSON.stringify(newValue.userDetails))
  setLoadData(true)
  setPatient(newValue);
  setUserDetails(newValue.userDetails)
  setShowAddChoice(true);

  
};

const userList =[];
users?.map((data) => {
  let name = data.firstName+" "+data.otherName+" "+data.surname;
  userList.push({ label: name, value: data.id,userDetails:data});
return 0;
});

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Patient Search
        </MDTypography>
        <MDButton variant="gradient" color="dark"  onClick={() => openAddChoice()}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new Patient
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox component="img" src={masterCardLogo} alt="master card" width="10%" mr={2} />
              <MDTypography variant="h6" fontWeight="medium">
                Patient Id/Patient Name
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    search
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox> */}

            <Autocomplete
            disablePortal
              value={patient}
              options={userList}
              defaultValue={patient}
              onChange={getSearchPatient}
              renderInput={(params) => <TextField {...params} label="Patient Id/Patient Name"  />}
              // renderInput={(params) => (
              //   <FormField
              //     {...params}
              //     isRequired
              //     label="Patient Id/Patient Name"
              //     InputLabelProps={{ shrink: true }}
                  
              //   />
              // )}
            />
          </Grid>
     
        </Grid>
      </MDBox>

      <CustomDialog
        maxWidth={"lg"}
        title={"Patient Profiling"}
        open={showAddChoice}
        titleBGColor={"info"}
        handleClose={closeAddChoice}
        content={
          <GridItem xs={12} sm={12} md={12}>
              <Alert 
           action={loadData?
            <MDButton
              color="success"
              size="small"
              startIcon={<InsertInvitationIcon  fontSize="large" />}
              // onClick={() => openAddChoice("Add", "")}
            >
              create appointment
            </MDButton>:null}
          
          icon={<FilterList fontSize="inherit" />} severity={loadData? "success":"info"}>
            {"User Details"}
          </Alert>
            <CreateUser userDetails={userDetails}/>            
          </GridItem>
        }
      />

    </Card>
  );
}

export default PaymentMethod;
