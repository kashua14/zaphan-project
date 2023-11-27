import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";
import FilterList from "@mui/icons-material/FilterList";

import NoDataCard from 'components/FallBacks/NoDataCard';

import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import EventDetails from "./EventDetails";

import { getEvents,deleteEvent} from "util/EventsUtils";
import TableExport from "components/TableExport";
import MDButton from "components/MDButton";

import { format  } from "date-fns";

import NewTableBeta from "components/TableExport/NewTableBeta";

 

export default function Requirements(props) {

  const [showAddCenter, setShowAddUser] = useState(false);
  const [centers, setClinics] = useState([]);

  const grouping = [{ columnName: 'category' }];

  const tableColumns = [
    { name: "category", title: "Event Title" },
    { name: "name", title: "Event Title" },
    { name: "location", title: "Location" },
    { name: "contacts", title: "Contacts" }, 
    { name: "dates", title: "Dates" }, 
    { name: "registrationCloseDate", title: "Registration Close" }, 
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
    getEvents(MyRequest)
    .then((response) => {
      setClinics(response);
      // console.log("Clinic List => ", response);
    })
    .catch((error) => {
      console.log("loadReligiousAffiliationEnums => ", error.message);
    });
};


const handleDelete= (id) => {
  const ClinicData = {
    id:id,
  };
  
    deleteEvent(ClinicData)
      .then((response) => {
        if (response.success) {
          // alert("")
          props.handleClose()
        }
      })
      .catch((error) => {
        console.log("saveApplicantBioData-err : ", error.message);
      });
};

const getDates =  (startDateString) => {
  let startDate = new Date(startDateString);
  return format(startDate, 'EEE dd MMM yyyy hh:mm a');
}


const rows = centers.map((data, key) => {



  return {  
  category: data.category,
  name:data.eventTitle,
  location: data.location,
  contacts: data.email+" & "+data.phone,
  dates: getDates(data.startDate) +" - "+getDates(data.endDate),
  registrationCloseDate: getDates(data.registrationClose),
  actions: (
    // we've added some custom button actions
    <Grid container justifyItems="center">
      <Grid item>
        <MDButton color="info" variant="text" 
        onClick={() => props.handleLoadDetails(data)}
        >
          Load Details
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
            title={showAddCenter?"Add Event":"Events Management"} />
          <Alert icon={<FilterList fontSize="inherit" />} severity={showAddCenter?"info":"warning"}>
            {showAddCenter?"Event Details":"Below is a list of Events "}
          </Alert>
          <MDBox>
            {!showAddCenter ?(rows.length>0? null:<NoDataCard title="No Events found!" />) : null}
            {showAddCenter ? <EventDetails centerDetails={props.centerDetails} handleClose={props.handleClose}/> : 
            (rows.length>0? 
            <NewTableBeta 
              rows={rows}
              exportRow={rows}
              columns={tableColumns}
              exportColumns={tableColumns}
              fileName={"Events"}
              grouping={grouping}
              // passSelection = {passSelection}
              // grouping={this.state.grouping}
              // defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
            
            :null)
            }
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

