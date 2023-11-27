import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";

import NoDataCard from "components/FallBacks/NoDataCard";

import MDButton from "components/MDButton/index.js";
import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import PositionDetails from "./PositionDetails";

import { getPositions } from "util/PermissionsUtil";
import NewTableBeta from "components/TableExport/NewTableBeta";
import { positionDummyData } from "data";

export default function Requirements(props) {
  const [showAddPosition, setShowAddUser] = useState(false);

  const [positions, setPositions] = useState(positionDummyData);

  const columns = [
    { name: "title", title: "Title" },
    { name: "abbrev", title: "Abbrev" },
    { name: "positionStatus", title: "Status" },
    { name: "actions", title: "Actions" },
  ];

  useEffect(() => {
    loadPermissions();
    if (props.showAddPosition) {
      setShowAddUser(true);
    }
  }, [props.showAddPosition]);

  const loadPermissions = () => {
    const MyData = {};
    getPositions(MyData)
      .then((response) => {
        setPositions(response);
      })
      .catch((error) => {
        setPositions(positionDummyData);
        console.log("Positions => ", error.message);
      });
  };
  const formatEnum = (enumValue) => {
    if (enumValue !== null && enumValue !== undefined && enumValue !== "") {
      var frags = enumValue.toLowerCase().split("_");
      var i;
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    } else {
      return "Unknown";
    }
  };
  const data = positions.map((prop) => {
    return {
      title: prop.title,
      abbrev: prop.abbrev,
      positionStatus: formatEnum(prop.positionStatus),

      actions: (
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton
              color="info"
              variant="text"
              // onClick={() => handleDelete(data.id)}
            >
              Edit
            </MDButton>
          </Grid>
        </Grid>
      ),
    };
  });

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CustomCardHeader
            icon={<WorkIcon fontSize="large" style={{ color: "white" }} />}
            title={showAddPosition ? "ADD POSITION" : "POSITIONS"}
          />
          <Alert severity="info">
            {showAddPosition ? "Position Details" : "Below is a list of Positions "}
          </Alert>
          <MDBox>
            {!showAddPosition ? (
              data.length > 0 ? null : (
                <NoDataCard title="No Positions found!" />
              )
            ) : null}
            {showAddPosition ? (
              <PositionDetails handleCancelUser={props.handleCancelUser} />
            ) : data.length > 0 ? (
              <NewTableBeta
                rows={data}
                exportRow={data}
                columns={columns}
                exportColumns={columns}
                fileName={"Positions"}
                // passSelection = {passSelection}
                // grouping={this.state.grouping}
                defaultHiddenColumnNames={[]}
              />
            ) : null}
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
