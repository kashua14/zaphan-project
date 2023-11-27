import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";
import FilterList from "@mui/icons-material/FilterList";

import NoDataCard from 'components/FallBacks/NoDataCard';

import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import ClinicDetails from "./CenterDetails";

import { getCenters} from "util/SystemsConfigsUtils";
import TableExport from "components/TableExport";
import MDButton from "components/MDButton";


export default function Requirements(props) {

  const [showAddCenter, setShowAddUser] = useState(false);
  const [centers, setClinics] = useState([]);

  const tableColumns = [
    { name: "name", title: "Name" },
    { name: "code", title: "Code" },
    { name: "location", title: "Location" }, 
    { name: "contacts", title: "Contacts" }, 
    { name: "actions", title: "Actions" } 
    
  ];


  useEffect(() => {
    loadClinics()
    if (props.showAddCenter) {
      setShowAddUser(true)
    }

  }, []);


  
  const loadClinics = () => {
    const MyRequest={}
    getCenters(MyRequest)
    .then((response) => {
      setClinics(response);
      // console.log("Clinic List => ", response);
    })
    .catch((error) => {
      console.log("loadReligiousAffiliationEnums => ", error.message);
    });
};


const getContacts =  (data) => {

  let phones = "";

  if(data.length>0){
    phones = ","
  data.map((module) => {
    phones+= module.contact+", "
  })
  }

return phones
}


const rows = centers.map((data, key) => {



  return {  
    name:data.name,
  code:data.code,
  location: data.location,
  contacts: data.email+" & "+data.phone,
  actions: (
    // we've added some custom button actions
    <Grid container justifyItems="center">
      <Grid item>
        <MDButton color="info" variant="text" 
        onClick={() => props.handleLoadDetails(data)}
        >
          Load Details
        </MDButton>
      </Grid>
    </Grid>
  ),
};
})

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CustomCardHeader
            icon={<WorkIcon fontSize="large" style={{ color: "white" }} />}
            title={showAddCenter?"Add Center":"Centers Management"} />
          <Alert icon={<FilterList fontSize="inherit" />} severity={showAddCenter?"info":"warning"}>
            {showAddCenter?"Center Details":"Below is a list of Centers "}
          </Alert>
          <MDBox>
            {!showAddCenter ?(rows.length>0? null:<NoDataCard title="No Centers found!" />) : null}
            {showAddCenter ? <ClinicDetails centerDetails={props.centerDetails} handleClose={props.handleClose}/> : 
            (rows.length>0? <TableExport columns={tableColumns} data={rows} canSearch />:null)
            }
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

