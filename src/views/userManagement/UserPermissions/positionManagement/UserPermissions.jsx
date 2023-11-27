import React, { useState, useEffect } from "react";

import { Alert, Card } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";
import FilterList from "@mui/icons-material/FilterList";

import NoDataCard from 'components/FallBacks/NoDataCard';

import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

// import CreateUser from "../CreateUser";

export default function Requirements(props) {

  const [showAddPosition, setShowAddUser] = useState(false);


  useEffect(() => {

    if (props.showAddPosition) {
      setShowAddUser(true)
    }

  }, []);

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CustomCardHeader
            icon={<WorkIcon fontSize="large" style={{ color: "white" }} />}
            title={showAddPosition?"Add User":"User Permission Management"} />
          <Alert icon={<FilterList fontSize="inherit" />} severity={showAddPosition?"info":"warning"}>
            {showAddPosition?"User Details":"Below is a list of all System Users and their Roles "}
          </Alert>
          <MDBox>
            {!showAddPosition ? <NoDataCard title="No Users found!" /> : null}
            {showAddPosition ? null : null}
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

