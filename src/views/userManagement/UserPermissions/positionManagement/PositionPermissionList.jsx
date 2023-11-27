import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";

import NoDataCard from "components/FallBacks/NoDataCard";

import MDButton from "components/MDButton/index.js";
import CustomCardHeader from "components/Card/CustomCardHeader";

import { getPositionPermissions } from "util/PermissionsUtil";
import NewTableBeta from "components/TableExport/NewTableBeta";
import { positionPermissionsDummyData } from "data";

export default function Requirements(props) {
  const [showAddPosition, setShowAddUser] = useState(false);

  const [positionPermissions, setPositionPermissions] = useState(positionPermissionsDummyData);

  // const defaultHiddenColumnNames = ['facultyString', 'departmentString', 'campusName'],

  const grouping = [{ columnName: "title" }];

  const columns = [
    { name: "title", title: "Position" },
    { name: "module", title: "Module" },
    { name: "systemProcess", title: "Process" },
    { name: "actionPermission", title: "Permission" },
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
    getPositionPermissions(MyData)
      .then((response) => {
        setPositionPermissions(response);
      })
      .catch((error) => {
        setPositionPermissions(positionPermissionsDummyData);
        console.log("Permissions => ", error.message);
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

  const data = positionPermissions.map((prop, key) => {
    return {
      title: prop.title,
      module: formatEnum(prop.permissionsDetails.module),
      systemProcess: formatEnum(prop.permissionsDetails.systemProcess),
      actionPermission: formatEnum(prop.permissionsDetails.actionPermission),
      actions: (
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton
              color="error"
              variant="text"
              // onClick={() => handleDelete(data.id)}
            >
              Delete
            </MDButton>
          </Grid>
        </Grid>
      ),
    };
  });
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CustomCardHeader
            icon={<WorkIcon fontSize="large" style={{ color: "white" }} />}
            title={showAddPosition ? "Add User" : "Position Permission Management"}
          />
          <Alert severity="info">
            {showAddPosition ? "User Details" : "Below is a list of all Position Permissions"}
          </Alert>
          <MDBox>
            {!showAddPosition ? (
              !data.length > 0 ? (
                <NoDataCard title="No Users found!" />
              ) : null
            ) : null}
            {showAddPosition ? null : data.length > 0 ? (
              <NewTableBeta
                rows={data}
                exportRow={data}
                columns={columns}
                exportColumns={columns}
                fileName={"Staff Positions"}
                grouping={grouping}
                // passSelection = {passSelection}
                // grouping={this.state.grouping}
                // defaultHiddenColumnNames={defaultHiddenColumnNames}
              />
            ) : null}
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}
