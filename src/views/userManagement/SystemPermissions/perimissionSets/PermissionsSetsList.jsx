import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";
import FilterList from "@mui/icons-material/FilterList";

import NoDataCard from "components/FallBacks/NoDataCard";

import MDButton from "components/MDButton/index.js";
import TableExport from "components/TableExport";
import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import PermissionSetDetails from "./PermissionSetDetails";

import { getPermissionSets, deletePermissionSet } from "util/PermissionsUtil";
import { permissionSetsDummyData } from "data";

export default function Requirements(props) {
  const [showAddPermissionSet, setShowAddUser] = useState(false);

  const [permissionSets, setPermissionSets] = useState(permissionSetsDummyData);

  const tableColumns = [
    { name: "module", title: "Module" },
    { name: "systemProcess", title: "Process" },
    { name: "permissions", title: "Permissions" },
    { name: "actions", title: "Actions" },
  ];

  useEffect(() => {
    loadPermissionsSets();
    if (props.showAddPermissionSet) {
      setShowAddUser(true);
    }
  }, [props.showAddPermissionSet]);

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

  const loadPermissionsSets = () => {
    const MyRequest = {};
    getPermissionSets(MyRequest)
      .then((response) => {
        setPermissionSets(response);
        console.log("Permissions sets List => ", response);
      })
      .catch((error) => {
        setPermissionSets(permissionSetsDummyData);
        console.log("loadGenderEnums => ", error.message);
      });
  };

  const handleDelete = (id) => {
    const PermissionsData = {
      id: id,
    };
    deletePermissionSet(PermissionsData)
      .then((response) => {
        loadPermissionsSets();
      })
      .catch((error) => {
        console.log("Delete-err : ", error.message);
      });
  };

  const getPermissions = (data) => {
    let permissions = "";
    if (data.length > 0) {
      data.map((module) => {
        permissions += formatEnum(module.actionPermission) + ", ";
        return 0;
      });
    }
    return permissions;
  };

  const rows = permissionSets.map((data) => {
    let permissions =
      data.permissions !== undefined && data.permissions.length > 0
        ? getPermissions(data.permissions)
        : "";
    return {
      module: formatEnum(data.module),
      systemProcess: formatEnum(data.systemProcess),
      permissions: formatEnum(permissions),
      actions: (
        // we've added some custom button actions
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton color="error" variant="text" onClick={() => handleDelete(data.id)}>
              Delete
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
            title={showAddPermissionSet ? "ADD PERMISSION SET" : "PERMISSION SET"}
          />
          <Alert
            icon={<FilterList fontSize="inherit" />}
            severity={showAddPermissionSet ? "info" : "warning"}
          >
            {showAddPermissionSet ? "Permission Set" : "Below is a list of Permission Sets "}
          </Alert>
          <MDBox>
            {!showAddPermissionSet ? (
              rows.length > 0 ? null : (
                <NoDataCard title="No Permission Sets found!" />
              )
            ) : null}
            {showAddPermissionSet ? (
              <PermissionSetDetails handleCancelUser={props.handleCancelUser} />
            ) : rows.length > 0 ? (
              <TableExport columns={tableColumns} data={rows} canSearch />
            ) : null}
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
