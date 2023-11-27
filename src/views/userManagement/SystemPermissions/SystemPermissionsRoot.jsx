import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";

import CustomToolbar from "components/Toolbar/CustomToolbar.jsx";
import MDButton from "components/MDButton/index.js";
import AddBox from "@mui/icons-material/AddBox";
import Cancel from "@mui/icons-material/Cancel";

import Users from "./positionPermissions/PositionPermissionsList.jsx";
import Positions from "./perimissionSets/PermissionsSetsList.jsx";

export default function Requirements({ showAccountNotice }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [slideNo, setSlideNo] = useState(0);
  const [showAddPermissionSet, setShowAddUser] = useState(false);
  const [controllable, setControllable] = useState(Math.random());

  function skipToPage(pageNo, slideNo) {
    setCurrentPage(pageNo);
    setSlideNo(slideNo);
    handleCancelUser();
  }
  const handleAddUser = () => {
    setShowAddUser(true);
    setControllable(Math.random());
  };

  const handleCancelUser = () => {
    setShowAddUser(false);
    setControllable(Math.random());
  };

  const ToolbarData = [
    {
      Title: <Typography p={1} variant="body2" onClick={() => skipToPage(1, 0)}>System Permissions</Typography>,
      Content: [
        <MDButton
          sx={{ mt: 1 }}
          variant="outlined"
          color={currentPage === 1 ? "primary" : "secondary"}
          onClick={() => skipToPage(1, 0)}
          fullWidth
        >
          Position Permissions
        </MDButton>,
        <MDButton
          sx={{ mt: 1 }}
          variant="outlined"
          color={currentPage === 2 ? "primary" : "secondary"}
          onClick={() => skipToPage(2, 0)}
          fullWidth
        >
          Permission Sets
        </MDButton>,
      ],
      RightIcons: [
        {
          icon: showAddPermissionSet ? <Cancel /> : <AddBox />,
          hint: showAddPermissionSet ? "Cancel" : "Add Position Set",
          rightIconFunction: showAddPermissionSet ? handleCancelUser : handleAddUser,
          rightIconColor: showAddPermissionSet ? "error" : "secondary",
        },
        {
          icon: showAddPermissionSet ? <Cancel /> : <AddBox />,
          hint: showAddPermissionSet ? "Cancel" : "Add Permission Set",
          rightIconFunction: showAddPermissionSet ? handleCancelUser : handleAddUser,
          rightIconColor: showAddPermissionSet ? "error" : "secondary",
        },
      ],
    },
  ];

  if (currentPage === 1) {
    ToolbarData[0].RightIcons.splice(1);
  }
  if (currentPage === 2) {
    ToolbarData[0].RightIcons.splice(0, 1);
    ToolbarData[0].RightIcons.splice(1);
  }

  return (
    <Grid container textAlign="center">
      <Grid item xs={12} sm={12} md={12}>
        <CustomToolbar proceed={currentPage} slideNo={slideNo} toolbarData={ToolbarData} />
      </Grid>
      {currentPage === 1 ? (
        <Users showAddPermissionSet={showAddPermissionSet} key={controllable} />
      ) : null}

      {currentPage === 2 ? (
        <Positions
          handleCancelUser={handleCancelUser}
          showAddPermissionSet={showAddPermissionSet}
          key={controllable}
        />
      ) : null}
    </Grid>
  );
}
