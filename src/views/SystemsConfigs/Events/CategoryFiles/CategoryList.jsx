import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";
import FilterList from "@mui/icons-material/FilterList";

import NoDataCard from 'components/FallBacks/NoDataCard';

import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import CategoryDetails from "./CategoryDetails";

import { getCategories,deleteCategory} from "util/EventsUtils";

import TableExport from "components/TableExport";
import MDButton from "components/MDButton";


export default function Requirements(props) {

  const [showAddCenter, setShowAddUser] = useState(false);
  const [centers, setClinics] = useState([]);

  const tableColumns = [
    { name: "name", title: "Category Name" },
    { name: "status", title: "Status" },
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
    getCategories(MyRequest)
    .then((response) => {
      setClinics(response);
      // console.log("Clinic List => ", response);
    })
    .catch((error) => {
      console.log("loadReligiousAffiliationEnums => ", error.message);
    });
};



const handleDelete = (id) => {

  const ClinicData = {
    id:id
  };
  
    deleteCategory(ClinicData)
      .then((response) => {
        if (response.success) {
          props.handleClose()
        }
      })
      .catch((error) => {
        console.log("saveApplicantBioData-err : ", error.message);
      });
  
};





const rows = centers.map((data, key) => {
  return {  
    name:data.name,
  status:data.status,
  actions: (
    // we've added some custom button actions
    <Grid container justifyItems="center">
      <Grid item>
        <MDButton color="info" variant="text" 
        onClick={() => props.handleLoadDetails(data)}
        >
          Edit
        </MDButton>
        <MDButton color="error" variant="text" 
        onClick={() => handleDelete(data.id)}
        >
          Delete
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
            title={showAddCenter?"Add Category":"Event Category Management"} />
          <Alert icon={<FilterList fontSize="inherit" />} severity={showAddCenter?"info":"warning"}>
            {showAddCenter?"Event Category Details":"Below is a list of Categories "}
          </Alert>
          <MDBox>
            {!showAddCenter ?(rows.length>0? null:<NoDataCard title="No Categories found!" />) : null}
            {showAddCenter ? <CategoryDetails centerDetails={props.centerDetails} handleClose={props.handleClose}/> : 
            (rows.length>0? <TableExport columns={tableColumns} data={rows} canSearch />:null)
            }
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

