import React, { useState } from "react";

import { Typography } from "@mui/material";
import MDBox from "components/MDBox";

import CustomToolbar from "components/Toolbar/CustomToolbar.jsx";
import MDButton from "components/MDButton/index.js";
import AddBox from "@mui/icons-material/AddBox";
import Cancel from "@mui/icons-material/Cancel";

import PositionPermissionList from "./positionManagement/PositionPermissionList.jsx";
import Positions from "./positions/positionList.jsx";

export default function Requirements({ showAccountNotice }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [slideNo, setSlideNo] = useState(0);
  const [showAddPosition, setShowAddUser] = useState(false);
  const [controllable, setControllable] = useState(Math.random());

  const [colors, setColors] = React.useState([
    "primary",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "#303517",
  ]);

  function skipToPage(pageNo, slideNo) {
    let mColors = [...colors];
    let cPage = currentPage;

    const prevPage = parseInt(cPage) - 1;
    const jumpIndex = pageNo - 1;

    mColors[prevPage] = "default";
    mColors[jumpIndex] = "primary";

    setCurrentPage(pageNo);
    setSlideNo(slideNo);
    setColors(mColors);
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
      Title: (
        <Typography p={1} variant="body2" onClick={() => skipToPage(1, 0)}>
          Position Management
        </Typography>
      ),
      Content: [
        <MDButton
          sx={{ mt: 1 }}
          variant="outlined"
          color={currentPage === 1 ? "primary" : "secondary"}
          onClick={() => skipToPage(1, 0)}
          fullWidth={true}
        >
          Position Permissions
        </MDButton>,
        <MDButton
          sx={{ mt: 1 }}
          variant="outlined"
          color={currentPage === 2 ? "primary" : "secondary"}
          onClick={() => skipToPage(2, 0)}
          fullWidth={true}
        >
          Positions
        </MDButton>,
      ],
      RightIcons: [
        {
          icon: showAddPosition ? <Cancel /> : <AddBox />,
          hint: showAddPosition ? "Cancel" : "Add Position",
          rightIconFunction: showAddPosition ? handleCancelUser : handleAddUser,
          rightIconColor: showAddPosition ? "error" : "secondary",
        },
      ],
    },
  ];

  if (currentPage === 1) {
    ToolbarData[0].RightIcons.splice(0);
  }

  return (
    <MDBox textAlign="center" px={2}>
      <CustomToolbar proceed={currentPage} slideNo={slideNo} toolbarData={ToolbarData} />

      {currentPage === 1 ? (
        <PositionPermissionList showAddPosition={showAddPosition} key={controllable} />
      ) : null}

      {currentPage === 2 ? (
        <Positions
          handleCancelUser={handleCancelUser}
          showAddPosition={showAddPosition}
          key={controllable}
        />
      ) : null}
    </MDBox>
  );
}
