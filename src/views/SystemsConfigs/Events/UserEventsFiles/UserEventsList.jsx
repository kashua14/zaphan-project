import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";
import FilterList from "@mui/icons-material/FilterList";

import NoDataCard from 'components/FallBacks/NoDataCard';

import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import UserEventDetails from "./UserEventDetails";

import { getEventUsers,deleteEvent,approveEventRegistration} from "util/EventsUtils";
import TableExport from "components/TableExport";
import MDButton from "components/MDButton";

import { format  } from "date-fns";

import NewTableBeta from "components/TableExport/NewTableBeta";

 

export default function Requirements(props) {

  const [showAddCenter, setShowAddUser] = useState(false);
  const [centers, setClinics] = useState([]);

  const grouping = [{ columnName: 'category' },{ columnName: 'title' },{ columnName: 'status' }];

  const totalSummaryItems = [ { columnName: 'name', type: 'count' },  ];
  const groupSummaryItems = [  { columnName: 'name', type: 'count', showInGroupFooter: false },  ];

  const tableColumns = [
    { name: "category", title: "Category" },
    { name: "title", title: "Event" },
    { name: "status", title: "Status" },
    { name: "name", title: "Name" },
    { name: "contacts", title: "Contacts" }, 
    { name: "actions", title: "Actions" } 
    
  ];


  useEffect(() => {
    loadRegisteredUsers()
    if (props.showAddCenter) {
      setShowAddUser(true)
    }

  }, []);


  
  const loadRegisteredUsers = () => {
    const MyRequest={}
    getEventUsers(MyRequest)
    .then((response) => {
      setClinics(response);
      console.log("Clinic List => ", response);
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


const handleApproveRegistration= (id,status) => {
  const ClinicData = {
    id:id,
    status:status,
  };
  
  approveEventRegistration(ClinicData)
      .then((response) => {
        if (response.success) {
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
  category: data.eventDetails.category,
  title:data.eventDetails.eventTitle+"("+getDates(data.eventDetails.startDate) +" - "+getDates(data.eventDetails.endDate)+")", 
  name: data.userDetails.name,   
  contacts: data.userDetails.email+" & "+data.userDetails.phoneNumber,
  status: data.status,
  
  actions: (
    // we've added some custom button actions
    <Grid container justifyItems="center">
      <Grid item>
        {/* <MDButton color="info" variant="text" 
        onClick={() => props.handleLoadDetails(data)}
        >
          Load Details
        </MDButton> */}        
        {data.status === "PENDING" ?<>
        <MDButton color="success" variant="text" 
        onClick={() => handleApproveRegistration(data.id,"APPROVED")}
        >
          APPROVE
        </MDButton>
                  <MDButton color="error" variant="text" 
          onClick={() => handleApproveRegistration(data.id,"DECLINED")}
          >
            DECLINE
          </MDButton>
          </>:
        (data.status === "APPROVED" ?

          <MDButton color="error" variant="text" 
          onClick={() => handleApproveRegistration(data.id,"DECLINED")}
          >
            DECLINE
          </MDButton>:
           <MDButton color="success" variant="text" 
           onClick={() => handleApproveRegistration(data.id,"APPROVED")}
           >
             APPROVE
           </MDButton>

        )
      
        }

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
            title={showAddCenter?"Add Event":"User Events Registration"} />
          <Alert icon={<FilterList fontSize="inherit" />} severity={showAddCenter?"info":"warning"}>
            {showAddCenter?"Event Details":"Below is a list of Registered Users "}
          </Alert>
          <MDBox>
            {!showAddCenter ?(rows.length>0? null:<NoDataCard title="No Users found!" />) : null}
            {showAddCenter ? <UserEventDetails centerDetails={props.centerDetails} handleClose={props.handleClose}/> : 
            (rows.length>0? 
            <NewTableBeta 
              rows={rows}
              exportRow={rows}
              columns={tableColumns}
              exportColumns={tableColumns}
              fileName={"Events"}
              grouping={grouping}
              totalSummaryItems={totalSummaryItems}
              groupSummaryItems={groupSummaryItems}
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

