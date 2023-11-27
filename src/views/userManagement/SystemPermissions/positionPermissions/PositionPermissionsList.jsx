import React, { useState, useEffect } from "react";

import { Alert, Card } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";

import NoDataCard from "components/FallBacks/NoDataCard";

import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import PositionPermissionDetails from "../../UserPermissions/positionManagement/PositionPermissionDetails";

export default function Requirements(props) {
  const [showAddPermissionSet, setShowAddUser] = useState(false);

  useEffect(() => {
    if (props.showAddPermissionSet) {
      setShowAddUser(true);
    }
  }, [props.showAddPermissionSet]);

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CustomCardHeader
            icon={<WorkIcon fontSize="large" style={{ color: "white" }} />}
            title={
              showAddPermissionSet ? "ADD POSITION PERMISSION SET" : "POSITION PERMISSION SETS"
            }
          />
          <Alert severity={"info"}>
            {showAddPermissionSet
              ? "POSITION PERMISSION SET"
              : "Below is a list of Position Permission Sets "}
          </Alert>
          <MDBox>
            {!showAddPermissionSet ? (
              <NoDataCard title="No Position Permission sets found!" />
            ) : null}
            {showAddPermissionSet ? <PositionPermissionDetails /> : null}
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
